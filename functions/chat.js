export class ChatRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const [client, server] = Object.values(new WebSocketPair());
    this.state.acceptWebSocket(server);

    // Increment live users on connect
    let liveCount = parseInt(await this.env.USER_SESSIONS.get("live_users") || "0") + 1;
    await this.env.USER_SESSIONS.put("live_users", liveCount.toString());

    server.addEventListener("message", async (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        server.send(JSON.stringify({ error: "Invalid message" }));
        return;
      }

      const userId = msg.userId;
      const ip = request.headers.get("CF-Connecting-IP");

      // Ban check
      const user = await this.env.DB.prepare("SELECT is_banned FROM users WHERE id = ?").bind(userId).first();
      if (user && user.is_banned) {
        server.close(1008, "Banned");
        return;
      }

      // Cooldown (30s spam protection)
      const cooldownKey = `cooldown:${userId || ip}`;
      const lastTime = await this.env.USER_SESSIONS.get(cooldownKey);
      if (lastTime && (Date.now() - parseInt(lastTime)) < 30000) {
        server.send(JSON.stringify({ error: "Spam cooldown - wait 30s" }));
        return;
      }
      await this.env.USER_SESSIONS.put(cooldownKey, Date.now().toString(), { expirationTtl: 30 });

      // Save to DB
      await this.env.DB.prepare(`
        INSERT INTO messages (chat_type, from_user_id, to_user_id, content) 
        VALUES (?, ?, ?, ?)
      `).bind(msg.chatType || "public", userId, msg.toUserId || null, msg.content).run();

      // Broadcast to all in room
      this.state.getWebSockets().forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
      });
    });

    server.addEventListener("close", async () => {
      // Decrement live users
      let liveCount = parseInt(await this.env.USER_SESSIONS.get("live_users") || "0") - 1;
      await this.env.USER_SESSIONS.put("live_users", Math.max(0, liveCount).toString());
    });

    return new Response(null, { status: 101, webSocket: client });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const room = url.pathname.split("/").pop() || "public";
    const id = env.CHAT_ROOM.idFromName(room);
    const obj = env.CHAT_ROOM.get(id);
    return obj.fetch(request);
  },
};

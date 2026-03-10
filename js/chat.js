const room = 'public';  // Change for private rooms
const ws = new WebSocket(`wss://${location.host}/api/chat/${room}`);
const token = localStorage.getItem('token');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'join', token }));  // Auth via token
};

ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.error) {
    alert(msg.error);
    return;
  }
  const div = document.createElement('div');
  div.textContent = `${msg.username || 'Anon'}: ${msg.content}`;
  document.getElementById('messages').appendChild(div);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
};

function sendMessage() {
  const content = document.getElementById('messageInput').value.trim();
  if (content) {
    ws.send(JSON.stringify({ content, chatType: 'public', userId: /* from token decode */ }));
    document.getElementById('messageInput').value = '';
  }
}

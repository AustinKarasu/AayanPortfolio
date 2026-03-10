export async function onRequestGet({ env }) {
  // Total users
  const { count: totalUsers } = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first();
  
  // Live users from KV
  const liveUsers = parseInt(await env.USER_SESSIONS.get('live_users') || '0');
  
  // Recent messages (analytics)
  const { count: recentActivity } = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM messages WHERE timestamp > datetime("now", "-7 days")'
  ).first();

  return new Response(JSON.stringify({ 
    totalUsers, 
    liveUsers, 
    recentActivity 
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

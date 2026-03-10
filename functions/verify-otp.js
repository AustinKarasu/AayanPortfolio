export async function onRequestPost({ env, request }) {
  const { phone, code, action } = await request.json();  // action: 'login' or 'register'
  const row = await env.DB.prepare(`
    SELECT code FROM phone_codes WHERE phone = ? AND expires_at > datetime('now')
  `).bind(phone).first();
  if (!row || row.code !== code) {
    return new Response(JSON.stringify({ error: 'Invalid/expired OTP' }), { status: 400 });
  }

  await env.DB.prepare('DELETE FROM phone_codes WHERE phone = ?').bind(phone).run();

  if (action === 'register') {
    // Trigger register flow (e.g., create user)
    return new Response(JSON.stringify({ verified: true, next: '/api/register' }), { status: 200 });
  }

  return new Response(JSON.stringify({ verified: true }), { status: 200 });
}

export async function onRequestPost({ env, request }) {
  const { phone } = await request.json();
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await env.DB.prepare(`
    INSERT OR REPLACE INTO phone_codes (phone, code, expires_at) 
    VALUES (?, ?, datetime('now', '+5 minutes'))
  `).bind(phone, code).run();

  // Twilio
  const twilio = await import('twilio');
  const client = twilio.default(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: `KarasuBerry OTP: ${code}`,
    from: env.TWILIO_PHONE,
    to: phone
  });

  return new Response(JSON.stringify({ message: 'OTP sent' }), { status: 200 });
}

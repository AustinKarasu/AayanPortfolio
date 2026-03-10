import speakeasy from 'speakeasy';
import { sign } from 'jsonwebtoken';

export async function onRequestPost({ env, request }) {
  const { totp, tempToken } = await request.json();
  const jwt = await import('jsonwebtoken');
  let user;
  try {
    user = jwt.default.verify(tempToken, env.JWT_SECRET);
  } catch {
    return new Response('Invalid temp token', { status: 401 });
  }

  const dbUser = await env.DB.prepare('SELECT totp_secret FROM users WHERE id = ?').bind(user.userId).first();
  if (!speakeasy.totp.verify({
    secret: dbUser.totp_secret,
    encoding: 'base32',
    token: totp,
    window: 1
  })) {
    return new Response(JSON.stringify({ error: 'Invalid 2FA' }), { status: 401 });
  }

  const fullToken = sign({ userId: user.userId, isAdmin: user.isAdmin }, env.JWT_SECRET, { expiresIn: '24h' });
  return new Response(JSON.stringify({ token: fullToken }), { status: 200 });
}

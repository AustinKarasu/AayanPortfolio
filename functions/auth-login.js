import { compare } from 'bcrypt-ts';  // Assume bundled or import dynamically
import { sign } from 'jsonwebtoken';
import speakeasy from 'speakeasy';  // For 2FA verify

export async function onRequestPost({ env, request }) {
  const { phone, password, totp } = await request.json();

  // Rate limit (KV)
  const ip = request.headers.get('CF-Connecting-IP');
  const rateKey = `rate:login:${ip}`;
  let rateData = await env.USER_SESSIONS.get(rateKey, { type: 'json' }) || { count: 0 };
  if (rateData.count >= 3) {
    return new Response(JSON.stringify({ error: 'Too many attempts' }), { status: 429 });
  }
  rateData.count++;
  await env.USER_SESSIONS.put(rateKey, JSON.stringify(rateData), { expirationTtl: 300 });

  const user = await env.DB.prepare('SELECT * FROM users WHERE phone = ? AND is_banned = FALSE').bind(phone).first();
  if (!user || !(await compare(password, user.password_hash))) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  // 2FA check if enabled
  if (user.totp_secret) {
    if (totp) {
      if (!speakeasy.totp.verify({ secret: user.totp_secret, encoding: 'base32', token: totp, window: 1 })) {
        return new Response(JSON.stringify({ error: 'Invalid 2FA code' }), { status: 401 });
      }
    } else {
      // Return temp token for 2FA prompt
      const tempToken = sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '5m' });
      return new Response(JSON.stringify({ requires2FA: true, tempToken }), { status: 200 });
    }
  }

  const token = sign({ userId: user.id, isAdmin: user.is_admin }, env.JWT_SECRET, { expiresIn: '24h' });
  return new Response(JSON.stringify({ token }), { status: 200 });
}

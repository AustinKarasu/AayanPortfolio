import { hash } from 'bcrypt-ts';
import { sign } from 'jsonwebtoken';

export async function onRequestPost({ env, request }) {
  const { username, email, phone, password, code } = await request.json();

  // Verify OTP
  const row = await env.DB.prepare(`
    SELECT code FROM phone_codes WHERE phone = ? AND expires_at > datetime('now')
  `).bind(phone).first();
  if (!row || row.code !== code) {
    return new Response(JSON.stringify({ error: 'Invalid/expired OTP' }), { status: 400 });
  }

  const passwordHash = await hash(password);
  const { id } = await env.DB.prepare(`
    INSERT INTO users (username, email, phone, password_hash) VALUES (?, ?, ?, ?) RETURNING id
  `).bind(username, email, phone, passwordHash).first();

  await env.DB.prepare('DELETE FROM phone_codes WHERE phone = ?').bind(phone).run();

  const token = sign({ userId: id }, env.JWT_SECRET, { expiresIn: '24h' });
  return new Response(JSON.stringify({ token }), { status: 200 });
}

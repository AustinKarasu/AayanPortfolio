export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM content WHERE type = 'project' AND is_active = TRUE ORDER BY order_num ASC"
  ).all();
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestPost({ env, request }) {
  // Admin auth check
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  let user;
  try {
    const jwt = await import('jsonwebtoken');
    user = jwt.default.verify(token, env.JWT_SECRET);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }
  const isAdmin = await env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(user.userId).first();
  if (!isAdmin?.is_admin) return new Response('Admin only', { status: 403 });

  const formData = await request.formData();
  let imageUrl = null;
  const file = formData.get('file');
  if (file && file.size > 0) {
    const key = `projects/${Date.now()}-${file.name}`;
    await env.R2_BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    imageUrl = `https://pub-portfolio-assets.r2.dev/${key}`;
  }

  await env.DB.prepare(`
    INSERT INTO content (type, title, description, image_url, order_num) 
    VALUES ('project', ?, ?, ?, COALESCE((SELECT MAX(order_num) + 1 FROM content WHERE type = 'project'), 1))
  `).bind(formData.get('title'), formData.get('description'), imageUrl).run();

  return new Response('Project added', { status: 201 });
}

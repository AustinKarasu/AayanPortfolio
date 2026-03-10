export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM announcements WHERE is_active = TRUE ORDER BY created_at DESC LIMIT 10"
  ).all();
  return Response.json(results);
}

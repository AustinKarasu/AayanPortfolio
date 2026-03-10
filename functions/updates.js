export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM announcements WHERE is_active = TRUE ORDER BY created_at DESC LIMIT 10"
  ).all();
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

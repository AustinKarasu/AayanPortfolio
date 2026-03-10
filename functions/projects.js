export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM content WHERE type = 'project' AND is_active = TRUE ORDER BY order_num ASC"
  ).all();
  return Response.json(results);
}

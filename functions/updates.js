export async function onRequest({ env }) {

 const { results } = await env.DB.prepare(
  "SELECT * FROM updates ORDER BY id DESC"
 ).all()

 return Response.json(results)

}

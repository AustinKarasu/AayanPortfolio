export async function onRequest({ env }) {

 const { results } = await env.DB.prepare(
  "SELECT * FROM projects ORDER BY id DESC"
 ).all()

 return Response.json(results)

}

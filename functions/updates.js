export async function onRequest({ env }) {

 const result = await env.DB.prepare(
  "SELECT * FROM updates ORDER BY id DESC"
 ).all()

 return Response.json(result.results)

}

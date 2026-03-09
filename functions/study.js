export async function onRequest({ env }) {

 const result = await env.DB.prepare(
  "SELECT * FROM study_notes ORDER BY id DESC"
 ).all()

 return Response.json(result.results)

}

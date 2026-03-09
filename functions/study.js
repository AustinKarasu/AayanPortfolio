export async function onRequest({ env }) {

 const { results } = await env.DB.prepare(
  "SELECT * FROM study_notes"
 ).all()

 return Response.json(results)

}

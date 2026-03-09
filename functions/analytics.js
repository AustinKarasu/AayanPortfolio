 async function onRequest({ request, env }){

 const ua = request.headers.get("user-agent")

 await env.DB.prepare(
  "INSERT INTO analytics(event) VALUES('visit')"
 ).run()

 return new Response("ok")

}

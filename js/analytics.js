export async function onRequest({ request, env }){

 const ua = request.headers.get("user-agent")

 await env.DB.prepare(
 "INSERT INTO analytics(event,user_agent) VALUES('visit',?)"
 ).bind(ua).run()

 return new Response("ok")

}

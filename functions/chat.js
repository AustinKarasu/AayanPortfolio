export async function onRequestPost({ request, env }) {

 const { user, message } = await request.json()

 await env.DB.prepare(
  "INSERT INTO public_chat(user,message) VALUES(?,?)"
 ).bind(user, message).run()

 return Response.json({ success:true })

}

export async function onRequestGet({ env }) {

 const result = await env.DB.prepare(
  "SELECT * FROM public_chat ORDER BY id DESC LIMIT 50"
 ).all()

 return Response.json(result.results)

}

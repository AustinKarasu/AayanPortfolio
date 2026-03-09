export async function onRequestGet({ env }) {

 const { results } = await env.DB.prepare(
  "SELECT * FROM chat_messages ORDER BY id DESC LIMIT 50"
 ).all()

 return Response.json(results)

}

export async function onRequestPost({ request, env }) {

 const { user_id,message } = await request.json()

 await env.DB.prepare(
  "INSERT INTO chat_messages(user_id,message) VALUES(?,?)"
 ).bind(user_id,message).run()

 return Response.json({ success:true })

}

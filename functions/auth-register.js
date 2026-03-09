import bcrypt from "bcryptjs"

export async function onRequestPost({ request, env }) {

 const { username, phone, password } = await request.json()

 const hash = await bcrypt.hash(password,10)

 await env.DB.prepare(
  "INSERT INTO users(username,phone,password_hash) VALUES(?,?,?)"
 ).bind(username,phone,hash).run()

 return Response.json({ success:true })

}

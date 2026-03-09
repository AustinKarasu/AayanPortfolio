import bcrypt from "bcryptjs"
import { sign } from "hono/jwt"

export async function onRequestPost({ request, env }) {

 const { username,password } = await request.json()

 const user = await env.DB.prepare(
  "SELECT * FROM users WHERE username=?"
 ).bind(username).first()

 if(!user){
   return new Response("Invalid", {status:401})
 }

 const valid = await bcrypt.compare(password,user.password_hash)

 if(!valid){
   return new Response("Invalid", {status:401})
 }

 const token = await sign(
  { uid:user.id, role:user.role },
  env.JWT_SECRET
 )

 return Response.json({ token })

}

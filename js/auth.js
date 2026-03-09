export async function onRequestPost({ request, env }) {

 const { username, password } = await request.json()

 const user = await env.DB.prepare(
  "SELECT * FROM users WHERE username=?"
 ).bind(username).first()

 if(!user){
  return new Response("User not found",{status:401})
 }

 if(user.password_hash !== password){
  return new Response("Wrong password",{status:401})
 }

 return Response.json({
  token: "logged-in"
 })

}

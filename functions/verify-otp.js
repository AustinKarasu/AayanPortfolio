export async function onRequestPost({ request, env }) {

 const { phone, code } = await request.json()

 const row = await env.DB.prepare(
  "SELECT * FROM otp_codes WHERE phone=?"
 ).bind(phone).first()

 if(!row){
  return new Response("OTP not found",{status:404})
 }

 if(row.code !== code){
  return new Response("Invalid OTP",{status:401})
 }

 await env.DB.prepare(
  "DELETE FROM otp_codes WHERE phone=?"
 ).bind(phone).run()

 return Response.json({verified:true})

}

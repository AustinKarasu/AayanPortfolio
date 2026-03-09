export async function onRequestPost({ request, env }) {

 const { phone } = await request.json()

 const otp = Math.floor(100000 + Math.random()*900000)

 await fetch(
 `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_SID}/Messages.json`,
 {
  method:"POST",
  headers:{
   Authorization:"Basic "+btoa(`${env.TWILIO_SID}:${env.TWILIO_TOKEN}`),
   "Content-Type":"application/x-www-form-urlencoded"
  },
  body:new URLSearchParams({
   To:phone,
   From:env.TWILIO_PHONE,
   Body:`Your verification code: ${otp}`
  })
 })

 return Response.json({ success:true })

}

let messages = []

export async function onRequestPost({ request }) {

 const body = await request.json()

 messages.push({
   text: body.message,
   time: Date.now()
 })

 return new Response(JSON.stringify({ ok: true }))
}

export async function onRequestGet() {

 return new Response(JSON.stringify(messages))

}

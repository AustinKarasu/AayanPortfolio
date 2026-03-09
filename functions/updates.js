export async function onRequest() {

 const res = await fetch("https://karasuberry.fun/content.json")
 const data = await res.json()

 return new Response(JSON.stringify(data.dailyupdates), {
   headers: { "Content-Type": "application/json" }
 })

}

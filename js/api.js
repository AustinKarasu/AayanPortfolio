 async function getProjects(){

 const res = await fetch("/api/projects")
 return res.json()

}

export async function getUpdates(){

 const res = await fetch("/api/updates")
 return res.json()

}

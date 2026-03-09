async function addProject(){

 const title = document.getElementById("title").value
 const image = document.getElementById("image").value
 const url = document.getElementById("url").value

 const res = await fetch("/content.json")
 const data = await res.json()

 data.projects.push({
   title,
   image,
   url
 })

 await fetch("/api/updateContent",{
   method:"POST",
   body:JSON.stringify(data)
 })

 alert("Project Added")

}

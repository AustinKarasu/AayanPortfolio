async function addProject(){

 const title = document.getElementById("title").value
 const desc = document.getElementById("desc").value
 const image = document.getElementById("image").value
 const url = document.getElementById("url").value

 await fetch("/api/admin/add-project",{
  method:"POST",
  body:JSON.stringify({title,description:desc,image,url})
 })

 alert("Project added")

}

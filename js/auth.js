console.log("auth.js loaded")

async function loginUser(){

 const username=document.getElementById("loginUser").value
 const password=document.getElementById("loginPass").value

 const res=await fetch("/api/auth-login",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({username,password})
 })

 if(res.status!==200){
  alert("Invalid login")
  return
 }

 const data=await res.json()

 localStorage.setItem("token",data.token)

 location.href="/admin.html"
}

window.loginUser = loginUser

console.log("auth.js loaded")

const API = "/api"

/* LOGIN */

async function loginUser(){

 const username=document.getElementById("loginUser").value
 const password=document.getElementById("loginPass").value

 if(!username || !password){
  alert("Enter username and password")
  return
 }

 console.log("Sending login request")

 const res = await fetch(`${API}/auth-login`,{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   username,
   password
  })
 })

 console.log("Response status:",res.status)

 if(res.status!==200){
  alert("Invalid login")
  return
 }

 const data = await res.json()

 localStorage.setItem("token",data.token)

 alert("Login success")

 location.href="/admin.html"

}

/* WAIT UNTIL PAGE LOADS */

window.addEventListener("DOMContentLoaded",()=>{

 const loginBtn=document.getElementById("loginBtn")

 if(loginBtn){
  loginBtn.addEventListener("click",loginUser)
 }

})

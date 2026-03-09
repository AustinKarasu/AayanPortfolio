console.log("auth.js loaded")

const API = "/api"

async function loginUser(){

 const username=document.getElementById("loginUser").value
 const password=document.getElementById("loginPass").value

 if(!username || !password){
  alert("Enter username and password")
  return
 }

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

 if(res.status!==200){
  alert("Invalid login")
  return
 }

 const data = await res.json()

 localStorage.setItem("token",data.token)

 location.href="/admin.html"

}

async function sendOTP(){

 const phone=document.getElementById("regPhone").value

 const res=await fetch(`${API}/send-otp`,{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({phone})
 })

 if(res.status!==200){
  alert("Failed to send OTP")
  return
 }

 alert("OTP sent")

}

async function registerUser(){

 const username=document.getElementById("regUser").value
 const phone=document.getElementById("regPhone").value
 const password=document.getElementById("regPass").value

 const res=await fetch(`${API}/auth-register`,{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   username,
   phone,
   password
  })
 })

 if(res.status!==200){
  alert("Register failed")
  return
 }

 alert("Account created")

}

window.loginUser = loginUser
window.sendOTP = sendOTP
window.registerUser = registerUser

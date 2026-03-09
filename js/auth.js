/* =========================
   KarasuBerry Auth System
========================= */

const API = "/api"

/* =========================
   TOKEN HELPERS
========================= */

function saveToken(token){
 localStorage.setItem("token",token)
}

function getToken(){
 return localStorage.getItem("token")
}

function logout(){
 localStorage.removeItem("token")
 location.href="/auth.html"
}

function requireAuth(){

 const token=getToken()

 if(!token){
  location.href="/auth.html"
 }

}

/* =========================
   LOGIN
========================= */

async function loginUser(){

 const username=document.getElementById("loginUser").value
 const password=document.getElementById("loginPass").value

 if(!username || !password){
  alert("Fill all fields")
  return
 }

 const res=await fetch(`${API}/auth-login`,{

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
  alert("Invalid credentials")
  return
 }

 const data=await res.json()

 saveToken(data.token)

 location.href="/admin.html"

}

/* =========================
   REGISTER
========================= */

async function registerUser(){

 const username=document.getElementById("regUser").value
 const phone=document.getElementById("regPhone").value
 const password=document.getElementById("regPass").value
 const confirm=document.getElementById("regPass2").value
 const otp=document.getElementById("otpCode").value

 if(!username || !phone || !password || !confirm || !otp){
  alert("Fill all fields")
  return
 }

 if(password!==confirm){
  alert("Passwords do not match")
  return
 }

 const verify=await fetch(`${API}/verify-otp`,{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({
   phone,
   code:otp
  })

 })

 if(verify.status!==200){
  alert("OTP verification failed")
  return
 }

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
  alert("Registration failed")
  return
 }

 alert("Account created successfully")

}

/* =========================
   SEND OTP
========================= */

async function sendOTP(){

 const phone=document.getElementById("regPhone").value

 if(!phone){
  alert("Enter phone number")
  return
 }

 const btn=document.getElementById("sendOTPBtn")

 btn.disabled=true
 btn.textContent="Sending..."

 const res=await fetch(`${API}/send-otp`,{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({phone})

 })

 if(res.status!==200){
  alert("Failed to send OTP")
  btn.disabled=false
  btn.textContent="Send OTP"
  return
 }

 alert("OTP sent to your phone")

 btn.textContent="OTP Sent"

}

/* =========================
   VERIFY OTP (manual)
========================= */

async function verifyOTP(){

 const phone=document.getElementById("regPhone").value
 const code=document.getElementById("otpCode").value

 if(!phone || !code){
  alert("Enter phone and OTP")
  return
 }

 const res=await fetch(`${API}/verify-otp`,{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({
   phone,
   code
  })

 })

 if(res.status!==200){
  alert("Invalid OTP")
  return
 }

 alert("Phone verified")

}

/* =========================
   ADMIN PAGE AUTH CHECK
========================= */

function protectAdmin(){

 const token=getToken()

 if(!token){
  location.href="/auth.html"
 }

}

/* =========================
   FETCH WITH AUTH
========================= */

async function authFetch(url,options={}){

 const token=getToken()

 if(!options.headers){
  options.headers={}
 }

 options.headers.Authorization="Bearer "+token

 const res=await fetch(url,options)

 if(res.status===401){
  logout()
 }

 return res

}

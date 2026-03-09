console.log("auth.js loaded");

const API = "/api";

/* LOGIN */

async function loginUser(){

 const username = document.getElementById("loginUser").value;
 const password = document.getElementById("loginPass").value;

 if(!username || !password){
  alert("Enter username and password");
  return;
 }

 const res = await fetch(API + "/auth-login",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   username,
   password
  })
 });

 if(res.status !== 200){
  alert("Invalid login");
  return;
 }

 const data = await res.json();

 localStorage.setItem("token",data.token);

 location.href="/admin.html";
}


/* SEND OTP */

async function sendOTP(){

 const phone = document.getElementById("regPhone").value;

 if(!phone){
  alert("Enter phone number");
  return;
 }

 const res = await fetch(API + "/send-otp",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({phone})
 });

 if(res.status !== 200){
  alert("Failed to send OTP");
  return;
 }

 alert("OTP sent to your phone");
}


/* REGISTER */

async function registerUser(){

 const username = document.getElementById("regUser").value;
 const phone = document.getElementById("regPhone").value;
 const password = document.getElementById("regPass").value;

 const res = await fetch(API + "/auth-register",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   username,
   phone,
   password
  })
 });

 if(res.status !== 200){
  alert("Registration failed");
  return;
 }

 alert("Account created");
}


/* expose functions to HTML */

window.loginUser = loginUser;
window.sendOTP = sendOTP;
window.registerUser = registerUser;

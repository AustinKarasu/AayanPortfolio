/* ===============================
   KarasuBerry Authentication
   Frontend Controller
================================ */

const API_BASE = "/api";

/* -------------------------------
   Utility helpers
-------------------------------- */

function setToken(token) {
  localStorage.setItem("kb_token", token);
}

function getToken() {
  return localStorage.getItem("kb_token");
}

function removeToken() {
  localStorage.removeItem("kb_token");
}

/* -------------------------------
   LOGIN
-------------------------------- */

async function loginUser() {

  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  try {

    const res = await fetch(`${API_BASE}/auth-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const text = await res.text();

    if (!res.ok) {
      alert(text || "Login failed");
      return;
    }

    const data = JSON.parse(text);

    setToken(data.token);

    window.location.href = "/admin.html";

  } catch (err) {
    console.error(err);
    alert("Network error");
  }

}

/* -------------------------------
   REGISTER
-------------------------------- */

async function registerUser() {

  const username = document.getElementById("regUser").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const confirm = document.getElementById("regPass2").value.trim();
  const otp = document.getElementById("otpCode").value.trim();

  if (!username || !phone || !password || !confirm || !otp) {
    alert("Fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  try {

    const verify = await fetch(`${API_BASE}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        code: otp
      })
    });

    if (!verify.ok) {
      alert("Invalid OTP");
      return;
    }

    const res = await fetch(`${API_BASE}/auth-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        phone,
        password
      })
    });

    if (!res.ok) {
      const msg = await res.text();
      alert(msg);
      return;
    }

    alert("Account created successfully");

  } catch (err) {
    console.error(err);
    alert("Network error");
  }

}

/* -------------------------------
   SEND OTP
-------------------------------- */

async function sendOTP() {

  const phone = document.getElementById("regPhone").value.trim();

  if (!phone) {
    alert("Enter phone number");
    return;
  }

  const btn = document.getElementById("sendOTPBtn");
  btn.disabled = true;
  btn.innerText = "Sending...";

  try {

    const res = await fetch(`${API_BASE}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone })
    });

    if (!res.ok) {
      alert("OTP send failed");
      btn.disabled = false;
      btn.innerText = "Send OTP";
      return;
    }

    alert("OTP sent successfully");
    btn.innerText = "OTP Sent";

  } catch (err) {
    console.error(err);
    alert("Network error");
  }

}

/* -------------------------------
   LOGOUT
-------------------------------- */

function logoutUser() {
  removeToken();
  window.location.href = "/auth.html";
}

/* -------------------------------
   EXPORT GLOBAL FUNCTIONS
-------------------------------- */

window.loginUser = loginUser;
window.registerUser = registerUser;
window.sendOTP = sendOTP;
window.logoutUser = logoutUser;

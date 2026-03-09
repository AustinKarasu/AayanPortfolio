console.log("auth.js loaded");

const API = "/api";

/* LOGIN FUNCTION */

async function loginUser() {

  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  try {

    const res = await fetch(`${API}/auth-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const text = await res.text();

    if (!res.ok) {
      alert(text || "Login failed");
      return;
    }

    const data = JSON.parse(text);

    localStorage.setItem("token", data.token);

    window.location.href = "/admin.html";

  } catch (err) {
    console.error(err);
    alert("Network error");
  }

}

/* Attach event after page loads */

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", loginUser);
  }

});

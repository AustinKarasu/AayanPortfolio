/* ===============================
   KarasuBerry Auto Login Guard
================================ */

function getToken() {
  return localStorage.getItem("kb_token");
}

function requireLogin() {

  const token = getToken();

  if (!token) {
    window.location.href = "/auth.html";
    return;
  }

}

function redirectIfLoggedIn() {

  const token = getToken();

  if (token) {
    window.location.href = "/admin.html";
  }

}

/* expose */

window.requireLogin = requireLogin;
window.redirectIfLoggedIn = redirectIfLoggedIn;

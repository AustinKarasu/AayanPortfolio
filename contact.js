// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Boot animation (unique per page)
(function() {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  const seenKey = `boot_seen_${window.location.pathname}`;
  const seen = sessionStorage.getItem(seenKey);
  if (seen) { loader.classList.add("hide"); return; }
  setTimeout(() => loader.classList.add("hide"), 3500);
  sessionStorage.setItem(seenKey, "1");
})();

// 🌗 Global Theme Toggle with Persistence
const toggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

// Apply saved theme immediately
if (currentTheme === "light") {
  document.body.classList.add("light");
  toggle.textContent = "☀️";
} else {
  document.body.classList.remove("light");
  toggle.textContent = "🌙";
}

// Toggle and save theme
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "light" ? "☀️" : "🌙";
});

// Responsive Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("open");
    hamburger.textContent = "☰";
  }
});

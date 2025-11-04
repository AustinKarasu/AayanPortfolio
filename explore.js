// ===============================
// 🌐 EXPLORE PAGE SCRIPT (FINAL)
// ===============================

// © 2025 Aayan Parmar | KarasuBerry

// ===== Footer Year =====
document.getElementById("year").textContent = new Date().getFullYear();


// ===== Boot Animation (once per session) =====
(function () {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  const seen = sessionStorage.getItem("boot_seen_explore");
  if (seen) {
    loader.classList.add("hide");
    return;
  }
  setTimeout(() => loader.classList.add("hide"), 4000);
  sessionStorage.setItem("boot_seen_explore", "1");
})();


// ===== 🌗 Universal Theme Toggle with Persistence =====
const toggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

// Apply saved theme before render
if (currentTheme === "light") {
  document.body.classList.add("light");
  toggle.textContent = "☀️";
} else {
  document.body.classList.remove("light");
  toggle.textContent = "🌙";
}

// Toggle theme and store preference
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "light" ? "☀️" : "🌙";

  // Add smooth transitions to theme-sensitive elements
  document.querySelectorAll(".contact-box, .post, .modal, .feed-divider, .nav, body")
    .forEach(el => {
      el.style.transition = "background 0.5s ease, color 0.5s ease, box-shadow 0.5s ease";
    });
});


// ===== Hamburger Toggle =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

// Reset menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("open");
    hamburger.textContent = "☰";
  }
});


// ===== Fade-in Section Animations =====
const fades = document.querySelectorAll(".fade");
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.3 }
);
fades.forEach(el => fadeObserver.observe(el));


// ===== Image Modal View =====
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = modal ? modal.querySelector(".close") : null;

if (modal && modalImg && closeBtn) {
  document.querySelectorAll(".view-btn[data-img]").forEach(btn => {
    btn.addEventListener("click", () => {
      const imgSrc = btn.getAttribute("data-img");
      modalImg.src = imgSrc;
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
}


// ===== Instant Theme Sync Across Pages =====
(function syncThemeBeforePaint() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
})();

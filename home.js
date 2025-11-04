// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// 🌗 Universal Theme Toggle with Persistence
const toggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

// Apply stored theme
if (currentTheme === "light") {
  document.body.classList.add("light");
  toggle.textContent = "☀️";
} else {
  document.body.classList.remove("light");
  toggle.textContent = "🌙";
}

// Toggle theme and save preference
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "light" ? "☀️" : "🌙";
});

// Hamburger menu for mobile
const ham = document.getElementById("hamburger");
const links = document.querySelector(".links");
ham.addEventListener("click", () => links.classList.toggle("open"));

// Fade animations
const fades = document.querySelectorAll(".fade");
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.3 });
fades.forEach(el => fadeObserver.observe(el));

// Skill bar animations
const skills = document.querySelectorAll(".skill");
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector(".bar");
      if (bar) bar.style.width = bar.dataset.width + "%";
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.5 });
skills.forEach(skill => skillObserver.observe(skill));

// Updates ticker (5s rotation)
const updates = [
  "🚀 Welcome to Aayan Parmar’s Portfolio | Developer • Designer • Streamer • Editor",
  "💡 Creating with passion, learning with purpose.",
  "🎮 Gamer • Developer • Creator • Editor",
  "⚙️ Admin Panel integration coming soon — stay tuned!"
];
let i = 0;
const updatesText = document.getElementById("updates-text");
setInterval(() => {
  i = (i + 1) % updates.length;
  updatesText.textContent = updates[i];
}, 5000);

// Boot animation (show once)
(function() {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  const seen = sessionStorage.getItem("boot_seen");
  if (seen) {
    loader.classList.add("hide");
    return;
  }
  const madeBy = document.getElementById("boot-madeby");
  setTimeout(() => madeBy.style.opacity = 1, 2500);
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
      sessionStorage.setItem("boot_seen", "1");
    }, 4000);
  });
})();

// Projects: clickable GitHub overlay
document.querySelectorAll(".project").forEach(project => {
  project.addEventListener("click", () => {
    const link = project.dataset.link;
    if (link) window.open(link, "_blank");
  });
});

// 3D rolling ball animation (above hero text)
(function() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const container = canvas.parentElement;
  let w, h, r, baseY, speed, t = 0;
  const trails = [];

  function resize() {
    const DPR = window.devicePixelRatio || 1;
    w = container.clientWidth;
    h = Math.min(400, Math.max(220, Math.floor(w * 0.35)));
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    r = Math.max(15, Math.min(35, Math.floor(w * 0.03)));
    baseY = Math.floor(h * 0.35);
    speed = Math.max(1.5, Math.min(3.5, w / 600));
  }
  window.addEventListener("resize", resize);
  resize();

  function drawBall(x) {
    const grad = ctx.createRadialGradient(x - r / 3, baseY - r * 1.3, r / 3, x, baseY - r, r * 1.2);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(0.4, "rgba(236,72,153,0.9)");
    grad.addColorStop(1, "rgba(79,70,229,0.9)");
    ctx.beginPath();
    ctx.arc(x, baseY - r, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function drawTrail() {
    for (let i = 0; i < trails.length; i++) {
      const p = trails[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236,72,153,${p.alpha})`;
      ctx.fill();
      p.alpha -= 0.02;
    }
    for (let i = trails.length - 1; i >= 0; i--) {
      if (trails[i].alpha <= 0) trails.splice(i, 1);
    }
  }

  function animate() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    const cycle = (t * speed) % (w + r * 4);
    const x = -r * 2 + cycle;
    trails.push({ x, y: baseY - r, alpha: 0.3 });
    drawTrail();
    drawBall(x);
    requestAnimationFrame(animate);
  }
  animate();
})();

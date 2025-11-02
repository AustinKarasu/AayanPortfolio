
const fadeEls = document.querySelectorAll('.fade-in');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  fadeEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);


document.addEventListener('mousemove', e => {
  document.querySelectorAll('.bg-orb').forEach((orb, i) => {
    const speed = (i + 1) * 0.01;
    orb.style.transform = `translate(${e.clientX * speed}px, ${e.clientY * speed}px)`;
  });
});

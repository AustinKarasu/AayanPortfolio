// loader.js — robust Access Granted flow
(function () {
  const SKIP_KEY = 'karasu_loader_shown_v3'; // change to match your version if needed
  const SHOW_ONCE = false; // set true to skip after first full load in session

  const sample = [
    "// boot: KARASU-OS v9.3.1 • system init",
    "[INIT] kernel: modules loaded ░ OK",
    "handshake: 0x7A9C -> 0xBEEF  [SYN•ACK•OK]",
    "decrypting payload [██████░░] 72%  // aes-256",
    "read /sys/secure/keys -> 0xA3F2…D1 (masked)",
    "mount ram://tempfs -> /run/karasu (ro)",
    "tcp: 127.0.0.1:443 -> LISTEN (tls_fallback=off)",
    "payload(base64): c2F0aXNoX2thcmFzdQ==",
    "if(auth.token === 0x7FA9C3) { grant.access(); }",
    "scan: [▮▮▮▮▮▯▯▯▯] ports: 22,80,443 (sim)",
    "/* karasu-loader */"
  ];

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function createLoader() {
    if (document.getElementById('site-loader')) return document.getElementById('site-loader');

    document.documentElement.classList.add('loader-active');

    const loader = document.createElement('div');
    loader.id = 'site-loader';
    loader.innerHTML = `
      <div class="loader-box" role="status" aria-live="polite" aria-label="Loading">
        <div class="logo-code">&lt;/&gt;</div>
        <div class="code-window" aria-hidden="true">
          <pre id="karasu-code" aria-hidden="true"></pre>
          <div class="scan" aria-hidden="true"></div>
        </div>
        <div style="width:100%;display:flex;flex-direction:column;align-items:center;">
          <div class="loader-bar" aria-hidden="true"><i></i></div>
          <div class="grant" aria-hidden="true"></div>
        </div>
      </div>
    `;
    document.body.appendChild(loader);
    return loader;
  }

  function populateCode(preEl) {
    // make a longer text block to ensure a good scroll effect
    const block = sample.map(s => escapeHtml(s)).join('\n');
    // repeat with spacing to create visual density
    preEl.textContent = (block + '\n\n').repeat(4);
  }

  function startScroll(preEl) {
    // smooth, slow rAF scroll for readability (resets loop)
    let offset = 0;
    let last = performance.now();
    preEl.style.transform = 'translateY(0%)';

    function step(now) {
      const dt = now - last;
      last = now;
      // Respect reduced-motion preference
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        preEl.style.transform = 'translateY(0%)';
        return;
      }
      offset -= dt * 0.004; // control speed (slower = more readable)
      if (offset < -100) offset = 0;
      preEl.style.transform = `translateY(${offset}%)`;
      preEl._raf = requestAnimationFrame(step);
    }
    preEl._raf = requestAnimationFrame(step);
  }

  function stopScroll(preEl) {
    if (preEl && preEl._raf) cancelAnimationFrame(preEl._raf);
  }

  function animateBar(barEl) {
    return new Promise(resolve => {
      let pct = 0;
      const step = setInterval(() => {
        pct += Math.random() * 11 + 3;
        if (pct >= 96) pct = 96;
        barEl.style.width = Math.floor(pct) + '%';
      }, 180);

      setTimeout(() => {
        clearInterval(step);
        barEl.style.width = '100%';
        setTimeout(resolve, 420);
      }, 1500 + Math.random() * 900);
    });
  }

  function typeGrant(grantEl, text = 'ACCESS GRANTED', speed = 55) {
    return new Promise(resolve => {
      // make sure element exists and is visible
      grantEl.setAttribute('aria-hidden', 'false');
      grantEl.textContent = '';
      // add blinking cursor span
      const cursor = document.createElement('span');
      cursor.className = 'kg-cursor';
      cursor.textContent = '_';
      cursor.style.marginLeft = '6px';
      cursor.style.opacity = '1';
      cursor.style.fontFamily = 'inherit';
      cursor.style.fontWeight = '700';
      cursor.style.display = 'inline-block';
      cursor.style.marginLeft = '6px';
      // ensure CSS blink is present (if not, it will still show)
      cursor.style.animation = 'blink 0.7s steps(2,end) infinite';
      grantEl.appendChild(document.createTextNode('')); // ensure text node exists
      let i = 0;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // show container (add .granted class so CSS opacity transition applies)
      const loader = document.getElementById('site-loader');
      if (loader && !loader.classList.contains('granted')) loader.classList.add('granted');

      grantEl.appendChild(cursor);

      if (prefersReduced) {
        // if user prefers reduced motion, display instantly and resolve
        grantEl.textContent = text;
        grantEl.appendChild(cursor);
        setTimeout(resolve, 260);
        return;
      }

      const t = setInterval(() => {
        // insert before cursor
        const before = cursor.previousSibling;
        if (i < text.length) {
          // insert character before cursor
          if (before) {
            // we append a text node for the next character
            cursor.parentNode.insertBefore(document.createTextNode(text[i++]), cursor);
          } else {
            cursor.parentNode.insertBefore(document.createTextNode(text[i++]), cursor);
          }
        } else {
          clearInterval(t);
          // small pause so user reads it
          setTimeout(resolve, 420);
        }
      }, speed);
    });
  }

  async function runLoader() {
    const loader = createLoader();
    const pre = loader.querySelector('#karasu-code');
    const bar = loader.querySelector('.loader-bar > i');
    const grant = loader.querySelector('.grant');

    if (!pre || !bar || !grant) {
      // if elements missing, bail gracefully after tiny delay
      setTimeout(() => {
        try { loader.remove(); document.documentElement.classList.remove('loader-active'); } catch (e) {}
      }, 400);
      return;
    }

    populateCode(pre);
    startScroll(pre);

    try {
      await animateBar(bar);
    } catch (e) {
      // ignore and continue
    }

    // make sure .granted is present BEFORE typing so CSS shows it
    loader.classList.add('granted');

    // type the message
    try {
      await typeGrant(grant, 'ACCESS GRANTED');
    } catch (e) {
      // ignore typing errors
    }

    // short success pause, then remove loader
    setTimeout(() => {
      stopScroll(pre);
      loader.style.transition = 'opacity .45s ease, transform .45s ease';
      loader.style.opacity = 0;
      loader.style.transform = 'translateY(-8px) scale(.995)';
      setTimeout(() => {
        try { loader.remove(); document.documentElement.classList.remove('loader-active'); } catch (e) {}
        try { if (SHOW_ONCE) sessionStorage.setItem(SKIP_KEY, '1'); } catch (e) {}
      }, 520);
    }, 620);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // If user previously opted out via session (for navigation speed), don't show while testing; but you can clear it.
    try {
      if (sessionStorage.getItem(SKIP_KEY)) {
        // still add small delay for paint
        document.documentElement.classList.remove('loader-active');
        return;
      }
    } catch (e) {
      // ignore session errors
    }
    runLoader().catch(() => {});
  });
})();

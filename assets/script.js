// custom cursor
(function () {
  const dot = document.querySelector('.cursor:not(.cursor--follow)');
  const ring = document.querySelector('.cursor--follow');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  function animate() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();
  document.querySelectorAll('a, button, .project, .visit').forEach((el) => {
    el.addEventListener('mouseenter', () => { dot.classList.add('is-hover'); ring.classList.add('is-hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('is-hover'); ring.classList.remove('is-hover'); });
  });
})();

document.querySelectorAll(".rule").forEach(rule => {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                rule.style.setProperty("--play", "1");

                rule.querySelector(".shine")?.remove();

                const shine = document.createElement("div");
                shine.className = "shine";

                shine.style.cssText = `
                    position:absolute;
                    inset:0;
                    background:linear-gradient(
                        90deg,
                        transparent,
                        var(--accent),
                        transparent
                    );
                    transform:translateX(-100%);
                    animation:ruleSweep 1.2s ease forwards;
                `;

                rule.appendChild(shine);

                observer.unobserve(rule);
            }

        });

    }, { threshold: 0.5 });

    observer.observe(rule);

});

const style = document.createElement("style");

style.textContent = `
@keyframes ruleSweep{
    from{
        transform:translateX(-100%);
    }
    to{
        transform:translateX(100%);
    }
}
`;

document.head.appendChild(style);

// smooth scroll to contact
document.querySelectorAll('.contact-scroll').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// copy email
const emailBtn = document.getElementById('copyEmail');
if (emailBtn) {
  emailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailBtn.textContent.trim());
      const hint = emailBtn.parentElement.querySelector('.copy-hint span');
      const prev = hint.textContent;
      hint.textContent = 'COPIED ✓';
      setTimeout(() => (hint.textContent = prev), 1600);
    } catch (_) {
      window.location.href = `mailto:${emailBtn.textContent.trim()}`;
    }
  });
}

// clock (IST)
function tickClock() {
  const now = new Date();
  // India Standard Time UTC+5:30
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
  const hh = String(ist.getHours()).padStart(2, '0');
  const mm = String(ist.getMinutes()).padStart(2, '0');
  const h = document.getElementById('hh');
  const m = document.getElementById('mm');
  if (h) h.textContent = hh;
  if (m) m.textContent = mm;
}
tickClock();
setInterval(tickClock, 1000 * 30);

// year
const y = document.getElementById('yr');
if (y) y.textContent = new Date().getFullYear();

// fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.project, .award, .awards__block, .aside, .contact').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)';
  io.observe(el);
});

// intro trigger
requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
window.addEventListener('load', () => {
  const wipe = document.querySelector('.page-wipe');
  if (wipe) setTimeout(() => wipe.remove(), 1300);
});

// hero scroll-out (parallax fade/blur as user scrolls past first viewport)
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.classList.add('scroll-out');
  let ticking = false;
  function update() {
    const h = window.innerHeight;
    const y = window.scrollY;
    const p = Math.max(0, Math.min(1, y / (h * 0.75)));
    hero.style.setProperty('--p', p.toFixed(3));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();
document.querySelectorAll('.reveal-text').forEach(el => {
  const text = el.textContent;
  el.innerHTML = text
    .split('')
    .map(char =>
      char === ' '
        ? ' '
        : `<span class="char">${char}</span>`
    )
    .join('');

  const chars = el.querySelectorAll('.char');

  chars.forEach(char => {
    char.addEventListener('mouseenter', () => {
      char.classList.add('active');
    });

    char.addEventListener('mouseleave', () => {
      char.classList.remove('active');
    });
  });
});
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");

  if(current === "light"){
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme","dark");
  } else {
    document.documentElement.setAttribute("data-theme","light");
    localStorage.setItem("theme","light");
  }
});

if(localStorage.getItem("theme")==="light"){
  document.documentElement.setAttribute("data-theme","light");
}

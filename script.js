/* ===================================================
   KARAN RAWAT — PORTFOLIO v2
   script.js
=================================================== */

const $ = id => document.getElementById(id);
const cursor     = $('cursor');
const cursorRing = $('cursorRing');
const nav        = $('nav');
const themeBtn   = $('themeToggle');
const hamburger  = $('hamburger');
const mobileMenu = $('mobileMenu');
const backTop    = $('backTop');
const typedEl    = $('typed');
const sendBtn    = $('sendBtn');
const formNote   = $('formNote');
const yrEl       = $('yr');

/* ─── YEAR ────────────────────────────────────────────── */
if (yrEl) yrEl.textContent = new Date().getFullYear();

/* ─── CUSTOM CURSOR ──────────────────────────────────── */
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
});
(function ringLoop() {
  rx += (mx - rx) * .13;
  ry += (my - ry) * .13;
  cursorRing.style.transform = `translate(${rx - 15}px,${ry - 15}px)`;
  requestAnimationFrame(ringLoop);
})();
document.querySelectorAll('a,button,input,textarea,.pcard,.acard,.tech-tile').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorRing.style.width = cursorRing.style.height = '48px'; cursorRing.style.opacity = '.22'; });
  el.addEventListener('mouseleave', () => { cursorRing.style.width = cursorRing.style.height = '30px'; cursorRing.style.opacity = '.45'; });
});

/* ─── THEME ──────────────────────────────────────────── */
const savedTheme = localStorage.getItem('kr-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.addEventListener('click', () => {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('kr-theme', t);
});

/* ─── NAV SCROLL ─────────────────────────────────────── */
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  backTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

/* ─── HAMBURGER ──────────────────────────────────────── */
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ─── BACK TO TOP ────────────────────────────────────── */
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── SMOOTH SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  });
});

/* ─── SCROLL REVEAL ──────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.fade-up').forEach(el => revObs.observe(el));

/* ─── SKILL BARS ─────────────────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.width = e.target.dataset.w + '%'; }, 200);
      barObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.sbar__fill').forEach(f => barObs.observe(f));

/* ─── TYPING EFFECT ──────────────────────────────────── */
const phrases = ['software engineering', 'AI & data science', 'clean frontend work', 'practical tech'];
let pi = 0, ci = 0, del = false;
function type() {
  const p = phrases[pi];
  typedEl.textContent = p.slice(0, del ? --ci : ++ci);
  if (!del && ci === p.length) { del = true; return setTimeout(type, 2000); }
  if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; return setTimeout(type, 400); }
  setTimeout(type, del ? 38 : 72);
}
setTimeout(type, 1400);

/* ─── ACTIVE NAV ─────────────────────────────────────── */
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.nav__link').forEach(l => {
        l.style.color = l.getAttribute('href') === `#${e.target.id}` ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: .35 });
document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

/* ─── CONTACT FORM ───────────────────────────────────── */
const contactForm = $('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    // Basic validation
    if (!name || !email || !message) {
      formNote.style.color = 'var(--pink)';
      formNote.textContent = 'Please fill in all fields.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.style.color = 'var(--pink)';
      formNote.textContent = 'Please enter a valid email address.';
      return;
    }

    // Show loading state
    sendBtn.textContent = 'Sending…';
    sendBtn.disabled = true;
    formNote.textContent = '';

    try {
      // Submit to Formspree (you'll need to replace YOUR_FORM_ID with actual ID)
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formNote.style.color = 'var(--cyan)';
        formNote.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      formNote.style.color = 'var(--pink)';
      formNote.textContent = 'Failed to send message. Please try again or contact me directly via email.';
    } finally {
      sendBtn.innerHTML = '<i class="ph-bold ph-paper-plane-tilt"></i> Send Message';
      sendBtn.disabled = false;
    }
  });
}

/* ─── INITIAL REVEAL ─────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-up').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
  });
});
/* =============================================================
   KARAN RAWAT — PORTFOLIO
   script.js
   
   Features:
   - Custom cursor (desktop)
   - Dark / Light theme toggle (persisted)
   - Smooth scroll reveal (IntersectionObserver)
   - Skill bar animation on scroll
   - Typing effect in hero
   - Sticky nav scroll style
   - Mobile hamburger menu
   - Contact form feedback
   - Back-to-top button
============================================================= */

/* ─── DOM REFERENCES ─────────────────────────────────────────── */
const cursor          = document.getElementById('cursor');
const cursorFollower  = document.getElementById('cursorFollower');
const nav             = document.getElementById('nav');
const themeToggle     = document.getElementById('themeToggle');
const hamburger       = document.getElementById('hamburger');
const mobileMenu      = document.getElementById('mobileMenu');
const mobileLinks     = document.querySelectorAll('.mobile-link');
const backTop         = document.getElementById('backTop');
const typedEl         = document.getElementById('typed') || { textContent: '' };
const sendBtn         = document.getElementById('sendBtn');
const formNote        = document.getElementById('formNote');
const skillFills      = document.querySelectorAll('.skill-bar__fill');
const revealEls       = document.querySelectorAll('.reveal');
const currentYearEl   = document.getElementById('currentYear');

/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot snaps instantly
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

// Follower lags behind (requestAnimationFrame loop)
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.transform = `translate(${followerX - 17}px, ${followerY - 17}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Enlarge on interactive elements
document.querySelectorAll('a, button, input, textarea, .project-card, .info-card, .tech-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    cursorFollower.style.transform += ' scale(1.6)';
    cursorFollower.style.opacity = '0.25';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.style.opacity = '0.55';
  });
});

/* ─── THEME TOGGLE ──────────────────────────────────────────── */
// Load saved preference (default: dark)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* ─── STICKY NAV ────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ─── HAMBURGER / MOBILE MENU ───────────────────────────────── */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── BACK TO TOP ────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── SCROLL REVEAL (IntersectionObserver) ──────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve — keeps the class on re-entry
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── SKILL BAR ANIMATION ────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      // Slight delay then animate
      setTimeout(() => { fill.style.width = width + '%'; }, 250);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ─── TYPING EFFECT ─────────────────────────────────────────── */
const typingPhrases = [
  'real projects',
  'frontend builds',
  'AI curiosity',
  'practical growth',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const SPEED_TYPE = 70;
const SPEED_DEL  = 40;
const PAUSE_END  = 1800;
const PAUSE_START= 400;

function typeLoop() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (!isDeleting) {
    // Typing
    typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      // Finished typing — pause then delete
      isDeleting = true;
      setTimeout(typeLoop, PAUSE_END);
      return;
    }
    setTimeout(typeLoop, SPEED_TYPE);
  } else {
    // Deleting
    typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Finished deleting — next phrase
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % typingPhrases.length;
      setTimeout(typeLoop, PAUSE_START);
      return;
    }
    setTimeout(typeLoop, SPEED_DEL);
  }
}

// Start typing after page paint
setTimeout(typeLoop, 1200);

/* ─── SMOOTH SCROLL FOR NAV LINKS ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // nav height offset
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── CONTACT FORM (demo) ────────────────────────────────────── */
sendBtn.addEventListener('click', () => {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formNote.style.color = 'var(--accent-amber)';
    formNote.textContent = '⚠️ Please fill in all fields.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.style.color = 'var(--accent-amber)';
    formNote.textContent = '⚠️ Please enter a valid email.';
    return;
  }

  // Simulate sending
  sendBtn.textContent = 'Sending…';
  sendBtn.disabled    = true;

  setTimeout(() => {
    formNote.style.color = 'var(--accent)';
    formNote.textContent = '✅ Message sent! I\'ll get back to you soon.';
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
    sendBtn.innerHTML  = '<i class="ph-bold ph-paper-plane-tilt"></i> Send Message';
    sendBtn.disabled   = false;

    setTimeout(() => { formNote.textContent = ''; }, 5000);
  }, 1400);
});

/* ─── ACTIVE NAV LINK (highlight on scroll) ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));

/* ─── PAGE LOAD ANIMATION KICKSTART ──────────────────────────── */
// Elements in view on load should animate immediately
window.addEventListener('load', () => {
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

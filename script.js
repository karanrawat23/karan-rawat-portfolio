const $ = id => document.getElementById(id);

const cursor = $("cursor");
const cursorRing = $("cursorRing");
const intro = $("intro");
const introSkip = $("introSkip");
const nav = $("nav");
const themeBtn = $("themeToggle");
const hamburger = $("hamburger");
const mobileMenu = $("mobileMenu");
const backTop = $("backTop");
const typedEl = $("typed");
const sendBtn = $("sendBtn");
const formNote = $("formNote");
const yrEl = $("yr");
const contactForm = $("contactForm");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (intro) {
  let introClosed = false;

  const finishIntro = immediate => {
    if (introClosed) return;
    introClosed = true;
    intro.classList.add(immediate ? "intro--hidden" : "intro--exit");
    document.body.classList.remove("intro-lock");

    window.setTimeout(() => {
      intro.style.display = "none";
    }, immediate ? 60 : 720);
  };

  if (prefersReducedMotion) {
    finishIntro(true);
  } else {
    document.body.classList.add("intro-lock");
    window.setTimeout(() => finishIntro(false), 4200);

    if (introSkip) {
      introSkip.addEventListener("click", () => finishIntro(false), { once: true });
    }
  }
}

if (yrEl) yrEl.textContent = new Date().getFullYear();

if (cursor && cursorRing && finePointer && !prefersReducedMotion) {
  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  document.addEventListener("mousemove", event => {
    mx = event.clientX;
    my = event.clientY;
    cursor.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
  });

  const ringLoop = () => {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    cursorRing.style.transform = `translate(${rx - 15}px,${ry - 15}px)`;
    window.requestAnimationFrame(ringLoop);
  };

  ringLoop();

  document.querySelectorAll("a, button, input, textarea, .pcard, .acard, .tech-tile").forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursorRing.style.width = "48px";
      cursorRing.style.height = "48px";
      cursorRing.style.opacity = ".22";
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.style.width = "30px";
      cursorRing.style.height = "30px";
      cursorRing.style.opacity = ".45";
    });
  });
}

const spotlightSurfaces = document.querySelectorAll(
  ".proof-card, .signal-card, .about-panel, .acard, .tech-tile, .roadmap, .pcard, .cmethod, .contact-form"
);

spotlightSurfaces.forEach(surface => {
  surface.style.setProperty("--spot-x", "50%");
  surface.style.setProperty("--spot-y", "50%");
});

if (finePointer && !prefersReducedMotion) {
  spotlightSurfaces.forEach(surface => {
    surface.addEventListener("pointermove", event => {
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      surface.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  });
}

const savedTheme = localStorage.getItem("kr-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("kr-theme", nextTheme);
  });
}

const handleScrollState = () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
  if (backTop) backTop.classList.toggle("visible", window.scrollY > 500);
};

window.addEventListener("scroll", handleScrollState, { passive: true });
handleScrollState();

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  document.querySelectorAll(".mob-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 90,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
});

const revealItems = document.querySelectorAll(".fade-up");

if (prefersReducedMotion) {
  revealItems.forEach(element => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -36px 0px" });

  revealItems.forEach(element => revealObserver.observe(element));
}

const skillBars = document.querySelectorAll(".sbar__fill");

if (prefersReducedMotion) {
  skillBars.forEach(bar => {
    bar.style.width = `${bar.dataset.w}%`;
  });
} else {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      window.setTimeout(() => {
        entry.target.style.width = `${entry.target.dataset.w}%`;
      }, 200);

      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barObserver.observe(bar));
}

const phrases = [
  "full stack products",
  "animated web experiences",
  "clean UI and real logic",
  "creative digital builds"
];

if (typedEl) {
  if (prefersReducedMotion) {
    typedEl.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];
      typedEl.textContent = phrase.slice(0, deleting ? --charIndex : ++charIndex);

      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        window.setTimeout(type, 1800);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(type, 300);
        return;
      }

      window.setTimeout(type, deleting ? 35 : 68);
    };

    window.setTimeout(type, 1200);
  }
}

const observedSections = document.querySelectorAll("section[id]");

if (observedSections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      document.querySelectorAll(".nav__link").forEach(link => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}` ? "var(--text)" : "";
      });
    });
  }, { threshold: 0.35 });

  observedSections.forEach(section => sectionObserver.observe(section));
}

if (contactForm && sendBtn && formNote) {
  const formAction = contactForm.getAttribute("action") || "";
  const formConfigured = !formAction.includes("YOUR_FORM_ID");

  if (!formConfigured) {
    formNote.style.color = "var(--text-3)";
    formNote.textContent = "Contact form setup is pending. For now, please reach out directly by email.";
  }

  contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      formNote.style.color = "var(--pink)";
      formNote.textContent = "Please fill in all fields.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formNote.style.color = "var(--pink)";
      formNote.textContent = "Please enter a valid email address.";
      return;
    }

    if (!formConfigured) {
      formNote.style.color = "var(--pink)";
      formNote.textContent = "Formspree is not connected yet. Please email me directly at karanrawatxlk@gmail.com.";
      return;
    }

    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;
    formNote.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) throw new Error("Form submission failed");

      formNote.style.color = "var(--cyan)";
      formNote.textContent = "Message sent successfully. I'll get back to you soon.";
      contactForm.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      formNote.style.color = "var(--pink)";
      formNote.textContent = "Failed to send message. Please try again later or contact me directly via email.";
    } finally {
      sendBtn.innerHTML = '<i class="ph-bold ph-paper-plane-tilt"></i> Send Message';
      sendBtn.disabled = false;
    }
  });
}

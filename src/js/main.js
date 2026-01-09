const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("color-theme");
const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
const root = document.documentElement;
if (isDark) {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

const themeToggle = document.querySelector("[data-theme-toggle]");
if (themeToggle) {
  themeToggle.setAttribute("aria-pressed", (isDark).toString());
  themeToggle.addEventListener("click", () => {
    const nowDark = root.classList.toggle("dark");
    localStorage.setItem("color-theme", nowDark ? "dark" : "light");
    themeToggle.setAttribute("aria-pressed", (nowDark).toString());
  });
}

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", (!expanded).toString());
    navMenu.classList.toggle("hidden");
  });
  const navMenuLinks = Array.from(navMenu.querySelectorAll('a[href^="#"]'));
  navMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.add("hidden");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
function setActive(id) {
  navLinks.forEach((a) => {
    const match = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("nav-link-active", match);
    if (match) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { threshold: 0.6 }
);
sections.forEach((s) => io.observe(s));
if (location.hash) {
  const id = location.hash.replace("#", "");
  if (document.getElementById(id)) setActive(id);
} else {
  const first = sections[0];
  if (first) setActive(first.id);
}
const certModal = document.getElementById("cert-modal");
const certModalImage = document.getElementById("cert-modal-image");
const certModalTitle = document.getElementById("cert-modal-title");
const certBackdrop = certModal ? certModal.querySelector("[data-cert-modal-backdrop]") : null;
const certClose = certModal ? certModal.querySelector("[data-cert-modal-close]") : null;
function openCertModal(src, title) {
  if (!certModal || !certModalImage || !certModalTitle) return;
  certModalImage.src = src || "";
  certModalImage.alt = title || "";
  certModalTitle.textContent = title || "";
  certModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeCertModal() {
  if (!certModal) return;
  certModal.classList.add("hidden");
  certModalImage.src = "";
  document.body.style.overflow = "";
}
document.querySelectorAll(".cert-thumb .cert-overlay").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const src = el.getAttribute("href");
    const img = el.parentElement ? el.parentElement.querySelector("img") : null;
    const title = img ? img.getAttribute("alt") || "Certificate" : "Certificate";
    if (src) openCertModal(src, title);
  });
});
if (certBackdrop) {
  certBackdrop.addEventListener("click", () => closeCertModal());
}
if (certClose) {
  certClose.addEventListener("click", () => closeCertModal());
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal && !certModal.classList.contains("hidden")) {
    closeCertModal();
  }
});
const offlineModal = document.getElementById("offline-modal");
const offlineBackdrop = offlineModal ? offlineModal.querySelector("[data-offline-modal-backdrop]") : null;
const offlineClose = offlineModal ? offlineModal.querySelector("[data-offline-modal-close]") : null;
function openOfflineModal() {
  if (!offlineModal) return;
  offlineModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeOfflineModal() {
  if (!offlineModal) return;
  offlineModal.classList.add("hidden");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-offline-view]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openOfflineModal();
  });
});
if (offlineBackdrop) {
  offlineBackdrop.addEventListener("click", () => closeOfflineModal());
}
if (offlineClose) {
  offlineClose.addEventListener("click", () => closeOfflineModal());
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && offlineModal && !offlineModal.classList.contains("hidden")) {
    closeOfflineModal();
  }
});
const revealCandidates = Array.from(
  document.querySelectorAll(
    ".section .grid > *, .section .card, .section h2, .section article, .section .social-card"
  )
);
if (revealCandidates.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("reveal-show");
        } else {
          el.classList.remove("reveal-show");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  revealCandidates.forEach((el, i) => {
    el.classList.add("reveal");
    const delay = Math.min(i % 6, 5) * 100;
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    revealObserver.observe(el);
  });
}

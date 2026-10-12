const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menuButton.textContent = open ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    menuButton.textContent = "☰";
  }));
}

// Parallax ligado al scroll: la escena del hero y la imagen de contacto
// se desplazan a distinta velocidad para dar sensación de profundidad.
const heroScene = document.querySelector(".scene-back");
const contactScene = document.querySelector(".contact-landscape");
let ticking = false;
function updateParallax() {
  const y = window.scrollY || 0;
  if (heroScene && y < window.innerHeight * 1.4) {
    heroScene.style.backgroundPosition = `center ${Math.min(y * 0.12, 90)}px`;
  }
  if (contactScene) {
    const rect = contactScene.parentElement.getBoundingClientRect();
    contactScene.style.transform = `scale(1.08) translate3d(0, ${rect.top * -0.06}px, 0)`;
  }
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });
updateParallax();

// Las secciones aparecen suavemente cuando entran en pantalla.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

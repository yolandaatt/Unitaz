// ====== FYLL I DETTA ======
const CONFIG = {
  appStoreUrl: "",   // t.ex. https://apps.apple.com/se/app/unitaz/id1234567890
  playStoreUrl: "",  // t.ex. https://play.google.com/store/apps/details?id=com.grouporg.app
  contactEmail: "support@unitaz.se"
};
// ==========================

document.getElementById("yr").textContent = new Date().getFullYear();

const links = { appstore: CONFIG.appStoreUrl, play: CONFIG.playStoreUrl };
let anyLive = false;
document.querySelectorAll("[data-store]").forEach(a => {
  const url = links[a.dataset.store];
  if (url) { a.href = url; a.removeAttribute("aria-disabled"); a.target = "_blank"; a.rel = "noopener"; anyLive = true; }
});


const mail = document.getElementById("mailLink");
mail.href = "mailto:" + CONFIG.contactEmail;
mail.textContent = CONFIG.contactEmail;

// Kontaktformulär -> öppnar mejlprogrammet (ingen server behövs)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get("message")}\n\n/ ${f.get("name")} (${f.get("email")})`;
  location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Meddelande från unitaz.se")}&body=${encodeURIComponent(body)}`;
});

// Installera som webbapp (PWA)
let deferred;
const btn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; btn.style.display = "inline-flex"; });
btn.addEventListener("click", async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; btn.style.display = "none"; });
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

// Karusell i telefonen
// Karusell i telefonen (bara i hero)
const shots = document.querySelectorAll(".hero .shot");
if (shots.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let i = 0;
  setInterval(() => {
    shots[i].classList.remove("active");
    i = (i + 1) % shots.length;
    shots[i].classList.add("active");
  }, 3500);
}
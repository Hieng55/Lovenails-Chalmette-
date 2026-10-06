const hours = {
  0: null,
  1: [9.5, 18],
  2: [9.5, 18],
  3: [9.5, 18],
  4: [9.5, 18],
  5: [9, 18],
  6: [9, 18],
};

const statusLabel = document.querySelector("#open-status");
const statusDot = document.querySelector(".status-dot");
const localNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }));
const todayHours = hours[localNow.getDay()];
const currentTime = localNow.getHours() + localNow.getMinutes() / 60;
const isOpen = todayHours && currentTime >= todayHours[0] && currentTime < todayHours[1];
statusLabel.textContent = isOpen ? `Open now · until ${todayHours[1] > 12 ? todayHours[1] - 12 : todayHours[1]} PM` : "Closed now · view hours";
statusDot.style.background = isOpen ? "#9ec78f" : "#d7a27e";

const hoursToggle = document.querySelector(".hours-toggle");
const hoursPopover = document.querySelector("#hours-popover");
const closeHours = document.querySelector(".hours-title button");
function setHours(open) {
  hoursToggle.setAttribute("aria-expanded", String(open));
  hoursPopover.hidden = !open;
}
hoursToggle.addEventListener("click", () => setHours(hoursPopover.hidden));
closeHours.addEventListener("click", () => setHours(false));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setHours(false); });

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

const tabs = [...document.querySelectorAll("[role='tab']")];
const panels = [...document.querySelectorAll("[role='tabpanel']")];
function activateTab(tab) {
  tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
  panels.forEach((panel) => {
    const active = panel.id === tab.getAttribute("aria-controls");
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();

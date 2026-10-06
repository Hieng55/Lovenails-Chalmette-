const serviceMenu = {
  pedicures: {
    label: "Pedicures",
    items: [
      ["Basic Pedicure", "$30", "$30.60", "Fragrant soak, nail grooming, warm towel, foot massage, and polish."],
      ["Callus Care Pedicure", "$35", "$35.70", "Basic Pedicure plus professional callus care and sugar scrub."],
      ["Spa Pedicure", "$40", "$40.80", "Callus care, sugar scrub, essential oil massage, paraffin, and polish."],
      ["Jelly Spa Pedicure", "$45", "$45.90", "Jelly soak, callus care, sugar scrub, foot mask, massage, and polish."],
      ["Signature Spa Pedicure", "$50", "$51.00", "Warm steam, salt soak, callus care, scrub, mask, massage candle, hot stones, and paraffin."],
      ["Volcano Pedicure", "$60", "$61.20", "Volcano soak, brown sugar scrub, collagen mask, hot stones, steam, herbal neck towel, and paraffin."]
    ]
  },
  manicures: { label: "Manicures", items: [["Regular Manicure", "$25", "$25.50"], ["Gel Manicure", "$35", "$35.70"]] },
  enhancements: {
    label: "Nail Enhancements",
    items: [
      ["Regular Full Set", "$35+", "$35.70+"], ["Gel Full Set", "$45+", "$45.90+"], ["Regular Refill", "$25+", "$25.50+"], ["Gel Refill", "$35+", "$35.70+"],
      ["Gel Ombre Full Set", "$55+", "$56.10+"], ["Gel Ombre Refill", "$45+", "$45.90+"], ["Color Powder Full Set", "$45+", "$45.90+"], ["Color Powder Refill", "$35+", "$35.70+"],
      ["Dipping Powder", "$45+", "$45.90+"], ["Dipping Powder with Tips", "$50+", "$51.00+"], ["Gel-X", "$50+", "$51.00+"], ["Gel-X Refill", "$45+", "$45.90+"],
      ["Builder Gel", "$50+", "$51.00+"], ["Builder Gel Refill", "$45+", "$45.90+"]
    ]
  },
  polish: { label: "Polish & Design", items: [["Regular Polish", "$15", "$15.30"], ["Regular Toe Polish", "$15", "$15.30"], ["Gel Polish", "$20", "$20.40"], ["Gel Toe Polish", "$20", "$20.40"], ["Chrome", "$10+", "$10.20+"], ["Cat-Eye", "$10+", "$10.20+"], ["Nail Art", "$5+", "$5.10+"], ["French Tip", "$10–$15", "$10.20–$15.30"]] },
  lashes: { label: "Lashes & Waxing", items: [["Strip Lashes", "$15–$20+", "$15.30–$20.40+"], ["Individual Lashes", "$55–$65+", "$56.10–$66.30+"], ["1D Classic Lash Extensions", "$100+", "$102+"], ["3D Classic Lash Extensions", "$120+", "$122.40+"], ["Hybrid Lash Extensions", "$150+", "$153+"], ["Eyebrows", "$15", "$15.30"], ["Upper Lip", "$10", "$10.20"], ["Chin", "$15+", "$15.30+"], ["Full Face", "$45–$55+", "$45.90–$56.10+"], ["Underarms", "$35+", "$35.70+"], ["Full Legs", "$70+", "$71.40+"]] },
  additional: { label: "Additional", items: [["Nail Repair", "$5+", "$5.10+"], ["Acrylic Soak-Off", "$15", "$15.30"], ["Acrylic Soak-Off with Service", "$10", "$10.20"], ["Dip/Gel Soak-Off", "$10", "$10.20"], ["Dip/Gel Soak-Off with Service", "$5", "$5.10"], ["Cut Down", "$5–$10", "$5.10–$10.20"], ["Shape", "$5+", "$5.10+"], ["Length", "$5+", "$5.10+"], ["Gel Polish with Pedicure", "$15", "$15.30"]] }
};

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("open", open);
  document.body.classList.toggle("nav-open", open);
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  document.body.classList.remove("nav-open");
}));

const dialog = document.querySelector("#service-menu");
const tabContainer = dialog.querySelector(".dialog-tabs");
const dialogHeading = dialog.querySelector(".dialog-title h3");
const dialogList = dialog.querySelector(".dialog-list");

Object.entries(serviceMenu).forEach(([key, category]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("role", "tab");
  button.dataset.category = key;
  button.textContent = category.label;
  button.addEventListener("click", () => renderCategory(key));
  tabContainer.appendChild(button);
});

function renderCategory(key) {
  const category = serviceMenu[key] || serviceMenu.pedicures;
  dialogHeading.textContent = category.label;
  tabContainer.querySelectorAll("button").forEach((button) => button.setAttribute("aria-selected", String(button.dataset.category === key)));
  dialogList.replaceChildren(...category.items.map(([name, cash, card, description]) => {
    const row = document.createElement("div");
    row.className = "dialog-row";
    const service = document.createElement("span");
    service.textContent = name;
    if (description) {
      const details = document.createElement("small");
      details.textContent = description;
      service.appendChild(details);
    }
    const cashPrice = document.createElement("span");
    cashPrice.textContent = cash;
    const cardPrice = document.createElement("span");
    cardPrice.textContent = card;
    row.append(service, cashPrice, cardPrice);
    return row;
  }));
}

document.querySelectorAll("[data-open-menu]").forEach((button) => button.addEventListener("click", () => {
  renderCategory(button.dataset.category || "pedicures");
  dialog.showModal();
}));
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...navigation.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55%" });
sections.forEach((section) => sectionObserver.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();

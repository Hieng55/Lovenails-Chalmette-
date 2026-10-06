const activePage = document.body.dataset.page || "home";
const bookingUrl = "https://abcapp.us/?appid=vvCv0Hv";
const mapUrl = "https://www.google.com/maps?cid=16055925419700883658";

const headerTarget = document.querySelector("[data-site-header]");
if (headerTarget) {
  headerTarget.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="topbar">
      <a href="${mapUrl}" target="_blank" rel="noopener"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>1916 E Judge Perez Dr, Chalmette, LA 70043</span></a>
      <a href="tel:+15042184059"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg><span>+1 504-218-4059</span></a>
      <a href="https://www.instagram.com/lovenails.chalmette/" target="_blank" rel="noopener"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg><span>Follow us</span></a>
    </div>
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="Love Nails Chalmette home"><img src="assets/logo.png" alt="Love Nails Lashes and Brows" /></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>
      <nav id="site-nav" aria-label="Main navigation">
        <a class="${activePage === "home" ? "active" : ""}" href="index.html">Home</a>
        <a class="${activePage === "about" ? "active" : ""}" href="about.html">About Us</a>
        <a class="${activePage === "services" ? "active" : ""}" href="services.html">Services</a>
        <a class="${activePage === "gallery" ? "active" : ""}" href="gallery.html">Gallery</a>
        <a class="${activePage === "contact" ? "active" : ""}" href="contact.html">Contact</a>
      </nav>
      <a class="outline-button header-book" href="${bookingUrl}" target="_blank" rel="noopener">Book Appointment</a>
    </header>`;
}

const footerTarget = document.querySelector("[data-site-footer]");
if (footerTarget) {
  footerTarget.innerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand"><img src="assets/logo.png" alt="Love Nails Lashes and Brows" /><p>Where beauty feels calm, clean, and luxurious.</p><div class="footer-social"><a href="https://www.instagram.com/lovenails.chalmette/" target="_blank" rel="noopener" aria-label="Instagram">IG</a><a href="https://www.facebook.com/LoveNailsLashesandBrows" target="_blank" rel="noopener" aria-label="Facebook">f</a><a href="${mapUrl}" target="_blank" rel="noopener" aria-label="Google Maps">G</a></div></div>
        <div><h3>Contact Us</h3><a href="${mapUrl}" target="_blank" rel="noopener">1916 E Judge Perez Dr<br />Chalmette, LA 70043</a><a href="tel:+15042184059">+1 504-218-4059</a><p>Mon–Thu: 9:30 AM–6 PM<br />Fri–Sat: 9 AM–6 PM<br />Sun: Closed</p></div>
        <div><h3>Quick Links</h3><a href="index.html">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="gallery.html">Gallery</a><a href="contact.html">Contact</a></div>
        <div><h3>Book Appointment</h3><p>Walk-ins welcome or book your appointment online.</p><a class="footer-book" href="${bookingUrl}" target="_blank" rel="noopener">Book Now</a></div>
      </div>
      <div class="copyright">© <span data-year></span> Love Nails Chalmette. All rights reserved.</div>
    </footer>
    <a class="mobile-book" href="${bookingUrl}" target="_blank" rel="noopener">Book Appointment</a>`;
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
if (menuToggle && navigation) {
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
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-category]");
filterButtons.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle("active", item === button));
  galleryItems.forEach((item) => item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter));
}));

document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });

document.querySelectorAll(".price-row .cash, .price-row .card, .pedicure-details strong").forEach((element) => {
  element.textContent = element.textContent
    .replace(/(\d+)\.00(?=\D|$)/g, "$1")
    .replace(/(\d+\.\d)0(?=\D|$)/g, "$1");
});

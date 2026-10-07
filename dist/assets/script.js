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
      <a href="https://www.instagram.com/lovenails.chalmette/" target="_blank" rel="noopener"><img class="social-icon" src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg" alt="" /><span>Follow us</span></a>
    </div>
    <header class="site-header">
      <a class="brand" href="./" aria-label="Love Nails Chalmette home"><img src="assets/logo.png" alt="Love Nails Lashes and Brows" /></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>
      <nav id="site-nav" aria-label="Main navigation">
        <a class="${activePage === "home" ? "active" : ""}" href="./">Home</a>
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
        <div class="footer-brand"><img src="assets/logo.png" alt="Love Nails Lashes and Brows" /><p>Where beauty feels calm, clean, and luxurious.</p><div class="footer-social"><a href="https://www.instagram.com/lovenails.chalmette/" target="_blank" rel="noopener" aria-label="Instagram"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg" alt="" /></a><a href="https://www.facebook.com/LoveNailsLashesandBrows" target="_blank" rel="noopener" aria-label="Facebook"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg" alt="" /></a><a href="${mapUrl}" target="_blank" rel="noopener" aria-label="Google Maps"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-maps/default.svg" alt="" /></a></div></div>
        <div><h3>Contact Us</h3><a href="${mapUrl}" target="_blank" rel="noopener">1916 E Judge Perez Dr<br />Chalmette, LA 70043</a><a href="tel:+15042184059">+1 504-218-4059</a><p>Mon–Thu: 9:30 AM–6 PM<br />Fri–Sat: 9 AM–6 PM<br />Sun: Closed</p></div>
        <div><h3>Quick Links</h3><a href="./">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="gallery.html">Gallery</a><a href="contact.html">Contact</a></div>
        <div><h3>Book Appointment</h3><p>Walk-ins welcome or book your appointment online.</p><a class="footer-book" href="${bookingUrl}" target="_blank" rel="noopener">Book Now</a></div>
      </div>
      <div class="copyright">© <span data-year></span> Love Nails Chalmette. All rights reserved by TD TRANSACTIONS LLC</div>
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

document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });

const galleryImages = Array.from(document.querySelectorAll(".gallery-page-grid .gallery-item img, .home-gallery-grid .gallery-slot img"));
if (galleryImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Gallery image viewer");
  lightbox.innerHTML = `
    <button class="gallery-lightbox-close" type="button" aria-label="Close image viewer"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
    <button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Previous image"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg></button>
    <img class="gallery-lightbox-image" src="" alt="" />
    <button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Next image"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>`;
  document.body.appendChild(lightbox);

  const displayedImage = lightbox.querySelector(".gallery-lightbox-image");
  const closeButton = lightbox.querySelector(".gallery-lightbox-close");
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    displayedImage.src = galleryImages[currentIndex].src;
    displayedImage.alt = galleryImages[currentIndex].alt;
  };
  const openLightbox = (index) => {
    showImage(index);
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    galleryImages[currentIndex].parentElement.focus();
  };

  galleryImages.forEach((image, index) => {
    const trigger = image.parentElement;
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", `Open image ${index + 1} of ${galleryImages.length}`);
    trigger.addEventListener("click", () => openLightbox(index));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.querySelector(".gallery-lightbox-prev").addEventListener("click", () => showImage(currentIndex - 1));
  lightbox.querySelector(".gallery-lightbox-next").addEventListener("click", () => showImage(currentIndex + 1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });
}

document.querySelectorAll(".price-row .cash, .price-row .card, .pedicure-details strong").forEach((element) => {
  element.textContent = element.textContent
    .replace(/(\d+)\.00(?=\D|$)/g, "$1")
    .replace(/(\d+\.\d)0(?=\D|$)/g, "$1");
});

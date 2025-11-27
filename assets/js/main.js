document.addEventListener("DOMContentLoaded", () => {
  setupCarousels();
  setupNavToggle();
  setCurrentYear();
});

/**
 * Setup all carousels on the page.
 * Each .carousel works independently.
 */
function setupCarousels() {
  const carousels = document.querySelectorAll(".carousel");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");

    if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === currentIndex);
      });
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    });

    // Auto-rotate (optional)
    const intervalMs = 9000;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    }, intervalMs);

    updateSlides();
  });
}

/**
 * Mobile navigation toggle.
 */
function setupNavToggle() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  // Close nav when clicking a link on mobile
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
    });
  });
}

/**
 * Set footer year dynamically.
 */
function setCurrentYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

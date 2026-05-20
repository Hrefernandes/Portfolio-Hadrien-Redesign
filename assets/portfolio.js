/* ==========================================================
   Portfolio — JS commun à toutes les pages
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ============== Reveal au scroll ============== */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ============== Curseur custom ============== */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring && !("ontouchstart" in window) && window.innerWidth > 900) {
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;

    document.body.classList.add("has-cursor");
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverEls = document.querySelectorAll(
      "a, button, .hero-image-frame, .logo-track img, .card, .doc-btn, .featured-card, .banner-presentation img"
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover")
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover")
      );
    });
  }

  /* ============== Navbar dynamique au scroll ============== */
  const nav = document.querySelector(".navbar");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 30) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  /* ============== Parallax léger sur la photo (accueil) ============== */
  const heroImage = document.querySelector(".hero-image-frame");
  if (heroImage && window.innerWidth > 900) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ============== Carrousel infini des logos (accueil) ============== */
  const track = document.querySelector(".logo-track");
  if (track && track.classList.contains("logo-track--marquee")) {
    const speed = 0.6;
    const logos = Array.from(track.children);
    logos.forEach((logo) => {
      track.appendChild(logo.cloneNode(true));
      track.appendChild(logo.cloneNode(true));
    });
    let position = 0;
    let paused = false;
    track.addEventListener("mouseenter", () => (paused = true));
    track.addEventListener("mouseleave", () => (paused = false));

    function scrollLogos() {
      if (!paused) {
        position -= speed;
        const firstWidth = logos[0].offsetWidth + 64;
        if (Math.abs(position) >= firstWidth) {
          position = 0;
          track.appendChild(track.firstElementChild);
        }
        track.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(scrollLogos);
    }
    scrollLogos();
  }

  /* ============== Lightbox des images (pages détail) ============== */
  const overlay = document.getElementById("overlay");
  const overlayImg = document.getElementById("overlay-img");
  const closeBtn = document.querySelector(".close-btn");
  if (overlay && overlayImg) {
    const detailImages = document.querySelectorAll(".banner-presentation img");
    detailImages.forEach((img) => {
      img.addEventListener("click", function () {
        overlay.classList.add("is-open");
        overlayImg.src = this.src;
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () =>
        overlay.classList.remove("is-open")
      );
    }
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("is-open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("is-open");
    });
  }
});

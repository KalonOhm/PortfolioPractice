const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

if (slides.length > 0) {
  showSlides();
}

function currentSlide(index) {
  slideIndex = index;
  showSlides();
}

function plusSlides(step) {
  if (step < 0) {
    slideIndex -= 2;

    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
  }

  showSlides();
}

function showSlides() {
  if (slides.length === 0) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    if (dots[i]) {
      dots[i].classList.remove("active");
    }
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Cursor follow effect
function initCursor() {
  // Only enable on devices with a fine pointer (mouse)
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const follower = document.createElement("div");
  follower.classList.add("cursor-follower");
  document.body.appendChild(follower);

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isMoving = false;
  let firstMove = true;
  let targetScale = 1;
  let currentScale = 1;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (firstMove) {
      followerX = mouseX;
      followerY = mouseY;
      firstMove = false;
    }

    if (!isMoving) {
      isMoving = true;
      follower.classList.add("active");
      tick();
    }
  });

  document.addEventListener("mouseleave", () => {
    follower.classList.remove("active");
  });

  document.addEventListener("mouseenter", () => {
    follower.classList.add("active");
  });

  window.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .nav-toggle, [role='button'], .btn, .btn2, .portfolio__item")) {
      targetScale = 1.8;
    } else {
      targetScale = 1;
    }
  });

  function tick() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    followerX += dx * 0.15;
    followerY += dy * 0.15;

    currentScale += (targetScale - currentScale) * 0.15;

    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(${currentScale})`;

    requestAnimationFrame(tick);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCursor);
} else {
  initCursor();
}

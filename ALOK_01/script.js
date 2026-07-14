window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  preloader.style.opacity = "0";

  preloader.style.visibility = "hidden";

  preloader.style.transition = "0.5s";
});

AOS.init({
  duration: 1000,

  once: true,

  offset: 80,
});

const menuBtn = document.querySelector(".menu-btn");

const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.padding = "14px 0";

    header.style.background = "rgba(10,15,25,.92)";

    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
  } else {
    header.style.padding = "20px 0";

    header.style.background = "rgba(10,15,25,.55)";

    header.style.boxShadow = "none";
  }
});

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;

  progressBar.style.width = progress + "%";
});

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topBtn.style.display = "flex";

    topBtn.style.justifyContent = "center";

    topBtn.style.alignItems = "center";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

const typingElement = document.getElementById("typing");

const words = [
  "Frontend Developer",

  "UI / UX Designer",

  "React Developer",

  "JavaScript Enthusiast",
];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.substring(0, charIndex++);

    if (charIndex > currentWord.length) {
      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex--);

    if (charIndex < 0) {
      deleting = false;

      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const revealElements = document.querySelectorAll(
  ".project-card,.service-card,.skill-card,.about-box,.testimonial-card",
);

const reveal = () => {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;

    const revealTop = element.getBoundingClientRect().top;

    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("fade-up");
    }
  });
};

window.addEventListener("scroll", reveal);

reveal();

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Thank you! Your message has been sent successfully.");

  form.reset();
});

console.log(
  "%cWelcome to Jiban Jyoti Portfolio 🚀",

  "color:#00e5ff;font-size:18px;font-weight:bold;",
);

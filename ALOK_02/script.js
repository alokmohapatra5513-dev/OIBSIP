const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.background = "rgba(0,0,0,0.9)";
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.4)";
  } else {
    header.style.background = "rgba(0,0,0,.25)";
    header.style.boxShadow = "none";
  }
});

const reveals = document.querySelectorAll(
  ".hero-left,.hero-right,.about,.skills,.services,.projects,.contact",
);

function revealSections() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top < trigger) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);

revealSections();

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const text = [
  "Frontend Web Developer",
  "React Developer",
  "Responsive UI Designer",
  "UI/UX Enthusiast",
];

const typingElement = document.querySelector(".hero-left h2");

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentText = text[textIndex];

  if (!deleting) {
    typingElement.textContent = currentText.substring(0, charIndex++);

    if (charIndex > currentText.length) {
      deleting = true;

      setTimeout(typeEffect, 1200);

      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex--);

    if (charIndex < 0) {
      deleting = false;

      textIndex++;

      if (textIndex >= text.length) textIndex = 0;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 100);
}

typeEffect();

const style = document.createElement("style");

style.innerHTML = `
.hero-left,
.hero-right,
.about,
.skills,
.services,
.projects,
.contact{

opacity:0;

transform:translateY(60px);

transition:all 1s ease;

}

.show{

opacity:1;

transform:translateY(0);

}

.nav-links a.active{

color:#00d4ff;

}

`;

document.head.appendChild(style);

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
bottom:30px;
right:30px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#00d4ff;
color:#000;
font-size:24px;
cursor:pointer;
display:none;
z-index:999;
transition:.3s;
box-shadow:0 10px 25px rgba(0,212,255,.3);
`;

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topBtn.style.display = "block";
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

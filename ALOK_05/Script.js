document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.background = "rgba(2,6,23,.95)";
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.4)";
  } else {
    header.style.background = "rgba(15,23,42,.65)";
    header.style.boxShadow = "none";
  }
});

const revealElements = document.querySelectorAll(
  ".about, .timeline, .quote, .awards, .facts",
);

function reveal() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 120) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);

reveal();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (pageYOffset >= sectionTop) {
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
background:#38bdf8;
color:#0f172a;
font-size:24px;
font-weight:bold;
cursor:pointer;
display:none;
transition:.3s;
z-index:999;
box-shadow:0 10px 25px rgba(56,189,248,.4);
`;

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
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

const style = document.createElement("style");

style.innerHTML = `

.about,
.timeline,
.quote,
.awards,
.facts{

opacity:0;
transform:translateY(70px);
transition:all .9s ease;

}

.show{

opacity:1;
transform:translateY(0);

}

.active{

color:#38bdf8 !important;

}

`;

document.head.appendChild(style);

const heroTitle = document.querySelector(".hero-content h1");

heroTitle.animate(
  [
    {
      opacity: 0,
      transform: "translateY(-40px)",
    },

    {
      opacity: 1,
      transform: "translateY(0)",
    },
  ],

  {
    duration: 1200,
    easing: "ease-out",
  },
);

const button = document.querySelector(".btn");

button.addEventListener("mouseenter", () => {
  button.style.transform = "scale(1.08)";
});

button.addEventListener("mouseleave", () => {
  button.style.transform = "scale(1)";
});

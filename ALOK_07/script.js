const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginUser = document.getElementById("loginUser");
const loginPassword = document.getElementById("loginPassword");

const registerUsername = document.getElementById("registerUsername");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

const loginError = document.getElementById("loginError");
const registerError = document.getElementById("registerError");

const loginToggle = document.getElementById("loginToggle");
const registerToggle = document.getElementById("registerToggle");

let users = JSON.parse(localStorage.getItem("users")) || [];

showRegister.addEventListener("click", function (e) {
  e.preventDefault();

  loginForm.classList.remove("active");

  registerForm.classList.add("active");

  loginError.textContent = "";

  registerError.textContent = "";
});

showLogin.addEventListener("click", function (e) {
  e.preventDefault();

  registerForm.classList.remove("active");

  loginForm.classList.add("active");

  loginError.textContent = "";

  registerError.textContent = "";
});

function togglePassword(toggle, input) {
  toggle.addEventListener("click", function () {
    if (input.type === "password") {
      input.type = "text";

      toggle.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
      input.type = "password";

      toggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
  });
}

togglePassword(loginToggle, loginPassword);

togglePassword(registerToggle, registerPassword);

function validPassword(password) {
  const pattern = /^(?=.*\d).{8,}$/;

  return pattern.test(password);
}

async function hashPassword(password) {
  const encoder = new TextEncoder();

  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  registerError.textContent = "";

  const username = registerUsername.value.trim();

  const email = registerEmail.value.trim().toLowerCase();

  const password = registerPassword.value;

  if (username === "" || email === "" || password === "") {
    registerError.textContent = "Please fill in all fields.";

    return;
  }

  if (!validPassword(password)) {
    registerError.textContent =
      "Password must be at least 8 characters and contain at least one number.";

    return;
  }

  const usernameExists = users.some(function (user) {
    return user.username.toLowerCase() === username.toLowerCase();
  });

  if (usernameExists) {
    registerError.textContent = "Username already exists.";

    return;
  }

  const emailExists = users.some(function (user) {
    return user.email === email;
  });

  if (emailExists) {
    registerError.textContent = "Email already registered.";

    return;
  }

  const hashedPassword = await hashPassword(password);

  users.push({
    username: username,

    email: email,

    password: hashedPassword,
  });

  localStorage.setItem("users", JSON.stringify(users));

  registerForm.reset();

  registerError.style.color = "#22c55e";

  registerError.textContent = "Registration successful! Please login.";

  setTimeout(function () {
    registerError.textContent = "";

    registerError.style.color = "#ef4444";

    registerForm.classList.remove("active");

    loginForm.classList.add("active");
  }, 1500);
});

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  loginError.textContent = "";

  const usernameOrEmail = loginUser.value.trim();

  const password = loginPassword.value;

  if (usernameOrEmail === "" || password === "") {
    loginError.textContent = "Please enter your credentials.";

    return;
  }

  const hashedPassword = await hashPassword(password);

  const user = users.find(function (item) {
    return (
      (item.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
        item.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
      item.password === hashedPassword
    );
  });

  if (!user) {
    loginError.textContent = "Invalid username/email or password.";

    return;
  }

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({
      username: user.username,

      email: user.email,
    }),
  );

  window.location.href = "dashboard.html";
});

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (currentUser && window.location.pathname.includes("index.html")) {
  window.location.href = "dashboard.html";
}

if (window.location.pathname.includes("dashboard.html")) {
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    const usernameElement = document.getElementById("username");

    if (usernameElement) {
      usernameElement.textContent = currentUser.username;
    }
  }
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
  });
}

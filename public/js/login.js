// ADJUST ENDPOINTS

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Send a post request to API endpoint
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect browser to homepage
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(email, username, password);
  if (email && username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

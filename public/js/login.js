const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Send a post request to API endpoint
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect browser to homepage
      document.location.replace("/home");
    } else {
      // this does nothing
      alert(response.statusText);
    }
  }
};

document
  .getElementById("login-form")
  .addEventListener("submit", loginFormHandler);

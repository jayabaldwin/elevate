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
      setTimeout(function () {
        // Show the result notification
        var notification = document.getElementById("resultNotification");
        notification.classList.remove("hide");

        // Set a timeout to hide the notification after 1 seconds
        setTimeout(function () {
          notification.classList.add("hide");
        }, 1000);
      }, 1000);
      // If successful, redirect browser to homepage
      document.location.replace("/home");
    } else {
      // this does nothing
      alert(response.statusText);
      setTimeout(function () {
        // Show the result notification
        var notification = document.getElementById("resultIncorrect");
        notification.classList.remove("hide");

        // Set a timeout to hide the notification once submit button is clicked again
        setTimeout(function () {
          document
            .getElementById("login-form")
            .addEventListener("submit", function (event) {
              notification.classList.add("hide");
            });
        }, 1000);
      }, 1000);
    }
  }
};

document
  .getElementById("login-form")
  .addEventListener("submit", loginFormHandler);

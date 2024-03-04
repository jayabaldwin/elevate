// HOW TO INCLUDE PROFILE PICTURE?
const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const workspaceName = document.getElementById("workspaceName").value.trim();
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();

  // Add password confirmation
  if (email && username && password && first && last) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, username, password, first, last }),
      headers: { "Content-Type": "application/json" },
    });

    let ok = response.ok;

    if (ok && workspaceName) {
      const result = await fetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify({ name: workspaceName }),
        headers: { "Content-Type": "application/json" },
      });

      ok = result.ok;
    }

    if (ok) {
      document.location.replace("/home");
    } else {
      // CHANGE ALERT
      alert(response.statusText);
    }
  }
};

document
  .getElementById("workspaceForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("workplace-info").style.display = "none";
    const userInfo = document.getElementById("user-info");
    userInfo.classList.remove("hide");
  });

document
  .getElementById("user-info")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("userDetails").style.display = "none";
    const signUp = document.getElementById("user-loginDetails");
    signUp.classList.remove("hide");
  });

document
  .getElementById("signup-form")
  .addEventListener("submit", signupFormHandler);

const signupFormHandler = async (event) => {
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordConfirm = document
    .querySelector("#password-confirm")
    .value.trim();
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();

  // Check password values are equal
  if (password != passwordConfirm) {
    setTimeout(function () {
      // Show the result notification
      var notification = document.getElementById("passwordUnmatch");
      notification.classList.remove("hide");

      // Set a timeout to hide the notification once submit button is clicked again
      setTimeout(function () {
        document
          .getElementById("signup-form")
          .addEventListener("submit", function (event) {
            notification.classList.add("hide");
          });
      }, 1000);
    }, 500);
    // alert("Passwords must match");
    return;
  }

  if (email && username && password && first && last) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, username, password, first, last }),
      headers: { "Content-Type": "application/json" },
    });

    let ok = response.ok;

    if (ok) {
      response.json("Successfully logged in");
      setTimeout(function () {
        // Show the result notification
        var notification = document.getElementById("resultNotification");
        notification.classList.remove("hide");

        // Set a timeout to hide the notification after 1 seconds
        setTimeout(function () {
          notification.classList.add("hide");
        }, 1000);

        setTimeout(function () {
          document.getElementById("user-loginDetails").style.display = "none";
          const newWorkspace = document.getElementById("newWorkspace");
          newWorkspace.classList.remove("hide");
        }, 2000);
      }, 1000);
    } else {
      // Change this section
      // alert(response.statusText);
      setTimeout(function () {
        // Show the result notification
        var notification = document.getElementById("resultIncorrect");
        notification.classList.remove("hide");

        // Set a timeout to hide the notification once submit button is clicked again
        setTimeout(function () {
          document
            .getElementById("signup-form")
            .addEventListener("submit", function (event) {
              notification.classList.add("hide");
            });
        }, 1000);
      }, 1000);
    }
  }
};

// First name and last name
document
  .getElementById("userDetails")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("userDetails").style.display = "none";
    const signUp = document.getElementById("user-loginDetails");
    signUp.classList.remove("hide");
  });

// Sign up form with username/password
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    signupFormHandler();
  });

// Redirect to create workspace
document
  .getElementById("createOpt")
  .addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("newWorkspace").style.display = "none";
    const create = document.getElementById("workplace-create");
    create.classList.remove("hide");
  });

// Redirect to join workspace
document.getElementById("joinOpt").addEventListener("click", function (event) {
  event.preventDefault();

  document.getElementById("newWorkspace").style.display = "none";
  const join = document.getElementById("workplace-join");
  join.classList.remove("hide");
});

// Create workspace
document
  .querySelector("#workspaceForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const workspaceName = document.getElementById("workspaceName").value.trim();

    if (workspaceName) {
      const response = await fetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify({ name: workspaceName }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const workspace = await response.json();
        await fetch(`/api/workspace/add-user/${workspace.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });

        console.log("Added new workspace");
        document.getElementById("generate-code").style.display = "none";
        const code = document.getElementById("code-success");
        code.classList.remove("hide");
        const joinSpace = document.getElementById("enter-workspace");
        joinSpace.classList.remove("hide");

        joinSpace.addEventListener("Click", async function (e) {
          // REDIRECT TO HOME/WORKSPACE ID
          document.location.replace("/home");
        });
      } else {
        // alert("Unable to add workspace");

        setTimeout(function () {
          // Show the result notification
          var notification = document.getElementById("noWorkspace");
          notification.classList.remove("hide");
        }, 1000);
      }
    } else {
      alert(response.statusText);
    }
  });

// Join workspace
document
  .querySelector("#joinForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const join_code = document.querySelector("#join-code").value.trim();

    // use the join code to look up the workspace
    const response = await fetch(`/api/workspace/${join_code}`);
    if (response.ok) {
      const workspace = await response.json();
      console.log(workspace);
      //add user to workspace
      const addUserRes = await fetch(
        `/api/workspace/add-user/${workspace.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (addUserRes.ok) {
        console.log(addUserRes);
        // REDIRECT TO WORKSPACE ID
        document.location.replace("/home");
        console.log("Added user to workspace ", workspace.id);
      } else {
        // alert("Unable to add you to workspace.");
        setTimeout(function () {
          // Show the result notification
          var notification = document.getElementById("noWorkspace");
          notification.classList.remove("hide");

          // Set a timeout to hide the notification after 2 seconds
          setTimeout(function () {
            notification.classList.add("hide");
          }, 2000);
        }, 1000);
      }
      // } else {
      //   alert("Workspace not found! Try again.");
    }
  });

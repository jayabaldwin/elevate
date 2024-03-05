// HOW TO INCLUDE PROFILE PICTURE?
const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
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

    if (ok) {
      res.json("Successfully logged in");
    } else {
      // CHANGE ALERT
      alert(response.statusText);
    }
  }
};

const generateUUID = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// Creating a new workspace
const newWorkspace = async (event) => {
  const workspaceName = document.getElementById("workspaceName").value.trim();
  const join_code = generateUUID(12);

  console.log(join_code);

  if (workspaceName) {
    const result = await fetch("/api/workspace", {
      method: "POST",
      body: JSON.stringify({ name: workspaceName, join_code: join_code }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    alert(response.statusText);
  }
};

// Create workspace
document
  .querySelector("#generate-code")
  .addEventListener("click", async function (e) {
    const workspaceName = document.getElementById("workspaceName").value.trim();

    if (workspaceName) {
      const response = await fetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify({ name: workspaceName }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/home");
        console.log("Added new workspace");
      } else {
        alert("Unable to add workspace");
      }
    } else {
      alert(response.statusText);
    }
  });

// Join workspace
document
  .querySelector("#join-btn")
  .addEventListener("click", async function (e) {
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
        document.location.replace("/home");
        console.log("Added user to workspace ", workspace.id);
      } else {
        alert("Unable to add you to workspace.");
        document.location.replace("/");
      }
    } else {
      alert("Workspace not found! Try again.");
    }
  });

// First name and last name
document
  .getElementById("user-info")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("user-info").style.display = "none";
    const signUp = document.getElementById("user-loginDetails");
    signUp.classList.remove("hide");
  });

// Sign up form with username/password
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    setTimeout(function () {
      // Show the result notification
      var notification = document.getElementById("resultNotification");
      notification.classList.remove("hide");

      // Set a timeout to hide the notification after 2 seconds
      setTimeout(function () {
        notification.classList.add("hide");
      }, 1000);

      setTimeout(function () {
        document.getElementById("user-loginDetails").style.display = "none";
        const newWorkspace = document.getElementById("newWorkspace");
        newWorkspace.classList.remove("hide");
      }, 1000);
    }, 1000);

    signupFormHandler;
  });

// Redirect to create workspace
document
  .getElementById("createOpt")
  .addEventListener("click", function (event) {
    event.preventDefault();

    console.log("Create button clicked");

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

// Submit workspace name and generate code on screen
// document
//   .getElementById("workspaceForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     newWorkspace;
//   });

// if (ok && workspaceName) {
//   const result = await fetch("/api/workspace", {
//     method: "POST",
//     body: JSON.stringify({ name: workspaceName }),
//     headers: { "Content-Type": "application/json" },
//   });

//   ok = result.ok;
// }

// document
//   .getElementById("workspaceForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     document.getElementById("workplace-info").style.display = "none";
//     const userInfo = document.getElementById("user-info");
//     userInfo.classList.remove("hide");

const signupFormHandler = async (event) => {
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();

  if (email && username && password && first && last) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, username, password, first, last }),
      headers: { "Content-Type": "application/json" },
    });

    let ok = response.ok;

    if (ok) {
      response.json("Successfully logged in");
    } else {
      // CHANGE ALERT
      alert(response.statusText);
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
        document.location.replace("/home");
      } else {
        alert("Unable to add workspace");
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

// const signupFormHandler = async (event) => {
//   event.preventDefault();

//   const email = document.querySelector("#email-signup").value.trim();
//   const username = document.querySelector("#username-signup").value.trim();
//   const password = document.querySelector("#password-signup").value.trim();
//   const first = document.getElementById("firstName").value.trim();
//   const last = document.getElementById("lastName").value.trim();

//   // Add password confirmation
//   if (email && username && password && first && last) {
//     const response = await fetch("/api/users", {
//       method: "POST",
//       body: JSON.stringify({ email, username, password, first, last }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       res
//         .status(200)
//         .json({ message: "Successfully added user", type: "success" });
//       console.log("Successfully added user");
//     } else {
//       alert("User not added");
//       console.log("User not added");
//     }
//   }
// };

// // Create workspace
// document
//   .querySelector("#generate-code")
//   .addEventListener("click", async function (e) {
//     const workspaceName = document.getElementById("workspaceName").value.trim();

//     if (workspaceName) {
//       const response = await fetch("/api/workspace", {
//         method: "POST",
//         body: JSON.stringify({ name: workspaceName }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.ok) {
//         document.location.replace("/home");
//         console.log("Added new workspace");
//       } else {
//         alert("Unable to add workspace");
//       }
//     } else {
//       alert(response.statusText);
//     }
//   });

// // Join workspace
// document
//   .querySelector("#join-btn")
//   .addEventListener("click", async function (e) {
//     const join_code = document.querySelector("#join-code").value.trim();

//     // use the join code to look up the workspace
//     const response = await fetch(`/api/workspace/${join_code}`);
//     if (response.ok) {
//       const workspace = await response.json();
//       console.log(workspace);
//       //add user to workspace
//       const addUserRes = await fetch(
//         `/api/workspace/add-user/${workspace.id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       if (addUserRes.ok) {
//         document.location.replace("/home");
//         console.log("Added user to workspace ", workspace.id);
//       } else {
//         alert("Unable to add you to workspace.");
//         document.location.replace("/");
//       }
//     } else {
//       alert("Workspace not found! Try again.");
//     }
//   });

// // Sign up form with username/password
// document
//   .getElementById("signup-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     setTimeout(function () {
//       // Show the result notification
//       var notification = document.getElementById("resultNotification");
//       notification.classList.remove("hide");

//       // Set a timeout to hide the notification after 2 seconds
//       setTimeout(function () {
//         notification.classList.add("hide");
//       }, 1000);

//       setTimeout(function () {
//         document.getElementById("user-loginDetails").style.display = "none";
//         const newWorkspace = document.getElementById("newWorkspace");
//         newWorkspace.classList.remove("hide");
//       }, 1000);
//     }, 1000);

//     signupFormHandler;
//   });

// // Moving through elements
// // First name and last name
// document
//   .getElementById("user-info")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     var userInfo = document.getElementById("user-info");
//     userInfo.classList.add("hidden", "animate");
//     const signUp = document.getElementById("user-loginDetails");
//     signUp.classList.remove("hide");
//     signUp.classList.add("show", "animate");
//   });

// // Redirect to create workspace
// document
//   .getElementById("createOpt")
//   .addEventListener("click", function (event) {
//     event.preventDefault();

//     console.log("Create button clicked");

//     document.getElementById("newWorkspace").style.display = "none";
//     const create = document.getElementById("workplace-create");
//     create.classList.remove("hide");
//   });

// // Redirect to join workspace
// document.getElementById("joinOpt").addEventListener("click", function (event) {
//   event.preventDefault();

//   document.getElementById("newWorkspace").style.display = "none";
//   const join = document.getElementById("workplace-join");
//   join.classList.remove("hide");
// });

const addBtn = document
  .getElementById("add-btn")
  .addEventListener("click", generateHTML);

const emailInputEl = document.querySelector('input[type="email"]');
emailListEl = document.getElementById("email-list");

function generateHTML() {
  let newEmailEl = document.createElement("li");
  newEmailEl.classList.add("email");

  const newEmail = emailInputEl.value;
  newEmailEl.textContent = newEmail;
  emailListEl.classList.add("list-group-flush");
  emailListEl.appendChild(newEmailEl);
  emailInputEl.value = "";
}

async function submitInvitations(e) {
  e.preventDefault();
  // create a Array from a new Set (unique values only) from an Array from the values of all the elements with class email
  // that do not have empty input fields
  const values = Array.from(
    new Set(
      Array.from(document.querySelectorAll(".email"))
        .map((input) => input.textContent.trim())
        .filter((input) => input)
    )
  );
  const join_code = document.querySelector("#join_code").value;
  console.log(values, join_code);
  await fetch("/api/workspace/invites", {
    method: "POST",
    body: JSON.stringify({ values, join_code }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  setTimeout(function () {
    // Show the result notification
    var notification = document.getElementById("invite-submit");
    notification.classList.remove("hide");

    // Set a timeout to hide the notification after 1 seconds
    setTimeout(function () {
      notification.classList.add("hide");
    }, 1500);

    setTimeout(function () {
      // If successful, redirect browser to homepage that corresponds to their workspace_id
      document.location.replace("/dashboard");
    }, 1000);
  }, 100);
}

// Copy code to clipboard
const copyToClipboard = async () => {
  try {
    const element = document.querySelector(".user-select-all");
    await navigator.clipboard.writeText(element.textContent);
    console.log("Text copied to clipboard!");
    alert("Successfully copied to clipboard");
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    alert("Failed to copy to clipboard");
  }
};

// Submit invites
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#invite-form")
    .addEventListener("submit", submitInvitations);
});

// Direct to home page
document
  .getElementById("enter-workspace-invite")
  .addEventListener("click", function () {
    document.location.replace("/dashboard");
  });

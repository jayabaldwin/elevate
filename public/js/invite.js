function generateHTML() {
  let newInput = document.createElement("input");
  newInput.placeholder = "Enter email";
  newInput.classList.add("email");
  document.getElementById("email-container").append(newInput);
}

async function submitInvitations(e) {
  e.preventDefault();
  // create a Array from a new Set (unique values only) from an Array from the values of all the elements with class email
  // that do not have empty input fields
  const values = Array.from(
    new Set(
      Array.from(document.querySelectorAll(".email"))
        .map((input) => input.value.trim())
        .filter((input) => input)
    )
  );

  const join_code = document.querySelector("#join_code").value;

  console.log(values, join_code);

  const response = await fetch("/api/workspace/invites", {
    method: "POST",

    body: JSON.stringify({ values, join_code }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/home");
  }
}

// Submit invites
document.getElementById("add-btn").addEventListener("click", generateHTML);
document
  .getElementById("invite-form")
  .addEventListener("submit", submitInvitations);

// Direct to home page
document
  .getElementById("enter-workspace-invite")
  .addEventListener("click", function () {
    document.location.replace("/home");
  });

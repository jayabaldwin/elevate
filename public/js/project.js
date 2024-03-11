document.getElementById("add").addEventListener("click", saveProject);

const titleInputEl = document.getElementById("proj-title");
const descInputEl = document.getElementById("proj-description");
const modal = document.getElementById("project-modal");

async function saveProject() {
  const description = descInputEl.value;
  const name = titleInputEl.value;

  const response = await fetch("api/projects", {
    method: "POST",
    body: JSON.stringify({ name, description }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  location.reload();
}

// Deletes project
document.querySelectorAll(".delete-icon").forEach((deleteButton) => {
  deleteButton.addEventListener("click", async (e) => {
    console.log(e.target);
    const id = e.target.dataset.id;
    console.log(id);
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    }
  });
});

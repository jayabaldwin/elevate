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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/projects/projectsList");
    const data = await response.json();
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = ""; // Clear any existing content
    data.forEach(project => {
      const li = document.createElement("li");
      li.textContent = `${project.name}`; // 
      projectList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/projects/projectsList");
    const data = await response.json();
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = ""; // Clear any existing content
    data.forEach(project => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = `${project.name}`;
      link.href = `/projects/${project.id}`; // Assuming project id is unique and can be used as part of the project's URL
      link.classList.add("text-dark"); // Add this line to add the text-dark class to the link
      li.appendChild(link);
      projectList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
});

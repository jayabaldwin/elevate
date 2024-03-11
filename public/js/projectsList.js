document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/projects/projectsList");
    const data = await response.json();
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = ""; // Clear any existing content
    data.forEach((project) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = `${project.name}`;
      link.href = `/projects/${project.id}`; // Assuming project id is unique and can be used as part of the project's URL
      link.classList.add("text-white"); // Add this line to add the text-dark class to the link
      link.classList.add("pl-4");
      li.appendChild(link);
      projectList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
});

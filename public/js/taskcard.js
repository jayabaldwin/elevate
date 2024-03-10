// Add data from task
document.getElementById("task-add-btn").addEventListener("click", saveTask);

const titleInputEl = document.getElementById("task-title");
const descInputEl = document.getElementById("task-description");
const deadlineInputEl = document.getElementById("task-deadline");
const taskModal = document.getElementById("task-create-modal");

async function saveTask() {
  const projectId = taskModal.getAttribute("data-project-id");
  const title = titleInputEl.value;
  const contents = descInputEl.value;
  const deadline = deadlineInputEl.value;
  
  if (!projectId) {
    console.error('Project Id cannot be found');
    return;
  }

  const response = await fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ 
        title, 
        contents, 
        deadline,
        project_id: projectId,
        status: 'to-do' 
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  location.reload();
}
// const task = async (e) => {
//   e.preventDefault();

//   const title = document.getElementById("task-title").value;
//   const contents = document.getElementById("task-description").value;
//   const modal = document.getElementById("task-create-modal").value;

//   const response = await fetch("/api/tasks", {
//     method: "POST",
//     body: JSON.stringify({ title, contents }),
//     headers: { "Content-Type": "application/json" },
//   });

//   console.log(response);

//   if (response.ok) {
//     response.json("Added task to database");
//     console.log("Added task to database");
//   } else {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
// };

// document.getElementById("task-add-btn").addEventListener("click", task);

// View data from task

// function openTaskCardModal(taskId) {
//     fetch(`/api/tasks/${taskId}/details`)
//       .then(response => response.text())
//       .then(html => {
//         const modal = document.getElementById('taskDetailModal');
//         modal.querySelector(".modal-content").innerHTML = html;
//         modal.style.display = 'block';
//       })
//       .catch(error => {
//         console.error('Error loading task details:', error);
//       });
//   }

//   // function closeModal() {
//   //   document.getElementById('taskDetailModal').style.display = 'none';
//   // }

//   window.onclick = function(event) {
//     const modal = document.getElementById('taskDetailModal');
//     if (event.target == modal) {
//       closeModal();
//     }
//   }

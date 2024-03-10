// Add data from task

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

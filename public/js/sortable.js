document.addEventListener('DOMContentLoaded', function() {
    ['to-do-task', 'in-progress-task', 'completed-task'].forEach(column => {
        new Sortable(document.getElementById(column), {
            group: 'tasks',
            animation: 150,
            onEnd: function (event) {
                var sortableTask = event.item;  // the task being moved
                var setStatus = '';

                switch (event.to.id) {
                    case 'to-do-task':
                        setStatus = 'to-do';
                        break;
                    case 'in-progress-task':
                        setStatus = 'in-progress';
                        break;
                    case 'completed-task':
                        setStatus = 'completed';
                        break;
                }

                var taskId = sortableTask.getAttribute('data-id');  // Getting task id
                if (taskId) {
                    updateStatus(taskId, setStatus);
                }
            }
        });
    });
});

function updateStatus(taskId, setStatus) {
    fetch('/api/tasks/' + taskId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: setStatus })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Task updated: ', data);
    })
    .catch((error) => {
        console.error('Error updated status: ', error);
    });
}
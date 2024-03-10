document.addEventListener('DOMContentLoaded', function () {
    ['to-do-task', 'in-progress-task', 'completed-task'].forEach(column => {
        new Sortable(document.getElementById(column), {
            group: 'tasks',
            animation: 150,
            onEnd: function (event) {
                // console.log(event.item)
                var sortableTask = event.item;  // the task being moved
                const childItem = sortableTask.querySelector('[data-id]')
                let setStatus = '';
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

                const taskId = childItem.getAttribute('data-id');  // Getting task id
                console.log(taskId)
                if (taskId) {
                    updateStatus(taskId, setStatus);
                }
            }
        });
    });
});

function updateStatus(taskId, setStatus) {
    console.log('Updating status for task', taskId, 'to', setStatus);
    fetch('/api/tasks/' + taskId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: setStatus })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Task updated ', data);
        })
        .catch((error) => {
            console.error('Error updating status: ', error);

        });
}

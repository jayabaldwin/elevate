const socket = io();
const chatWindow = document.getElementById('chatWindow');

const projectId = 1;
socket.emit('joinProjectRoom', projectId);

function sendMessage(message) {
    socket.emit('chatMessage', { projectId, message });
    saveMessage(message, projectId);
}

socket.on('message', (message) => {
    console.log('Received message:', message);
    displayMessage(message);
});

async function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.getElementById('messageForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const currentUser = await getCurrentUser();
    const messageInput = document.getElementById('messageInput');
    const message = `${currentUser.first}: ${messageInput.value}`;

    sendMessage(message);
    messageInput.value = '';
});

async function getCurrentUser() {
    try {
        const response = await fetch("/api/users/current", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

async function getMessages() {
    try {
        const response = await fetch(`/api/chat/${projectId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const messageData = await response.json();
        return (messageData);
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

async function saveMessage(message, project_id) {
    try {
        const date = new Date();
        const createdOn = date.toJSON();

        const user_id = await getCurrentUser();

        const response = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ message, createdOn, user_id, project_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

async function populateChat() {
    const messageData = await getMessages();
    messageData.forEach(element => {
        chatLine = `${element.user.first}: ${element.message}`;
        const messageElement = document.createElement('div');
        messageElement.textContent = chatLine;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });

}

populateChat();
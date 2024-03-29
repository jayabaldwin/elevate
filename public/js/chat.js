const socket = io();
const chatMenuItem = document.getElementById("collapseThree");
const chatCard = chatMenuItem.querySelector(".card-body");
const chatEl = chatCard.querySelector(".chat");
const chatWindow = document.getElementById("chatWindow");
const currentProjectId = chatWindow.getAttribute("data-project-id");

chatWindow.scrollTop = chatWindow.scrollHeight;

let messageCounter = 0;

const projectId = currentProjectId;

if (!projectId) {
    chatEl.classList.add("hide");
    chatCard.textContent = "Please select a project to view the chat.";
    chatCard.classList.add("text-dark");
} else {
    populateChat();

    socket.emit("joinProjectRoom", projectId);
    socket.on("message", async (message, user_id) => {
        // const currentUser = await getCurrentUser();
        console.log("Received message:", message,);
        displayMessage(message, user_id);
    });
}

async function sendMessage(message) {
    const getUser = await getCurrentUser();
    const user_id = getUser.first;
    saveMessage(message, projectId);
    socket.emit("chatMessage", { projectId, message, user_id });
}

async function displayMessage(message, user) {
    const chatLineElement = document.createElement("div");
    const messageElement = document.createElement("div");
    const userElement = document.createElement("span");
    chatLineElement.classList.add("chat-line");
    messageElement.classList.add("message");
    userElement.classList.add("user");

    if (messageCounter % 2 === 0) {
        chatLineElement.classList.add("even");
    } else {
        chatLineElement.classList.add("odd");
    }

    messageElement.textContent = message;
    userElement.textContent = user + ":";

    chatLineElement.appendChild(userElement);
    chatLineElement.appendChild(messageElement);

    chatWindow.appendChild(chatLineElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    messageCounter++;
}

document.getElementById("messageForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    await sendMessage(message);
    messageInput.value = "";
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
        return messageData;
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
    messageData.forEach((element) => {
        const chatLineElement = document.createElement("div");
        const messageElement = document.createElement("div");
        const userElement = document.createElement("span");
        chatLineElement.classList.add("chat-line");
        messageElement.classList.add("message");
        userElement.classList.add("user");

        if (messageCounter % 2 === 0) {
            chatLineElement.classList.add("even");
        } else {
            chatLineElement.classList.add("odd");
        }

        messageElement.textContent = element.message;
        userElement.textContent = element.user.first + ":";

        chatLineElement.appendChild(userElement);
        chatLineElement.appendChild(messageElement);

        chatWindow.appendChild(chatLineElement);
        messageCounter++;
    });
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

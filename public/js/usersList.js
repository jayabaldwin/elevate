document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/users/usersList");
    const data = await response.json();
    const userList = document.getElementById("userList");
    userList.classList.add("list-group-flush");
    userList.innerHTML = ""; // Clear any existing content
    data.forEach((user) => {
      console.log(`${user.first} ${user.last}`);
      const li = document.createElement("li");
      li.textContent = `${user.first} ${user.last}`; // Assuming 'first' and 'last' are properties of the user object
      li.classList.add("text-white");
      li.classList.add("pl-4");
      userList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
});

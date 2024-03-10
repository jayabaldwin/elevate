document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/users/current");
    const currentUser = await response.json();
    const pTag = document.getElementById("currentUser");
    pTag.textContent = `${currentUser.first}`;
  } catch (error) {
    console.error(error);
  }
});
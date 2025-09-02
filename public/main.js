const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");

const BASE_URL = "http://localhost:3000/users";

async function fetchUsers() {
    const res = await fetch(BASE_URL);
    const users = await res.json();
    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    userForm.reset();
    fetchUsers();
});

fetchUsers();
const app = document.getElementById('app');
const buttons = document.querySelectorAll('.sidebar button');
const API_URL = 'http://localhost:3000';

// detect change of hash in the URL (ex: #add, #edit, etc.)
window.addEventListener('hashchange', () => {
  loadRoute(location.hash.slice(1));
});

// btn of menu
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const route = button.dataset.route;//get the value of the rute for ex: add, edit, remove, show
    location.hash = route; // it change the URL to #add, #edit, #delete, #Users.
  });
});

// charge first time
window.addEventListener('DOMContentLoaded', () => {
  loadRoute(location.hash.slice(1));//remove the # in the route
});

function loadRoute(route) {
  switch (route) {
    case 'add-event': renderAddForm(); break;
    case 'edit-event': renderEditForm(); break;
    case 'remove-event': renderRemoveForm(); break;
    case 'show-events': renderUsers(); break;
    default: app.innerHTML = '<h2>Welcome to the events</h2>'; break;
  }
}

// ----- functions for all screens -----
//add
function renderAddForm() {
  app.innerHTML = `
    <h2>Add Event</h2>
    <form id="addForm">
      <input type="text" name="name" placeholder="Name Event" required><br><br>
      <input type="text" name="date" placeholder="Date of Event" required><br><br>
      <button type="submit">Add Event</button>
    </form>
  `;

  document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const event = {
      name: e.target.name.value,
      date: e.target.date.value
    };
    await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(event)
    });
    alert('Event added!');
    e.target.reset();
  });
}
//edit
function renderEditForm() {
  app.innerHTML = `
    <h2>Edit Event</h2>
    <form id="editForm">
      <input type="number" name="id" placeholder="Event ID" required><br><br>
      <input type="text" name="name" placeholder="New Name Event"><br><br>
      <input type="email" name="email" placeholder="New Date Event"><br><br>
      <button type="submit">Update Event</button>
    </form>
  `;

  document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const updatedEvent = {};
    if (e.target.name.value) updatedEvent.name = e.target.name.value;
    if (e.target.email.value) updatedEvent.email = e.target.email.value;

    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedUser)
    });
    alert('User updated!');
    e.target.reset();
  });
}
//remove
function renderRemoveForm() {
  app.innerHTML = ` 
    <h2>Remove User</h2>
    <form id="removeForm">
      <input type="number" name="id" placeholder="User ID" required><br><br>
      <button type="submit">Delete</button>
    </form>
  `;

  document.getElementById('removeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    alert('User deleted!');
    e.target.reset();
  });
}
//show
async function renderUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  app.innerHTML = `<h2>All Users</h2>`;
  if (users.length === 0) {
    app.innerHTML += '<p>No users found.</p>';
    return;
  }

  const list = document.createElement('ul');
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `#${user.id} - ${user.name} (${user.email})`;
    list.appendChild(li);
  });
  app.appendChild(list);//add final result into the id:"app"
}

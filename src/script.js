const app = document.getElementById('app');
const buttons = document.querySelectorAll('.sidebar button');
const API_URL = 'http://localhost:3000/events';

//  detect change of the hash in the URL (#add, #edit, #remove, #show)
window.addEventListener('hashchange', () => {
  loadRoute(location.hash.slice(1));
});

// btn menu
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const route = button.dataset.route;
    location.hash = route;
  });
});

// change initial 
window.addEventListener('DOMContentLoaded', () => {
  loadRoute(location.hash.slice(1));
});

function loadRoute(route) {
  switch (route) {
    case 'add-event':
      renderAddForm();
      break;
    case 'edit-event':
      renderEditForm();
      break;
    case 'remove-event':
      renderRemoveForm();
      break;
    case 'show-events':
      renderEvents();
      break;
    case 'register':
      renderRegisterForm();
      break;
    case 'login':
      renderLoginForm();
       break;
    default:
      app.innerHTML = '<h2>Welcome to the events</h2>';
      break;
  }
}

function renderAddForm() {
  app.innerHTML = `
    <h2>Add Event</h2>
    <form id="addForm">
      <input type="text" name="name" placeholder="Name Event" required><br><br>
      <input type="date" name="date" placeholder="Date of Event" required><br><br>
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    alert('Event added!');
    e.target.reset();
  });
}
function renderEditForm() {
  app.innerHTML = `
    <h2>Edit Event</h2>
    <form id="editForm">
      <input type="text" name="id" placeholder="Event ID" required><br><br>
      <input type="text" name="name" placeholder="New Name Event"><br><br>
      <input type="date" name="date" placeholder="New Date Event"><br><br>
      <button type="submit">Update Event</button>
    </form>
  `;

  document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const updatedEvent = {};
    if (e.target.name.value) updatedEvent.name = e.target.name.value;
    if (e.target.date.value) updatedEvent.date = e.target.date.value;

    if (!id) {
      alert('Please enter an ID');
      return;
    }

    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    });
    alert('Event updated!');
    e.target.reset();
  });
}

function renderRemoveForm() {
  app.innerHTML = `
    <h2>Remove Event</h2>
    <form id="removeForm">
      <input type="text" name="id" placeholder="Event ID (text or number)" required><br><br>
      <button type="submit">Delete Event</button>
    </form>
  `;

  const form = document.getElementById('removeForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = e.target.id.value.trim();

    if (!id) {
      alert('Please enter a valid Event ID');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 204) {
        alert('Event deleted successfully');
        form.reset();
      } else if (response.status === 404) {
        alert('Event not found');
      } else {
        alert('Error deleting event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event.');
    }
  });
}

async function renderEvents() {
  app.innerHTML = '<h2>Events List</h2>';

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error fetching events');

    const events = await res.json();

    if (events.length === 0) {
      app.innerHTML += '<p>No events found.</p>';
      return;
    }

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';

    events.forEach(event => {
      const li = document.createElement('li');
      li.style.padding = '10px';
      li.style.borderBottom = '1px solid #ccc';
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';

      li.innerHTML = `
        <span><strong>ID:</strong> ${event.id} | <strong>Name:</strong> ${event.name || 'N/A'} | <strong>Date:</strong> ${event.date || 'N/A'}</span>
      `;

      list.appendChild(li);
    });

    app.appendChild(list);
  } catch (error) {
    console.error('Error loading events:', error);
    app.innerHTML += '<p>Could not load events. Please try again later.</p>';
  }
}
//register 
function renderRegisterForm() {
  app.innerHTML = `
    <h2>Register</h2>
    <form id="registerForm">
      <input type="text" name="username" placeholder="Username" required><br><br>
      <input type="email" name="email" placeholder="Email" required><br><br>
      <input type="password" name="password" placeholder="Password" required><br><br>
      <select name="role" required>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select><br><br>
      <button type="submit">Register</button>
    </form>
  `;

  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value
    };

    const res = await fetch('http://localhost:3000/users?email=' + user.email);
    const existing = await res.json();

    if (existing.length > 0) {
      alert('Email already registered');
      return;
    }

    const save = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (save.ok) {
      alert('User registered... Redirecting to login...');
      location.hash = 'login';
    } else {
      alert('Error registering user.');
    }
  });
}

function renderLoginForm() {
  app.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input type="email" name="email" placeholder="Email" required><br><br>
      <input type="password" name="password" placeholder="Password" required><br><br>
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
    const users = await res.json();

    if (users.length > 0) {
      const user = users[0];
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome ${user.username}`);
      showUserInfo();
      applyRoleAccess(user.role);
      location.hash = 'show-events';
    } else {
      alert('Invalid credentials');
    }
  });
}



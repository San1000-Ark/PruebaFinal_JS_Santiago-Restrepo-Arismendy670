const app = document.getElementById('app');
const buttons = document.querySelectorAll('.sidebar button');
const logoutBtn = document.getElementById('logoutBtn');
const API_URL = 'http://localhost:3000/events';

// Detect URL hash changes
window.addEventListener('hashchange', () => {
    loadRoute(location.hash.slice(1));
});

// Handle sidebar buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const route = button.dataset.route;
        location.hash = route;
    });
});

// On page load
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    applyRoleAccess(currentUser?.role || null);
    loadRoute(location.hash.slice(1));
});

// Control visibility of sidebar buttons
function applyRoleAccess(role) {
    const routesForAdmin = ['add-event', 'edit-event', 'remove-event'];

    buttons.forEach(button => {
        const route = button.dataset.route;

        if (routesForAdmin.includes(route)) {
            button.style.display = role === 'admin' ? 'block' : 'none';
        } else {
            button.style.display = role ? 'block' : 'none'; // only if has a logged user
        }
    });

    if (logoutBtn) {
        logoutBtn.style.display = role ? 'block' : 'none';
    }
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        alert('User logout');
        applyRoleAccess(null);//no active role
        location.hash = 'login';
        app.innerHTML = '<h2>Please login again</h2>';
    });
}

// Load views based on hash
function loadRoute(route) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminRoutes = ['add-event', 'edit-event', 'remove-event'];
    const publicRoutes = ['login', 'register'];

    if (!currentUser && !publicRoutes.includes(route)) {
        app.innerHTML = '<h2>You should login in the page to show the options</h2>';
        location.hash = 'login';
        return;
    }

    if (adminRoutes.includes(route)) {
        if (!currentUser || currentUser.role !== 'admin') {
            app.innerHTML = '<h2>Access Denied</h2><p>DENEGATE</p>';
            return;
        }
    }

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
            app.innerHTML = '<h2>WELCOME TO EVENT SYSTEM</h2>';
            break;
    }
}

// Add event
function renderAddForm() {
    app.innerHTML = `
    <h2>Add Event</h2>
    <form id="addForm">
      <input type="text" name="name" placeholder="Event name" required><br><br>
      <input type="date" name="date" required><br><br>
      <button type="submit">Add</button>
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

// Edit event
function renderEditForm() {
    app.innerHTML = `
    <h2>Edit Event</h2>
    <form id="editForm">
      <input type="text" name="id" placeholder="Event ID" required><br><br>
      <input type="text" name="name" placeholder="New name"><br><br>
      <input type="date" name="date"><br><br>
      <button type="submit">Update</button>
    </form>
    `;

    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const updated = {};
        if (e.target.name.value) updated.name = e.target.name.value;
        if (e.target.date.value) updated.date = e.target.date.value;

        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        alert('Event updated!');
        e.target.reset();
    });
}

// Delete event
function renderRemoveForm() {
    app.innerHTML = `
    <h2>Remove Event</h2>
    <form id="removeForm">
      <input type="text" name="id" placeholder="Event ID" required><br><br>
      <button type="submit">Delete</button>
    </form>
    `;

    document.getElementById('removeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = e.target.id.value;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (res.status === 200 || res.status === 204) {
                alert('Event deleted');
                e.target.reset();
            } else {
                alert('Event not found');
            }
        } catch (err) {
            alert('Error deleting event');
        }
    });
}

// Show events
async function renderEvents() {
    app.innerHTML = '<h2>Events List</h2>';

    try {
        const res = await fetch(API_URL);
        const events = await res.json();

        if (events.length === 0) {
            app.innerHTML += '<p>No events found.</p>';
            return;
        }

        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';

        events.forEach(ev => {
            const li = document.createElement('li');
            li.style.borderBottom = '1px solid #ccc';
            li.style.padding = '10px';
            li.innerHTML = `<strong>ID:</strong> ${ev.id} | <strong>Name:</strong> ${ev.name} | <strong>Date:</strong> ${ev.date}`;
            list.appendChild(li);
        });

        app.appendChild(list);
    } catch (err) {
        app.innerHTML += '<p>Error loading events.</p>';
    }
}

// Register
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

        const res = await fetch(`http://localhost:3000/users?email=${user.email}`);
        const existing = await res.json();

        if (existing.length > 0) {
            alert('Email already registered');
            return;
        }

        const save = await fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (save.ok) {
            alert('User registered successfully! Redirecting to login...');
            location.hash = 'login';
        } else {
            alert('Registration failed.');
        }
    });
}

// Login
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
            applyRoleAccess(user.role);
            location.hash = 'show-events';
        } else {
            alert('Invalid credentials');
        }
    });
}


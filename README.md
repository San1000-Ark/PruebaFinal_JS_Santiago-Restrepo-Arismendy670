# PruebaFinal_JS_Santiago-Restrepo-Arismendy670

# 📘 Project: Performance Test - JavaScript Module 3

This project was developed as part of the practical assessment for Module 3 of the JavaScript course. The application is a **Single Page Application (SPA)** built using vanilla JavaScript. It communicates with a backend using JSON Server and implements login, registration, event management, and role-based access (admin/user), with data persistence via `localStorage`.

---

## 🛠️ Features Implemented

✅ User registration  
✅ Login system for users and administrators  
✅ Credential validation against JSON Server  
✅ Role-based redirection (admin or user panel)  
✅ Admin panel functionalities:
- Create events  
- Edit events  
- Delete events  

✅ User view of available events  
✅ Event registration for users  
✅ Contact form connected to JSON Server  
✅ SPA navigation using JavaScript routing  
✅ Session persistence using `localStorage`  
✅ Responsive and modern UI design with a fixed sidebar  

---

## ❌ Features Not Implemented

⚠️ **Maximum number of guests per event**  
> The system does not currently restrict or track the maximum number of registered participants per event.

⚠️ **Active events not displayed**  
> There was an issue with filtering or displaying only the currently active events.

⚠️ **No Postman Testing**  
> Due to technical limitations or time constraints, API routes were not tested using Postman. Instead, fetch-based requests and browser-side validation were used.

---

## 📁 Project Structure

```
📦 spa-events-project
├── 📁 css
│   └── styles.css
├── 📁 js
│   ├── main.js
│   ├── router.js
│   ├── login.js
│   ├── register.js
│   ├── admin.js
│   └── user.js
├── 📁 views
│   ├── login.html
│   ├── register.html
│   ├── admin.html
│   └── user.html
├── db.json
└── index.html
```

---

## 🖥️ Technologies Used

- HTML5  
- CSS3  
- JavaScript (ES6)  
- JSON Server  
- Fetch API  
- LocalStorage  

---

## ▶️ How to Run the Project

1. Clone the repository or download the project files.
2. Install JSON Server globally (if you don't have it yet):
   ```bash
   npm install -g json-server
   ```
3. Start the server:
   ```bash
   json-server --watch db.json --port 3000
   ```
4. Open `index.html` in your browser.
5. Interact with the application to register, log in, and manage/view events.

---

## 🧪 Testing

- All core functionalities were manually tested using the browser and `console.log` outputs.
- Postman was **not used** to test API endpoints.

---

## 👤 Author

- Name: Santiago Restrepo  
- Date: July 2025

---
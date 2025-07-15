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
✅ Session persistence using `localStorage`  
✅ Responsive and modern UI design with a fixed sidebar  

---

## ❌ Features Not Implemented / Issues

⚠️ **Maximum number of guests per event**  
> The system does not currently restrict or track the number of registered participants per event.

⚠️ **Active events not displayed**  
> The system does not correctly show only currently active events.

⚠️ **Postman testing not performed**  
> Due to technical limitations or time constraints, API routes were not tested using Postman. Only fetch-based browser requests were used.

⚠️ **SPA routing did not work correctly**  
> The navigation between views/pages using JavaScript routes did not function properly. Page switching may not reflect the correct URL hash or view updates.

---

## 📁 Project Structure

```
📦 spa-events-project
├── 📁 styles
│   └── styles.css
├── 📁 js
│   ├── script.js
├── 📁 public
│   ├── index.html
├── db.json
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
2. Install JSON Server globally (if not installed):
   ```bash
   npm install -g json-server
   ```
3. Start the JSON Server:
   ```bash
   json-server --watch db.json --port 3000
   ```
4. Open `index.html` in your browser.
5. Use the application to register, log in, and manage/view events.

---

## 🧪 Testing

- Functionality was tested manually using the browser and `console.log`.
- Postman was not used.
- SPA routes were intended to change views using JavaScript, but did not work as expected.

---

## 👤 Author

- Name: Santiago Restrepo  
- Date: July 2025

---
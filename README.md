ID- 21701013, 21701038, 21701079


Project Name----BookAura

Project Description----- It is a web application designed for managing a bookstore efficiently. It allows admins to add, edit, and remove books, view all orders, and manage users in a centralized dashboard. The frontend is built with React.js (using Vite) for a fast and responsive user interface, while the backend uses Node.js and Express.js to handle API requests and interact with a MongoDB database. This project streamlines bookstore management and provides a user-friendly experience for administrators.


* *Frontend:* React.js (with Vite) for fast and responsive UI
* *Backend:* Node.js and Express.js for handling API requests
* *Database:* MongoDB (cloud-based or local)

---

## 🛠 Features

* Admin dashboard to manage books, users, and orders
* Add, edit, and delete books easily
* Secure authentication with JWT
* Connects to MongoDB using Mongoose
* Responsive frontend with React.js and Tailwind CSS (optional)

---

##  Installation and Setup

### 1. Clone the repository

bash
git clone https://github.com/your-username/bookstorewithadmin.git
cd bookstorewithadmin
---
### 2. Frontend Setup (React.js + Vite)

bash
cd frontend
npm install
npm run dev

* The frontend will run on: [http://localhost:5173](http://localhost:5173)

---

### 3. Backend Setup (Node.js + Express)

bash
cd backend
npm install
npm start


* The backend API will run on: [http://localhost:1000](http://localhost:1000)

---

### 4. Environment Variables

Create a .env file in the *backend* folder with the following:

env
PORT=1000
URI=mongodb+srv://tcm:tcm123@cluster0.dhcdqwe.mongodb.net/bookstore1


> Replace the URI with your own MongoDB Atlas connection string or local MongoDB URI.

---

### 5. MongoDB Setup

* Use *MongoDB Atlas* (cloud) or a *local MongoDB instance*
* Ensure the URI in .env points to your database

---

### 6. Verify Setup

1. Start backend: npm start → should connect to MongoDB without errors
2. Start frontend: npm run dev → open [http://localhost:5173](http://localhost:5173) in your browser

---

## ⚙ Dependencies

*Frontend (React.js + Vite):*

* React.js
* Vite
* Axios
* React Router DOM
* Tailwind CSS (optional)

*Backend (Node.js + Express):*

* Node.js
* Express.js
* MongoDB / Mongoose (ODM)
* bcryptjs
* jsonwebtoken
* cors
* dotenv

*System Requirements:*

* Node.js >= 18.x
* npm >= 9.x
* MongoDB (cloud or local)

---

## 🚀 Running Locally

1. Start *MongoDB Atlas* (or local MongoDB)
2. Start backend server:

bash
cd backend
nodemon app.js


3. Start frontend server:

bash
cd frontend
npm run dev


4. Open your browser and visit: [http://localhost:5173](http://localhost:5173)

---

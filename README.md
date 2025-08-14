Project Name----BookAura

Project Description----- It is a web application designed for managing a bookstore efficiently. It allows admins to add, edit, and remove books, view all orders, and manage users in a centralized dashboard. The frontend is built with React.js (using Vite) for a fast and responsive user interface, while the backend uses Node.js and Express.js to handle API requests and interact with a MongoDB database. This project streamlines bookstore management and provides a user-friendly experience for administrators.

Installation and Setup Instructions------- Clone the repository:  git clone https://github.com/your-username/bookstorewithadmin.git                                                                                                             cd bookstorewithadmin
                                   ------- Frontend setup (React.js with Vite): cd frontend
                                                                                npm install
                                                                                npm run dev
                                           Frontend will run on: http://localhost:5173
                                   -------Backend setup (Node.js/Express): cd backend
                                                                           npm install
                                                                           npm start
                                           Backend API will run on: http://localhost:1000
                                   -------Environment variables:  Create a .env file in the backend folder with the following content:  
                                                                                                          PORT=1000
                                                                                                          URI=mongodb+srv://tcm:tcm123@cluster0.dhcdqwe.mongodb.net/bookstore1
                                   -------MongoDB setup:   use MongoDB Atlas (cloud) or a local MongoDB instance.
                                                           Ensure the URI in .env points to your database.
                                          Verify setup:    Start backend: npm start → Should connect to MongoDB without errors.
                                                           Start frontend: npm run dev → Open http://localhost:5173 in your browser.

Dependencies and Requirements-------Frontend (React.js with Vite):  React.js, Vite, Axios, React Router DOM, Tailwind CSS (optional)
                             -------Backend (Node.js/Express):  Node.js, Express.js, MongoDB / Mongoose (ODM), bcryptjs, jsonwebtoken, cors, dotenv
                             --------System Requirements:  Node.js >= 18.x , npm >= 9.x , MongoDB database (cloud-based Atlas), Mongoose as ODM to interact with MongoDB

How to Run the Application Locally-------Start MongoDB Atlas 
                                  -------Start the backend server : cd backend
                                                                    nodemon app.js
                                         The backend API will run on http://localhost:1000
                                  -------Start the frontend server (React with Vite) :  cd frontend
                                                                                        npm run dev
                                        The frontend will run on http://localhost:5173
                                  Open the application in your browser
                                  Go to http://localhost:5173

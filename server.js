// const express = require('express');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Path to your JSON file
// const dbPath = path.join(__dirname, 'db.json');

// // Helper function to read the JSON data
// const readDB = () => {
//     return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
// };

// // Helper function to save the data back to the JSON file
// const writeDB = (data) => {
//     fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
// };

// // Route to handle user login
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Read the database
//     const db = readDB();

//     // Check for the user in each role (users, cleaners, admins)
//     let user = db.users.find(u => u.username === username && u.password === password);
//     if (!user) {
//         user = db.cleaners.find(u => u.username === username && u.password === password);
//     }
//     if (!user) {
//         user = db.admins.find(u => u.username === username && u.password === password);
//     }

//     if (user) {
//         // Send user role and success response
//         res.json({ success: true, role: user.role });
//     } else {
//         res.status(401).json({ success: false, message: 'Invalid credentials.' });
//     }
// });

// // Route to handle user signup
// app.post('/signup', (req, res) => {
//     const { username, password, role } = req.body;

//     // Read the database
//     const db = readDB();

//     // Check if the username already exists
//     if (db.users.find(u => u.username === username) || 
//         db.cleaners.find(u => u.username === username) || 
//         db.admins.find(u => u.username === username)) {
//         return res.status(400).json({ success: false, message: 'Username already exists.' });
//     }

//     // Create the new user
//     const newUser = { username, password, role };

//     // Add the new user to the appropriate array
//     if (role === 'user') {
//         db.users.push(newUser);
//     } else if (role === 'cleaner') {
//         db.cleaners.push(newUser);
//     } else if (role === 'admin') {
//         db.admins.push(newUser);
//     }

//     // Save the updated database
//     writeDB(db);

//     // Send a success response
//     res.json({ success: true, role: newUser.role });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const cors = require('cors');
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// // Use CORS middleware
// server.use(cors());
// server.use(middlewares);
// server.use(router);
// server.listen(3000, () => {
//   console.log('JSON Server is running on http://localhost:3000');
// });

const jsonServer = require("json-server");
const path = require("path");

// Create a JSON Server
const server = jsonServer.create();

// Path to the db.json file
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Default middlewares (logger, static, and router)
const middlewares = jsonServer.defaults();

// Use default middlewares
server.use(middlewares);

// Use body-parser for handling POST/PUT/PATCH requests
server.use(jsonServer.bodyParser);

// Validate Login Request
server.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const db = router.db; // Access the database
  const users = db.get("users").value(); // Get users array from db.json

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    return res.status(200).json({
      message: "Login successful.",
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password." });
  }
});

// Use the router
server.use(router);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});

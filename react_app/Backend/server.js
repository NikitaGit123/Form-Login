// server.js
// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
const userRoutes = require('./routes/userRoutes');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Use user routes for handling user-related routes
app.use('/api', userRoutes);

// Other routes and configurations

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createDBConnection = require("../config/db");
const config = require("../config/global.config");

// Create a connection to the database
const connection = createDBConnection();

// Function to check if a user already exists in the database
const checkExistingUser = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user_detail WHERE email = ?";
    connection.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
};

// Function to handle user signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received signup request:", { username, email });

  try {
    // Check if the user already exists
    const userExists = await checkExistingUser(email);

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO user_detail (username, email, password) VALUES (?, ?, ?)";
    connection.query(
      insertQuery,
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Error inserting user:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("User signed up successfully:", { username, email });
          res.status(201).json({ message: "User signed up successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user from the database
    const query = "SELECT * FROM user_detail WHERE email = ?";
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      const user = results[0];

      // Check if user exists
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      console.log("User retrieved from the database:", user);
      console.log("Password provided:", password);
      console.log("Hashed password stored:", user.password);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Invalid password for user:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send token in response
      res.json({ token });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, connection };

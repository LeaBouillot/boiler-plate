const express = require("express");
const app = express();
const port = 4000;

const { User } = require("./models/User"); // Assuming the User model is correctly defined
const bodyParser = require("body-parser");

// Middleware to parse application/json and application/x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection using Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://leabouillot7:@boilerplate.i5d2r.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Basic route to confirm server is running
app.get("/", (req, res) => {
  res.send("Salut Lea!");
});

// Register route to handle user registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ensure required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, email, and password.",
      });
    }

    // Create a new user from the request body
    const user = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);

    // Send a failure response
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

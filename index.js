const express = require("express");
const app = express();
const port = 4000;

const { User } = require("./models/User"); // Assuming the User model is correctly defined
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { auth } = require("auth");

// Middleware to parse application/json and application/x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection using Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Basic route to confirm server is running
app.get("/", (req, res) => {
  res.send("Welcome chez Léa!");
});

// Register route to handle user registration
app.post("/api/users/register", async (req, res) => {
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

// login
app.post("/api/users/login", (req, res) => {
  //findOne req email in db
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // check if password matches (comparePassword method is in User.js)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          success: false,
          message: "Wrong password",
        });
      }
      //else generate token: jsonwebtoken
      user.generateToken((err, user) => {
        if (err) return res.status(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSucess: true, userId: user.id });
      });
    });
  });
});

//auth router
app.get("/api/users/auth", auth, (req, res) => {
  // Authenticated user information
  res.status(200).json({
    userId: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    Image: req.user.image,
  });
});

// logout
app.get("/api/users/logout", auth, (req, res) => {
  // Remove token from user document
  User.findByIdAndUpdate(req.user._id, { token: "" }, (err, user) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server Error" });
    res
      .status(200)
      .clearCookie("x_auth")
      .json({ success: true, message: "Logged out" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

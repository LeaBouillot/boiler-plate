const express = require("express");
const app = express();
const port = 4000;

const { User } = require("./models/User"); // Assuming the User model is correctly defined
const bodyParser = require("body-parser");

const config = require("./config/key");

// Middleware to parse application/json and application/x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.send("coucou!");
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

// login
app.post("/login", (req, res) => {
//findOne req email in db
User.findOne({ email: req.body.email }, (err, user) => {
  if(!user) {
    return res.json({
      success: false,
      message: "User not found"
    });
  }

  // check if password matches (comparePassword method is in User.js)
  user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch) {
      return res.json({
        success: false,
        message: "Wrong password"
      });

      //else generate token: jsonwebtoken
 user.generateToken((err, user) => {
  if(err) throw err;

  res.json({
    success: true,
    token: user
  });
 })
    }


  });
});


// si password === password hash, create token

});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

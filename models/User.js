const bcrypt = require("bcrypt");
const saltRounds = 10;

// monoose schema
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    select: false, // hide the password in the response
    // validate: {
    //   validator: (value) =>
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //       value
    //     ),
    //   message:
    //     "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters.",
    // },
  },
  role: {
    type: Number,
    default: 0,
    // 0: user, 1: admin
  },
  image: String,
  token: {
    type: String,
  },
  tokenExpiration: {
    type: Number,
  },
});

// Hash the password before saving it to the database
userSchema.pre("save", function (next) {
  // Only hash the password if it has been modified
  if (!this.isModified("password")) return next();

  // Generate a salt
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    // Hash the password using the generated salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      // Assign the hashed password to the user object
      this.password = hash;
      next(); // Continue saving the user
    });
  });
});
console.log("Password before hashing:", this.password);

// Compare the entered password with the hashed password
userSchema.methods.comparePassword = function (enteredPassword, callback) {
  bcrypt.compare(enteredPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

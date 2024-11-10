const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = require("salt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
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
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.pre("save", function (next) {
  // only hash the password if it has been modified (i.e. not from a pre-save hook)
  if (!this.isModified("password")) return next();

  // Generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    // Store hash in your password DB.
    bcrypt.hash(this.password, salt, function (err, hash) {
      if (err) return next(err);
      this.password = hash;
      next(); // continue saving the user.
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

//

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

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiry: Date,
  emailValid: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  section: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  friends: {
    type: [],
    default: [],
  },
  bio: {
    type: String,
    min: 1,
    max: 100,
  },
  profilepicture: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  accountVerification: {
    type: Boolean,
    default: false,
  },
  dateAccountCreated: {
    type: Date,
    default: Date.now(),
  },
  dateLastLoggedIn: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);

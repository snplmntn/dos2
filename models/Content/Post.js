const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: String,
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: "text",
  },
  content: {
    type: String,
    required: true,
    index: "text",
  },
  category: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    default: 0,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", PostSchema);

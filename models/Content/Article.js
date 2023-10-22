const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
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
  },
  content: {
    type: String,
    required: true,
  },
  subject: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Article", ArticleSchema);

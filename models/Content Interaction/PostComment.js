const mongoose = require("mongoose");

const PostCommentSchema = new mongoose.Schema({
  profilePicture: String,
  userId: String,
  username: String,
  fullname: String,
  postId: String,
  content: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PostComment", PostCommentSchema);

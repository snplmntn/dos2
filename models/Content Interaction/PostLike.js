const mongoose = require("mongoose");

const PostLikeSchema = new mongoose.Schema({
  postId: String,
  userId: String,
});

module.exports = mongoose.model("PostLike", PostLikeSchema);

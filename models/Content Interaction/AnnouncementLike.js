const mongoose = require("mongoose");

const AnnouncementLikeSchema = new mongoose.Schema({
  announcementId: String,
  userId: String,
});

module.exports = mongoose.model("AnnouncementLike", AnnouncementLikeSchema);

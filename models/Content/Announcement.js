const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
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
  category: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);

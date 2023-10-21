const router = require("express").Router();
const announcementController = require("../../controller/Content/AnnouncementController");

//Get Announcements
router.get("/", announcementController.announcement_index);

//Get Announcement
router.get("/:id", announcementController.announcement_get);

//Get User Announcements
router.get("/user/:userId", announcementController.announcement_user_get);

//Post Announcement
router.post("/", announcementController.announcement_post);

//Update Announcement
router.put("/:id", announcementController.announcement_update);

//Delete Announcement
router.delete("/:id", announcementController.announcement_delete);

module.exports = router;

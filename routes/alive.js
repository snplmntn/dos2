const router = require("express").Router();
const iam = require("../controller/Alive");

//Get Data to Search
router.get("/", iam.alive);

module.exports = router;

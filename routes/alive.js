const router = require("express").Router();
const iam = require("../controller/Alive");

//Get Data to Search
router.get("/", iam.alive);

router.get("/token", iam.verified);

module.exports = router;

const router = require("express").Router();
const authController = require("../../controller/Account/AuthController");

//REGISTER
router.post("/signup", authController.user_signup);

// LOGIN
router.post("/login", authController.user_login);

// LOGIN
router.post("/logout", authController.InvalidateToken);

module.exports = router;

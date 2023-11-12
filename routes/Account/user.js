const router = require("express").Router();
const userController = require("../../controller/Account/UserController");

// //Get User
// router.get("/", userController.user_index);

// User Profile
router.get("/", userController.user_get);

//Update User
router.put("/:userId", userController.user_update);

//Delete User
router.delete("/:id", userController.user_delete);

//Forgot Password
router.get("/find/", userController.user_find);

//Recover Password
router.get("/recover/", userController.user_recover);

module.exports = router;

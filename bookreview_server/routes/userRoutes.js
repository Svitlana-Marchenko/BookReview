const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { validateToken, checkAdminRole } = require('../middleware/tokenHandler');



router.route("/login")
    .get(userController.loginUser)

router.route("/register")
    .post(userController.registerUser)

router.route("/current")
    .get(validateToken, userController.currentUser)

router.route("/admin")
    .post(validateToken, checkAdminRole, userController.createAdmin)

//
// router.route("/user/:id")
//     .get(userController.getUserById)
//     .put(iserController.updateUser)
//     .delete(userController.deleteUser);



module.exports = router;
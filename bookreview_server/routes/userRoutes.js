const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { validateToken, checkAdminRole } = require('../middleware/tokenHandler');

router.route("/login")
    .post(userController.loginUser)

router.route("/register")
    .post(userController.registerUser)

router.route("/current")
    .get(validateToken, userController.currentUser)

router.route("/admin")
    .post(validateToken, checkAdminRole, userController.createAdmin)

router.route("/user")
    .get(userController.getUsers)
    .delete(validateToken, checkAdminRole, userController.deleteUsers);

router.get("/user/count", userController.getCount);

router.route("/user/:id")
    .get(userController.getUserById)
    .put(validateToken, userController.updateUser)
    .delete(validateToken, userController.deleteUser);



module.exports = router;
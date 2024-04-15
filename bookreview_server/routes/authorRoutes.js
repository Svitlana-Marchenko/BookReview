const express = require("express");
const authorController = require("../controller/authorController");
const router = express.Router();
const {validateToken, checkAdminRole} = require("../middleware/tokenHandler")

router.route("")
    .get(authorController.getAuthors)
    .post(validateToken, checkAdminRole, authorController.postAuthor)
    .delete(validateToken, checkAdminRole, authorController.deleteAuthors);

router.get("/count", authorController.getCount);

router.route("/:id")
    .get(authorController.getAuthorById)
    .put(validateToken, checkAdminRole, authorController.updateAuthor)
    .delete(validateToken, checkAdminRole, authorController.deleteAuthor);

module.exports = router;
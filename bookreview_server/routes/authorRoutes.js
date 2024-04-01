const express = require("express");
const authorController = require("../controller/authorController");
const router = express.Router();
const {validateToken} = require("../middleware/tokenHandler")

router.use(validateToken)

router.route("")
    .get(authorController.getAuthors)
    .post(authorController.postAuthor)
    .delete(authorController.deleteAuthors);

router.get("/count", authorController.getCount);

router.route("/:id")
    .get(authorController.getAuthorById)
    .put(authorController.updateAuthor)
    .delete(authorController.deleteAuthor);

module.exports = router;
const express = require("express");
const bookController = require("../controller/bookController");
const router = express.Router();
const {validateToken, checkAdminRole} = require("../middleware/tokenHandler")

//router.use(validateToken)

router.route("")
    .get(bookController.getBooks)
    .post(validateToken, checkAdminRole, bookController.postBook)
    .delete(validateToken, checkAdminRole, bookController.deleteBooks);

router.get("/count", bookController.getCount);

router.route("/:id")
    .get(bookController.getBookById)
    .put(validateToken, checkAdminRole, bookController.updateBook)
    .delete(validateToken, checkAdminRole, bookController.deleteBook);

module.exports = router;

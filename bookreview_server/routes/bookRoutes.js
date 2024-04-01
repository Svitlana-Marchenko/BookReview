const express = require("express");
const bookController = require("../controller/bookController");
const router = express.Router();
const {validateToken} = require("../middleware/tokenHandler")

router.use(validateToken)

router.route("")
    .get(bookController.getBooks)
    .post(bookController.postBook)
    .delete(bookController.deleteBooks);

router.get("/count", bookController.getCount);

router.route("/:id")
    .get(bookController.getBookById)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;

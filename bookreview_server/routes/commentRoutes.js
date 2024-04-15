const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const { validateToken} = require('../middleware/tokenHandler');

router.post('/book/:bookId', validateToken, commentController.postComment);
router.get('/book/:bookId', commentController.getComments);

module.exports = router;

const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const { validateToken, checkUserRole} = require('../middleware/tokenHandler');

router.post('/:bookId', validateToken, checkUserRole, commentController.postComment);
router.get('/:bookId', commentController.getComments);

module.exports = router;

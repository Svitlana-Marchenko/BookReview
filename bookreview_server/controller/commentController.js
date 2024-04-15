const commentService = require('../service/commentService');

const postComment = async (req, res) => {
    const bookId = req.params.bookId;
    const {text} = req.body;
    const userId = req.user.id;
    try {
        const comment = await commentService.createComment({text, book: bookId, user: userId});
        const com = await commentService.getCommentsById(comment._id)
        res.status(201).json(com);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getComments = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const comments = await commentService.getCommentsByBookId(bookId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    postComment,
    getComments
};

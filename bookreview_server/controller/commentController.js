const commentService = require('../service/commentService');

const postComment = async (req, res) => {
    const { text, bookId } = req.body;
    const userId = req.user.id; // Assuming you have user info in request

    try {
        const comment = await commentService.createComment({ text, book: bookId, user: userId });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getComments = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const comments = await commentService.getCommentsByBookId(bookId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postComment,
    getComments
};

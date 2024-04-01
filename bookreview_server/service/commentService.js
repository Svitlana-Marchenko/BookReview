const Comment = require('../model/CommentModel');

const createComment = async (data) => {
    return Comment.create(data);
};

const getCommentsByBookId = async (bookId) => {
    return Comment.find({ book: bookId }).populate('user');
};

module.exports = {
    createComment,
    getCommentsByBookId
};

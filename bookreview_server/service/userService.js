const User = require('../model/UserModel');
const Author = require("../model/AuthorModel");

const findUserByEmail = async (email) => {
    return User.findOne({email});
};

const createUser = async (data) => {
    const user = new User(data);
    return user.save();
};

const findAllAuthors = async (query) => {
    return Author.find(query);
};

const findAuthorsPagination = async (query, page, pageSize) => {
    const skip = (page - 1) * pageSize;
    return Author.find(query).skip(skip).limit(pageSize);
}

const createAuthor = async (data) => {
    const book = new Author(data);
    return book.save();
};

const deleteAuthors = async (query) => {
    return Author.deleteMany(query);
};

const countAuthors = async () => {
    return Author.countDocuments();
};

const findAuthorById = async (id) => {
    return Author.findById(id);
};

const updateAuthorById = async (id, updateData) => {
    return Author.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAuthorById = async (id) => {
    return Author.findByIdAndDelete(id);
};

module.exports = {
    findUserByEmail,
    createUser,
    findAllAuthors,
    createAuthor,
    deleteAuthors,
    countAuthors,
    findAuthorById,
    updateAuthorById,
    deleteAuthorById,
    findAuthorsPagination
};

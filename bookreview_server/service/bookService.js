const Book = require('../model/BookModel');

const findAllBooks = async (query) => {
    return Book.find(query).populate('author');
};

const findBooksPagination = async (query, page, pageSize) => {
    const skip = (page - 1) * pageSize;
    return Book.find(query).populate('author').skip(skip).limit(pageSize);
}

const createBook = async (data) => {
    const book = new Book(data);
    return book.save();
};

const deleteBooks = async (query) => {
    return Book.deleteMany(query);
};

const countBooks = async () => {
    return Book.countDocuments();
};

const findBookById = async (id) => {
    return Book.findById(id).populate('author');
};

const updateBookById = async (id, updateData) => {
    return Book.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBookById = async (id) => {
    return Book.findByIdAndDelete(id);
};

module.exports = {
    findAllBooks,
    createBook,
    deleteBooks,
    countBooks,
    findBookById,
    updateBookById,
    deleteBookById,
    findBooksPagination
};

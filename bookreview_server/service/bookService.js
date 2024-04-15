const Book = require('../model/BookModel');

const findAllBooks = async (query, sortBy, sortOrder) => {
    const sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    return Book.find(query).populate('author').sort(sortOptions);
};

const findBooksPagination = async (query, page, pageSize, sortBy, sortOrder) => {
    const skip = (page - 1) * pageSize;
    let totalCountQuery = Book.find(query);
    let booksQuery = Book.find(query);

    if (sortBy && sortOrder) {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        totalCountQuery = totalCountQuery.sort(sortOptions);
        booksQuery = booksQuery.sort(sortOptions);
    }

    const totalCount = await totalCountQuery.countDocuments();
    const books = await booksQuery.populate('author').skip(skip).limit(pageSize);

    return { totalCount, books };
};

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

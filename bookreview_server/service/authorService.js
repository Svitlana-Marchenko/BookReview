const Author = require('../model/AuthorModel');

const findAllAuthors = async (query, sortBy, sortOrder) => {
    const sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    return Author.find(query).sort(sortOptions);
};

const findAuthorsPagination = async (query, page, pageSize, sortBy, sortOrder) => {
    const skip = (page - 1) * pageSize;
    let totalCountQuery = Author.find(query);
    let authorsQuery = Author.find(query);

    if (sortBy && sortOrder) {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        totalCountQuery = totalCountQuery.sort(sortOptions);
        authorsQuery = authorsQuery.sort(sortOptions);
    }

    const totalCount = await totalCountQuery.countDocuments();
    const authors = await authorsQuery.skip(skip).limit(pageSize);

    return { totalCount, authors };
};


const createAuthor = async (data) => {
    const author = new Author(data);
    return author.save();
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
    findAllAuthors,
    createAuthor,
    deleteAuthors,
    countAuthors,
    findAuthorById,
    updateAuthorById,
    deleteAuthorById,
    findAuthorsPagination
};

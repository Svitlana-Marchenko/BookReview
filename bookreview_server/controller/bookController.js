const bookService = require('../service/bookService');
const authorService = require('../service/authorService');

const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 0;
        const sortBy = req.query.sortBy || '';
        const sortOrder = req.query.sortOrder || '';
        const search = req.query.search

        let query = {};
        if (Object.keys(req.query).length !== 0) {
            query = req.query;
            delete query.page;
            delete query.limit;
            delete query.sortBy;
            delete query.sortOrder;
            delete query.search

            if (search.length !== 0) {
                query = {...query,
                    $or: [
                        {title: {$regex: search, $options: 'i'}},
                        {description: {$regex: search, $options: 'i'}}
                    ]
                };
            }

        }

        let books;
        if (limit > 0) {
            books = await bookService.findBooksPagination(query, page, limit, sortBy, sortOrder);
        } else {
            books = await bookService.findAllBooks(query, sortBy, sortOrder);
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


const postBook = async (req, res) => {
    const {title, authorId, genre, description, year, page} = req.body;

    const yearOfPublished = Number(year);
    if (isNaN(yearOfPublished) || yearOfPublished < 0 || yearOfPublished > 2024) {
        return res.status(400).json({message: 'Invalid year of publishing.'});
    }

    const numberOfPage = Number(page);
    if (isNaN(numberOfPage) || numberOfPage < 0 || numberOfPage > 100000) {
        return res.status(400).json({message: 'Invalid number of pages.'});
    }

    const author = await authorService.findAuthorById(authorId);
    if (!author) {
        return res.status(404).json({error: 'Author not found'});
    }

    const data = {title, author, genre, description, year: yearOfPublished, page: numberOfPage};
    try {
        const book = await bookService.createBook(data);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteBooks = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {
            query = req.query;
        }
        await bookService.deleteBooks(query);
        res.status(200).json({message: 'Books deleted successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getCount = async (req, res) => {
    try {
        const count = await bookService.countBooks();
        res.status(200).json({count});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getBookById = async (req, res) => {
    const {id} = req.params;
    try {
        const book = await bookService.findBookById(id);
        if (!book) {
            return res.status(404).json({error: 'Книжку не знайдено'});
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateBook = async (req, res) => {
    const {id} = req.params;
    try {
        const book = await bookService.updateBookById(id, req.body);
        if (!book) {
            return res.status(404).json({error: 'Книжку не знайдено'});
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteBook = async (req, res) => {
    const {id} = req.params;
    try {
        const book = await bookService.deleteBookById(id);
        if (!book) {
            return res.status(404).json({error: 'Книжку не знайдено'});
        }
        res.status(200).json({message: 'Книжку успішно видалено'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getBooks,
    postBook,
    deleteBooks,
    getCount,
    getBookById,
    updateBook,
    deleteBook
};

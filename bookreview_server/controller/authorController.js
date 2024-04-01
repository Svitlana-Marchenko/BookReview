const authorService = require('../service/authorService');

const getAuthors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 0;

        let query = {};
        if (Object.keys(req.query).length !== 0) {
            query = req.query;
            delete query.page;
            delete query.limit;
        }

        let authors
        if (limit > 0) {
            authors = await authorService.findAuthorsPagination(query, page, limit);
        } else {
            authors = await authorService.findAllAuthors(query);
        }

        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postAuthor = async (req, res) => {

    const { name, lastname, yearOfBirth, gender } = req.body;
    const year = Number(yearOfBirth);
    if (isNaN(year) || year < 0 || year > 2024) {
        return res.status(400).json({ message: 'Invalid year of birth.' });
    }
    const data = { name, lastname, yearOfBirth: year, gender };

    try {
        const author = await authorService.createAuthor(data);
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAuthors = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {
            query = req.query;
        }
        await authorService.deleteAuthors(query);
        res.status(200).json({ message: 'Authors deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCount = async (req, res) => {
    try {
        const count = await authorService.countAuthors();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await authorService.findAuthorById(id);
        if (!author) {
            return res.status(404).json({ error: 'Автора не знайдено' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await authorService.updateAuthorById(id, req.body);
        if (!author) {
            return res.status(404).json({ error: 'Автора не знайдено' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await authorService.deleteAuthorById(id);
        if (!author) {
            return res.status(404).json({ error: 'Автора не знайдено' });
        }
        res.status(200).json({ message: 'Автора успішно видалено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAuthors,
    postAuthor,
    deleteAuthors,
    getCount,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};

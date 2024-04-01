const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a book title"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        default: 0
    },
    page: Number
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
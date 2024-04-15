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
        required: true,
        enum: [
            "Action",
            "Romance",
            "Fantasy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "Music",
            "Family",
        ]
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        default: 0
    },
    page: {
        type: Number,
        required: true,
        default: 0
    }
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
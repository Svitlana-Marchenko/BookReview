const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    yearOfBirth: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    }
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
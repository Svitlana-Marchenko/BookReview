const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['USER', 'ADMIN']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
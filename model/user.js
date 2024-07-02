const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobilenumber: {
        type: String
    },
    watchedMovies: [],
    watchLater: []
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
var mongoose = require('mongoose');

var lecture = new mongoose.Schema({
    _id: String,
    author_id: [
        String
    ],
    theme_id: [
        String
    ],
    title: String,
    start: Date,
    finish: Date
});

mongoose.model('Lecture', lecture);
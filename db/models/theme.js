var mongoose = require('mongoose');

var theme = new mongoose.Schema({
    _id: String,
    title: String,
    description: String
});

mongoose.model('Theme', theme);
var mongoose = require('mongoose');

var author = new mongoose.Schema({
    _id: String,
    name: String,
    lastname: String,
    fathersname: String,
    company: String,
    country: String,
    img_url: String
});

mongoose.model('Author', author);
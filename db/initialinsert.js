var mongoose = require('mongoose');
require('./models/lecture');
require('./models/author');
require('./models/theme');
var Lecture = mongoose.model('Lecture');
var Theme = mongoose.model('Theme');
var Author = mongoose.model('Author');

var insert = function() {
    Lecture.find({}, function(err, data) {
        if (data.length==0) {
            new Lecture({
                _id: '1',
                author_id: '1',
                theme_id: '1',
                title: 'Разработка интерфейсов',
                start: new Date,
                finish: new Date(300000)
            }).save();
        }
    });

    Theme.find({}, function(err, data) {
        if (data.length==0) {
            new Theme({
                _id: '1',
                title: 'Закон',
                description: 'Закон - это воинский строй, командование и снабжение'
            }).save();
        }
    });

    Author.find({}, function(err, data) {
        if (data.length==0) {
            new Author({
                _id: '1',
                name: 'Цзы',
                lastname: 'Сунь',
                fathersname: '',
                company: 'Искусство Войны',
                country: 'Китай',
                img_url: ''
            }).save();
        }
    });
};

module.exports = insert;
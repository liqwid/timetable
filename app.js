var express = require('express');
var lrl = require('connect-livereload')();
var mongoose = require('mongoose');
require('./db/models/lecture');
require('./db/models/author');
require('./db/models/theme');
var initinsert = require('./db/initialinsert');
var bodyParser = require('body-parser');


var Lecture = mongoose.model('Lecture');
var Author = mongoose.model('Author');
var Theme = mongoose.model('Theme');

//Подключаемся к БД
mongoose.connect('mongodb://localhost/timetabletest');

console.log('Connected to a database ...');

//Записываем изначальные данные в БД
initinsert();

var app = module.exports.app = exports.app =  express();

//Добавляем возможность установить порт при запуске сервера
app.set('port', process.env.PORT || 4444);

//Добавляем возможность перезагрузки сервера при изменении исходников фронт-энда
app.use(lrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Передаем статику build/index.html по адресу '/'
app.use(express.static(__dirname + '/build'));

//Routes
//Передаем данные в клиент
app.get('/timetable', function(req, res) {
//Создаем счетчик для асинхронного чтения из 3 моделей
    var i = 0;
    //Создаем объект для упаковки данных
    var response = {lectures: [], authors: [], themes: []};
    res.setHeader('Content-type', 'application/json');
    Lecture.find({}, function (err, data) {
        response.lectures = data;
        i++;
        if (i >= 3) res.json(response);
    });
    Author.find({}, function (err, data) {
        response.authors = data;
        i++;
        if (i >= 3) res.json(response);
    });
    Theme.find({}, function (err, data) {
        response.themes = data;
        i++;
        if (i >= 3) res.json(response);
    });
});

app.post('/lecture', function(req, res) {
    switch(req.body.action) {

        case 'Add':
            new Lecture({
                _id: req.body._id,
                author_id: req.body.author_id,
                theme_id: req.body.theme_id,
                title: req.body.title,
                start: new Date(req.body.start),
                finish: new Date(req.body.finish)
            }).save();
            break;

        case 'Edit':
            console.log(req.body);
            Lecture.findOneAndUpdate({_id: req.body._id}, {
                author_id: req.body.author_id,
                theme_id: req.body.theme_id,
                title: req.body.title,
                start: new Date(req.body.start),
                finish: new Date(req.body.finish)
            }, function(err){});
            break;

        case 'Delete':
            Lecture.remove({_id: req.body._id}, function(err){});
            break;
    }
    res.redirect('/timetable');
});

app.post('/author', function(req, res) {

    switch (req.body.action) {

        case 'Add':
            new Author({
                    _id: req.body._id,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    fathersname: req.body.fathersname,
                    company: req.body.company,
                    country: req.body.country,
                    img_url: req.body.img_url
                }).save();
            break;

        case 'Edit':
            Author.findOneAndUpdate({_id: req.body._id}, {
                name: req.body.name,
                lastname: req.body.lastname,
                fathersname: req.body.fathersname,
                company: req.body.company,
                country: req.body.country,
                img_url: req.body.img_url
            }, function(err){});
            break;

        case 'Delete':
            Author.remove({_id: req.body._id}, function(err){});
            break;
    }
    res.redirect('/timetable');
});

app.post('/theme', function(req, res) {
    switch (req.body.action) {

        case 'Add':
            new Theme({
                    _id: req.body._id,
                    title: req.body.title,
                    description: req.body.description
                }).save();
            break;

        case 'Edit':
            Theme.findOneAndUpdate({_id: req.body._id}, {
                title: req.body.title,
                description: req.body.description
            }, function(err){});
            break;

        case 'Delete':
            Theme.remove({_id: req.body._id}, function(err){});
            break;
    }
    res.redirect('/timetable');
});


//Запускаем сервер
app.listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});
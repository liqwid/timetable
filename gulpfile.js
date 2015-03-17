var gulp = require('gulp');

var rigger = require('gulp-rigger');// склеивает файлы
var reactify = require('gulp-reactify');// рендерит реакт
var uglify = require('gulp-uglify');// сжимает js
var server = require('gulp-express');// запускает экспресс( необходим для перегрузки сервера в watch)
var watch = require('gulp-watch');// отслеживает изменения в сорсе
var opn = require('opn');// автоматически открывает сайт в браузере
var rename = require('gulp-rename');// изменяет имя файла( добавляем им суффикс .min)
var sourcemaps = require('gulp-sourcemaps');// карта переводов из scss в css
var sass = require('gulp-sass');// рендерит scss
var prefixer = require('gulp-autoprefixer'); // автопрефиксы для браузеров
var cssmin = require('gulp-cssmin'); // сжимает css

var path = {
    build: {
        js: "build/js/",
        css: "build/css"
    },
    src: {
        jsx: "src/react/main.jsx",
        style: "src/css/materialize.scss"
    },
    watch: {
        jsx: "src/react/**/*.jsx",
        style: "src/css/**/*.scss",
        css: "build/css/**/*.css",
        fonts: "build/fonts/**/*.*"
    }
};

gulp.task('js:build', function(){
    //Подаем сорс на вход потока
    gulp.src(path.src.jsx)
        //Собираем main.jsx из компонентов
        .pipe(rigger())
        //Интерпретируем jsx в js
        .pipe(reactify())
        //Сжимаем js
        //.pipe(uglify())
        //добавляем .min к расширению
        //.pipe(rename({suffix: '.min'}))
        //Направляем результат в билд
        .pipe(gulp.dest(path.build.js))
});

gulp.task('css:build', function(){
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
});

//Запускаем сервер
gulp.task('server', function(){
   server.run(['app.js']);
});

//Открываем страницу в браузере
gulp.task('openbrowser', function(){
    setTimeout( function() {
        opn('http://localhost:4444');
    }, 800);
});

//Отслеживаем изменения в сорсе
gulp.task('watch', function(){
    watch([path.watch.jsx], function(event, cb){
        //Пересобираем билд
        gulp.run('js:build');
        //Перегружаем сервер
        server.notify(event);
    });
    watch([ path.watch.css, path.watch.fonts], function(event, cb){
        server.notify(event);
    });
    watch([path.watch.style], function(event,cb){
        gulp.run('css:build');
        server.notify(event);
    });
});

gulp.task('default', ['js:build', 'css:build', 'server', 'watch', 'openbrowser']);
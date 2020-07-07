

var {series , parallel , src , dest , watch} = require('gulp');

var clean = require('gulp-clean');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

function cleanTask(){
    return src('./dist',{allowEmpty:true})
    .pipe(clean());
}

function htmlTask(){
    return src('./src/views/*.html')
    .pipe(fileinclude({
        prefix : '@',
        basepath : './src/views/templates'
    }))
    .pipe(dest('./dist/views'));
}

function cssTask(){
    return src('./src/css/all.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'));
}

function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'));
}

function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'));
}

function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'));
}

function apiTask(){
    return src('./src/api/**')
            .pipe(dest('./dist/api'));
}

function mockTask(){
    return src('./src/mock/**')
            .pipe(dest('./dist/mock'));
}

function watchTask(){
    watch('./src/css/**', cssTask);
    watch('./src/views/**' , htmlTask);
    watch('./src/static/**' , staticTask);
    watch('./src/lib/**' , libTask);
    watch('./src/js/**' , jsTask);
    watch('./src/api/**' , apiTask);
    watch('./src/mock/**' , mockTask);
}

function webTask(){
    return src('./dist')
            .pipe(webserver({
                    host : 'localhost',
                    port : 3000,
                    open : './views/index.html',
                    livereload : true
            }))
}

module.exports = {
    dev : series(cleanTask, parallel(cssTask,htmlTask,jsTask,libTask,staticTask,apiTask,mockTask),parallel(watchTask,webTask))
};

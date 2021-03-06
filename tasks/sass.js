/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp    = require('gulp'),
	plumber = require('gulp-plumber'),
	sass    = require('gulp-sass'),
	livereload = require('gulp-livereload');

module.exports = function () {
    return gulp.src('client/apps/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('dev/client/apps'))
		.pipe(livereload());
		
};

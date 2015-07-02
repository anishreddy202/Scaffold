/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	bowerFiles  = require('main-bower-files'),
	inject 		= require('gulp-inject'),
	fileSort    = require('gulp-angular-filesort');


var filestoInject =[
	'client/app/*.js','client/app/**/*.js'];

module.exports = function(){
	return gulp.src('client/index.html')
        .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
            name: 'bower',
            relative: 'true'
        }))
		.pipe(inject(
            gulp.src(filestoInject).pipe(fileSort()), { relative: true }
        ))
        .pipe(gulp.dest('client'));
}
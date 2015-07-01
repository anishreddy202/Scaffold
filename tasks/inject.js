/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	bowerFiles  = require('main-bower-files'),
	inject 		= require('gulp-inject');


module.exports = function(){
	return gulp.src('client/index.html')
        .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
            name: 'bower',
            relative: 'true'
        }))
        .pipe(gulp.dest('client'));
}
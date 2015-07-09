/// <reference path="./typings/tsd.d.ts" />

var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
	

gulp.task('default',function(cb){
	gulp.start('develop');
});

gulp.task('sass', require('./tasks/sass'));

gulp.task('serve',	['watch'], require('./tasks/serve') );

gulp.task('watch',  require('./tasks/watch'));

gulp.task('build',[],require('./tasks/build'));

gulp.task('develop',[],require('./tasks/develop'));



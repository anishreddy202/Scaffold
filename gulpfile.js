/// <reference path="./typings/tsd.d.ts" />

var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
	

gulp.task('default',function(cb){
	runSequence('develop',cb);
});

// gulp.task('default',function(cb){
// 	runSequence('develop','typescript','sass','serve',cb);
// })

// gulp.task('typescript',['typescript-server','typescript-client']);
// gulp.task('typescript-server', require('./tasks/typescript-server'));
// gulp.task('typescript-client', require('./tasks/typescript-client'));

gulp.task('sass', require('./tasks/sass'));

gulp.task('serve',	['watch'], require('./tasks/serve') );

gulp.task('watch',  require('./tasks/watch'));
// gulp.task('inject',[],require('./tasks/inject'));

gulp.task('build',[],require('./tasks/build'));

gulp.task('develop',[],require('./tasks/develop'));



/// <reference path="./typings/tsd.d.ts" />

var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
	

gulp.task('default',function(cb){
	runSequence('typescript','serve',cb);
});

gulp.task('typescript',['typescript-server']);
gulp.task('typescript-server', require('./tasks/typescript-server'));

gulp.task('serve',	['watch'], require('./tasks/serve') );
gulp.task('watch', ['inject'],  function(){
	watch('server/**/*.ts', function () {
    	gulp.start('typescript');
  	});
});

gulp.task('inject',require('./tasks/inject'));

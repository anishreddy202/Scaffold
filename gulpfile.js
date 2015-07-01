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
gulp.task('watch',   function(){
	watch('server/**/*.ts', function () {
    	gulp.start('typescript');
  	});
});

// var gulp = require('gulp'),
// 	ts = require('gulp-typescript'),
//  	sourcemaps  = require('gulp-sourcemaps'),
// 	watch = require('gulp-watch'),
// 	nodemon = require('gulp-nodemon');

// var src = './server';
// var tsConfigOptions = require('./tsconfig.json').compilerOptions;
// console.log(tsConfigOptions);

// gulp.task('build', function() {
// 	var tsResult = gulp.src(['server/**/*.ts', 'typings/**/*.ts'])
// 		.pipe(sourcemaps.init())
// 		.pipe(ts(tsConfigOptions));

// 	tsResult.dts.pipe(gulp.dest(src));

// 	return tsResult.js
// 	.pipe(sourcemaps.write('.'))
// 	.pipe(gulp.dest(src));
// });

// gulp.task('develop', function () {
//   nodemon({ script: 'server/server.js',ext:'js'});
// });


// gulp.task('watch', function() {
// 	watch('server/**/*.ts', function () {
//     	gulp.task('build');
//   	});
// });

// gulp.task('default', ['build','watch']);
/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	typescript  = require('gulp-typescript');

module.exports = function(dest){
	var tsSources = ['server/**/*.ts', 'typings/**/*.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;

	var tsResult = gulp.src(tsSources)
	.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest( dest + '/server'));
}

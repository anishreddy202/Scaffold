/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	typescript  = require('gulp-typescript'),
	sourcemaps  = require('gulp-sourcemaps');

var dest = './client/app';
var tsSources = [
	'client/app/*.ts', 'client/app/**/*.ts','typings/**/*.ts'];

var tsConfigOptions = require('../tsconfig.json').compilerOptions;

module.exports = function(){
	var tsResult = gulp.src(tsSources)
		.pipe(sourcemaps.init())
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(dest));
}
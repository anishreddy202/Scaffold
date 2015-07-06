/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	typescript  = require('gulp-typescript'),
	sourcemaps  = require('gulp-sourcemaps');

var dest = './client';
var tsSources = [
	 'client/**/*.ts','typings/**/*.ts','!client/app.d.ts'];

var tsConfigOptions = require('../tsconfig.json').compilerOptions;

module.exports = function(){
	var tsResult = gulp.src(tsSources)
		.pipe(sourcemaps.init())
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(dest));
}
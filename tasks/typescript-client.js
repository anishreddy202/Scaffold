/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	typescript  = require('gulp-typescript');

var path = '/client/apps';
var tsSources = [
	 'client/apps/**/*.ts','typings/**/*.ts','!client/app.d.ts'];

var tsConfigOptions = require('../tsconfig.json').compilerOptions;

module.exports = function(dest){
	console.log(dest());
	console.log('i am in tscompiler');
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	 .pipe(gulp.dest('./dev' + path));
}
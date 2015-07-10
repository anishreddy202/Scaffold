/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	typescript  = require('gulp-typescript');


var tsSources = ['server/**/*.ts', 'typings/**/*.ts'];
var tsConfigOptions = require('../tsconfig.json').compilerOptions;

module.exports = function(dest){
	var tsResult = gulp.src(tsSources)
	.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest( dest + '/server'));
}

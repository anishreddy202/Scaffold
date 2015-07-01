/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp = require('gulp'),
    watch   = require('gulp-watch');

module.exports = function(){
	return watch('server/**/*.ts', function () {
    	gulp.run('typescript');
  	});
}
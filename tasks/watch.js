/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp = require('gulp'),
    watch   = require('gulp-watch'),
	livereload = require('gulp-livereload');

module.exports = function(){
	
	livereload.listen();
	
	var tsClientSources = [
		'client/apps/**/*.ts'
	]
	
	watch('client/apps/*.scss', function () {
    	gulp.run('sass');
  	});
	
	watch(tsClientSources, function () {
    	gulp.run('typescript-client:dev');
  	});
	  
	watch(['server/**/*.html','client/apps/**/*.html'], function () {
    	gulp.run('copy:html');
  	});
    	  
	watch('server/**/*.ts', function () {
    	gulp.run('typescript-server:dev');
  	});
}
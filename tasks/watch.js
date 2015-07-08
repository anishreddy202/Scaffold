/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp = require('gulp'),
    watch   = require('gulp-watch');

module.exports = function(){
	
	var tsClientSources = [
		'client/apps/**/*.ts'
	]
	
	watch(tsClientSources, function () {
    	gulp.run('typescript-client:dev');
  	});
	  
	watch('server/**/*.html', function () {
    	gulp.run('copy:dev');
  	});
    
	
	  
	watch('server/**/*.ts', function () {
    	gulp.run('typescript-server:dev');
  	});
}
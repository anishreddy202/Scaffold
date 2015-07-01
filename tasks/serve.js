

/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	nodemon    = require('gulp-nodemon');


module.exports = function(){
	return nodemon({ 
		script: 'server/server.js',
		ext:'js'
		});
}


/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	nodemon     = require('gulp-nodemon'),
	open 		= require('gulp-open'),
	ripe       = require('ripe'),
	livereload = require('gulp-livereload');

var config = require('../server/config/environment');

var openOpts = {
    url: 'http://localhost:' + config.port,
    already: false
};

module.exports = function(){
	return nodemon({ 
		script: 'dev/server/server.js',
		ext:'js'
		})
		.on('start', function () {
                if (!openOpts.already) {
                    openOpts.already = true;
					gulp.src('dev/server/home/home.html')
                    	.pipe(open('', openOpts));
                } else {
					// ripe.wait(function () {
                    //     livereload.changed('/');
                    // });
                }
            });
}
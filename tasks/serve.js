

/// <reference path="../typings/tsd.d.ts" />
'use script'

var gulp        = require('gulp'),
	nodemon     = require('gulp-nodemon'),
	open 		= require('gulp-open');

var config = require('../server/config/environment');

var openOpts = {
    url: 'http://localhost:' + config.port,
    already: false
};

module.exports = function(){
	return nodemon({ 
		script: 'dist/server/server.js',
		ext:'js'
		})
		.on('start', function () {
                if (!openOpts.already) {
                    openOpts.already = true;
					gulp.src('client/index.html')
                    	.pipe(open('', openOpts));
                } else {

                }
            });
}
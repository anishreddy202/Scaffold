var fs 		    = require('fs');
var path 	    = require('path');
var concat      = require('gulp-concat');
var fileSort    = require('gulp-angular-filesort');
var gulp        = require('gulp');

module.exports =  function (dest){
	var appsPath = dest + '/client/apps';
	
	var folders = fs.readdirSync(appsPath)
		.filter(function(file) {
			return fs.statSync(path.join(appsPath, file)).isDirectory();
		});
	
	return folders.map(function(folder){
	     gulp.src(path.join(appsPath, folder, '/**/*.js'))
		 	.pipe(fileSort())
			.pipe(concat(folder + '.min.js'))
			.pipe(gulp.dest(appsPath +'/'+ folder))
	});
}
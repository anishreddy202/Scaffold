
var gulp                 = require('gulp');
var runSequence          = require('run-sequence');
var del                  = require('del');
var autoprefixer         = require('gulp-autoprefixer');
var minifyCss            = require('gulp-minify-css');
var angularTemplatecache = require('gulp-angular-templatecache');
var sq                   = require('streamqueue');
var concat               = require('gulp-concat');

module.exports = function (done) {
  runSequence(
    ['clean:dist', 'sass'],
	['cssmin','copy:dist'],
    done);
};

	// 'client/apps/**/*',
	// '!client/apps/**/*.ts',
	// '!client/apps/**/*.js.map',
	// 	'!client/apps/app.css',
	// '!client/apps/app.scss',
	
var srcFiles= [
	'server/**/*',
	'!server/**/*js.map', 
	'!server/**/*.ts', 
	'package.json',
	'client/assets/**/*'
]


gulp.task('clean:dist', function (done) {
  del(['dist/**', '!dist', '!dist/.git{,/**}'], done);
});

gulp.task('copy:dist', function () {
  return gulp.src(srcFiles, { base: './' }).pipe(gulp.dest('dist/'));
});

gulp.task('cssmin',['scripts'], function () {
  return gulp.src('client/apps/app.css')
  	.pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/client/apps'));
});

gulp.task('scripts', function (done) {
	runSequence(['build:cmsApp','build:myApps','build:headerApp','build:vendorScripts'], done);
});

gulp.task('build:cmsApp', function (done) {
		
  	var tpls=  gulp.src('client/apps/cms/**/*.html')
    	.pipe(angularTemplatecache({
      		root: 'apps/cms',
      		module: 'uiApp.cms'
    }));
	
	var app = gulp.src('client/apps/cms/cms.js')
	
	return sq({ objectMode: true }, app,tpls)
    .pipe(concat('cms.js'))	
    .pipe(gulp.dest('dist/client/apps'));

});

gulp.task('build:myApps', function (done) {
		
  	var tpls=  gulp.src('client/apps/myapps/**/*.html')
    	.pipe(angularTemplatecache({
      		root: 'apps/myapps',
      		module: 'uiApp.myapps'
    }));
	
	var scripts = gulp.src(['client/apps/myapps/myapps.js',
		'client/apps/myapps/myapps.controller.js']);
	
	return sq({ objectMode: true }, scripts,tpls)
    .pipe(concat('myapps.js'))	
    .pipe(gulp.dest('dist/client/apps'));

});

gulp.task('build:headerApp', function (done) {
		
  	var tpls=  gulp.src('client/apps/header/**/*.html')
    	.pipe(angularTemplatecache({
      		root: 'apps/header',
      		module: 'uiApp.header'
    }));
	
	var scripts = gulp.src(['client/apps/header/header.js',
		'client/apps/header/header.controller.js']);
	
	return sq({ objectMode: true }, scripts,tpls)
    .pipe(concat('header.js'))	
    .pipe(gulp.dest('dist/client/apps'));

});

gulp.task('build:vendorScripts', function (done) {
	
	var vendorSrc = [
		'client/bower_components/angular/angular.js',
		'client/bower_components/angular-ui-router/release/angular-ui-router.js',
		'client/bower_components/jquery/dist/jquery.js',
		'client/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
	];
		
	return gulp.src(vendorSrc).pipe(gulp.dest('dist/client/scripts'));

});
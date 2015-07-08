
var gulp                 = require('gulp');
var runSequence          = require('run-sequence');
var del                  = require('del');
var autoprefixer         = require('gulp-autoprefixer');
var minifyCss            = require('gulp-minify-css');
var angularTemplatecache = require('gulp-angular-templatecache');
var sq                   = require('streamqueue');
var concat               = require('gulp-concat');
var	typescript  = require('gulp-typescript');
var	sourcemaps  = require('gulp-sourcemaps');

module.exports = function (done) {
  runSequence(
    ['clean:dev'],
	['copy:dev'],
	['typescript:dev'],
	['scripts'],
	['serve'],
    done);
};
	
var srcFiles= [
	'package.json',
	'client/assets/**/*',
	'client/apps/**/*.html',
	'server/**/*',
	'!server/**/*.ts'
]

var src = "./dev"

gulp.task('clean:dev', function (done) {
  del(['dev/**', '!dev', '!dev/.git{,/**}'], done);
});

gulp.task('copy:dev', function () {
  return gulp.src(srcFiles, { base: './' }).pipe(gulp.dest('dev/'));
});

gulp.task('typescript:dev',['typescript-server:dev','typescript-client:dev']);

gulp.task('typescript-server:dev', function(){
	var tsSources = ['server/**/*.ts', 'typings/**/*.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest('./dev/server'));	
});
gulp.task('typescript-client:dev', function(){
	var tsSources = [ 'client/apps/**/*.ts','typings/**/*.ts','!client/app.d.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest('./dev/client/apps'));
	
});

gulp.task('scripts', function (done) {
	runSequence(['build:headerApp','build:cmsApp','build:myApps','build:vendorScripts'],['removeScripts'], done);
});

gulp.task('build:headerApp', function (done) {
	
	var scripts = gulp.src(['dev/client/apps/header/header.js',
		'dev/client/apps/header/header.controller.js']);
			
	return sq({ objectMode: true }, scripts)
	    .pipe(concat('header.min.js'))	
	    .pipe(gulp.dest('dev/client/apps/header'));

});

gulp.task('build:cmsApp', function (done) {
	var scripts = gulp.src('dev/client/apps/cms/cms.js')
	
	return sq({ objectMode: true }, scripts)
    .pipe(concat('cms.min.js'))	
    .pipe(gulp.dest('dev/client/apps/cms'));

});

gulp.task('build:myApps', function (done) {
			
	var scripts = gulp.src(['dev/client/apps/myapps/myapps.js',
		'dev/client/apps/myapps/myapps.controller.js']);
	
	return sq({ objectMode: true }, scripts)
    .pipe(concat('myapps.min.js'))	
    .pipe(gulp.dest('dev/client/apps/myapps'));

});

gulp.task('removeScripts', function (done) {
	
	var src = ['dev/client/apps/**/*.js','!dev/client/apps/**/*.min.js']		
	del(src,done);

});

// gulp.task('cssmin',['scripts'], function () {
//   return gulp.src('client/apps/app.css')
//   	.pipe(autoprefixer())
//     .pipe(gulp.dest('dev/client/apps'));
// });

gulp.task('build:vendorScripts', function (done) {
	
	var vendorSrc = [
		'client/bower_components/angular/angular.js',
		'client/bower_components/angular-ui-router/release/angular-ui-router.js',
		'client/bower_components/jquery/dist/jquery.js',
		'client/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
	];
		
	return gulp.src(vendorSrc).pipe(gulp.dest('dev/client/scripts'));

});

var gulp                 = require('gulp');
var runSequence          = require('run-sequence');
var del                  = require('del');
var autoprefixer         = require('gulp-autoprefixer');
var minifyCss            = require('gulp-minify-css');
var angularTemplatecache = require('gulp-angular-templatecache');
var sq                   = require('streamqueue');
var concat               = require('gulp-concat');
var fileSort    = require('gulp-angular-filesort');
var	typescript  = require('gulp-typescript');
var	sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
var fs 		    = require('fs');
var path 	    = require('path');

module.exports = function (done) {
	
  runSequence(
    ['clean:dev'],['copy:dev','copy:html'],['sass','styles'],
	['typescript:dev'],['scripts'],['removeScripts'],['serve'],
    done);
};
	
var srcFiles= [
	'package.json',
	'client/assets/**/*',
	'server/**/*',
	'!server/**/*.ts'
]

var htmlFiles = [
	'client/apps/**/*.html',
	'server/**/*.html',
];

var vendorSrc = [
	'client/bower_components/angular/angular.js',
	'client/bower_components/angular-ui-router/release/angular-ui-router.js',
	'client/bower_components/jquery/dist/jquery.js',
	'client/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
];

var dest = "./dev"

gulp.task('clean:dev', function (done) {
  del([dest + '/**'], done);
});

gulp.task('copy:dev', function () {
  return gulp.src(srcFiles, { base: './' }).pipe(gulp.dest(dest));
});

gulp.task('copy:html', function () {
  return gulp.src(htmlFiles, { base: './' }).pipe(gulp.dest(dest));
});

gulp.task('typescript:dev',['typescript-server:dev','typescript-client:dev']);

gulp.task('typescript-server:dev', function(){
	
	var tsSources = ['server/**/*.ts', 'typings/**/*.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest( dest + '/server'));	
});
gulp.task('typescript-client:dev', function(){
	
	//require('./typescript-client')('./dev');
	
	var tsSources = [ 'client/apps/**/*.ts','typings/**/*.ts','!client/app.d.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest(dest + '/client/apps'));
	
});

//gulp.task('typescript-client:dev',require('./typescript-client'));

gulp.task('scripts', function (done) {
	runSequence(['build:scripts'],['build:vendorScripts'],['removeScripts'], done);
});

gulp.task('styles', function (done) {
	var vendorSrc = [
		'client/bower_components/bootstrap-theme-vz/iot/bootstrap.min.css',
	];
		
	return gulp.src(vendorSrc).pipe(gulp.dest(dest + '/client/assets/styles'));
});

gulp.task('build:scripts', function () {
	require('./build-scripts')('./dev');
});


gulp.task('removeScripts', function (done) {	
	var src = [dest + '/client/apps/**/*.js','!'+ dest + '/client/apps/**/*.min.js']		
	del(src,done);
});

gulp.task('build:vendorScripts', function (done) {
	return gulp.src(vendorSrc).pipe(gulp.dest(dest + '/client/scripts'));
});
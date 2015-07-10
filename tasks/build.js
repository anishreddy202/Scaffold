
var gulp                 = require('gulp');
var runSequence          = require('run-sequence');
var del                  = require('del');
var autoprefixer         = require('gulp-autoprefixer');
var minifyCss            = require('gulp-minify-css');
var angularTemplatecache = require('gulp-angular-templatecache');
var sq                   = require('streamqueue');
var concat               = require('gulp-concat');
var uglify               = require('gulp-uglify');
var	typescript  = require('gulp-typescript');
var	sourcemaps  = require('gulp-sourcemaps');
var nodemon     = require('gulp-nodemon');
var open 		= require('gulp-open');
var	plumber 	= require('gulp-plumber');
var	sass    	= require('gulp-sass');

module.exports = function (done) {
  runSequence(
    ['clean:dist'],
	['copy:dist'],
	['sass:dist','styles:dist'],
	['typescript:dist'],
	['scripts:dist'],
	['serve:dist'],
    done);
};
	
var srcFiles= [
	'package.json',
	'client/assets/**/*',
	'client/apps/**/*.html',
	'server/**/*',
	'!server/**/*.ts'
]

var src = "./dist"

gulp.task('clean:dist', function (done) {
  del(['dist/**', '!dist', '!dist/.git{,/**}'], done);
});

gulp.task('copy:dist', function () {
  return gulp.src(srcFiles, { base: './' }).pipe(gulp.dest('dist/'));
});

gulp.task('typescript:dist',['typescript-server:dist','typescript-client:dist']);

gulp.task('typescript-server:dist', function(){
	var tsSources = ['server/**/*.ts', 'typings/**/*.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest('./dist/server'));
		
});
gulp.task('typescript-client:dist', function(){
	var tsSources = [ 'client/apps/**/*.ts','typings/**/*.ts','!client/app.d.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest('./dist/client/apps'));
	
});

gulp.task('scripts:dist', function (done) {
	runSequence(['build:headerApp:dist','build:cmsApp:dist','build:myApps:dist','build:vendorScripts:dist'],['removeScripts:dist'], done);
});

gulp.task('build:headerApp:dist', function (done) {
	
	var scripts = gulp.src(['dist/client/apps/header/header.js',
		'dist/client/apps/header/header.controller.js']);
			
	return sq({ objectMode: true }, scripts)
	    .pipe(concat('header.min.js'))
		.pipe(uglify())	
	    .pipe(gulp.dest('dist/client/apps/header'));

});

gulp.task('build:cmsApp:dist', function (done) {
	var scripts = gulp.src('dist/client/apps/cms/cms.js')
	
	return sq({ objectMode: true }, scripts)
    .pipe(concat('cms.min.js'))
	.pipe(uglify())	
    .pipe(gulp.dest('dist/client/apps/cms'));

});

gulp.task('build:myApps:dist', function (done) {
			
	var scripts = gulp.src(['dist/client/apps/myapps/myapps.js',
		'dist/client/apps/myapps/myapps.controller.js']);
	
	return sq({ objectMode: true }, scripts)
    .pipe(concat('myapps.min.js'))
	.pipe(uglify())		
    .pipe(gulp.dest('dist/client/apps/myapps'));

});

gulp.task('removeScripts:dist', function (done) {
	
	var src = ['dist/client/apps/**/*.js','!dist/client/apps/**/*.min.js']		
	del(src,done);

});

gulp.task('styles:dist', function (done) {
	var vendorSrc = [
		'client/bower_components/bootstrap-theme-vz/iot/bootstrap.min.css',
	];
		
	return gulp.src(vendorSrc).pipe(gulp.dest('dist/client/assets/styles'));
});

// gulp.task('cssmin',['scripts'], function () {
//   return gulp.src('client/apps/app.css')
//   	.pipe(autoprefixer())
//     .pipe(gulp.dest('dev/client/apps'));
// });

gulp.task('build:vendorScripts:dist', function (done) {
	
	var vendorSrc = [
		'client/bower_components/angular/angular.js',
		'client/bower_components/angular-ui-router/release/angular-ui-router.js',
		'client/bower_components/jquery/dist/jquery.js',
		'client/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
	];
		
	return gulp.src(vendorSrc).pipe(gulp.dest('dist/client/scripts'));

});

gulp.task('serve:dist', function (done) {
	
var config = require('../server/config/environment');

var openOpts = {
    url: 'http://localhost:' + config.port,
    already: false
};

nodemon({ 
		script: 'dist/server/server.js',
		ext:'js'
		})
		.on('start', function () {
                if (!openOpts.already) {
                    openOpts.already = true;
					gulp.src('dist/server/home/home.html')
                    	.pipe(open('', openOpts));
                } else {

                }
            });

});

gulp.task('sass:dist', function (done) {

  return gulp.src('client/apps/app.scss')
        .pipe(plumber())
        .pipe(sass())
		.pipe(minifyCss())
        .pipe(gulp.dest('dist/client/apps'));
});


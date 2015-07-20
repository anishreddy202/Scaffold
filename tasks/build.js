
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
var fs 		    = require('fs');
var path 	    = require('path');
var fileSort    = require('gulp-angular-filesort');

module.exports = function (done) {
  runSequence(
    ['clean:dist'],['copy:dist','copy-html:dist'],['sass:dist','styles:dist'],
	['typescript:dist'],['scripts:dist'],['serve:dist'],
    done);
};
	
var srcFiles= [
	'package.json',
	'client/assets/**/*',
	'server/**/*',
	'!server/**/*.ts',
	'!server/**/*.js.map'
]

var htmlFiles = [
	'client/apps/**/*.html',
	'client/apps/**/*.md',
	'client/apps/**/*.json',
	'server/**/*.html',	
];

var vendorSrc = [
	'client/bower_components/angular/angular.js',
	'client/bower_components/angular-ui-router/release/angular-ui-router.js',
	'client/bower_components/jquery/dist/jquery.js',
	'client/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
	'client/bower_components/marked/lib/marked.js',
	'client/bower_components/angular-md/dist/angular-md.js',
	'client/scripts/swagger-ui.js'
];

var styleVendors = [
	'client/bower_components/bootstrap-theme-vz/iot/bootstrap.min.css',
	'client/bower_components/angular-swagger-ui/dist/css/swagger-ui.min.css',
];


var dest = "./dist"

gulp.task('clean:dist', function (done) {
	del([dest + '/**', '!'+ dest], done);
  // del(['dist/**', '!dist', '!dist/.git{,/**}'], done);
});

gulp.task('copy:dist', function () {
  // return gulp.src(srcFiles, { base: './' }).pipe(gulp.dest('dist/'));
  return gulp.src(srcFiles, { base: './' }).pipe(gulp.dest(dest));
});

gulp.task('copy-html:dist', function () {
  return gulp.src(htmlFiles, { base: './' }).pipe(gulp.dest(dest));
});

gulp.task('typescript:dist',['typescript-server:dist','typescript-client:dist']);

gulp.task('typescript-server:dist', function(){
	var tsSources = ['server/**/*.ts', 'typings/**/*.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest( dest + '/server'));
		
});
gulp.task('typescript-client:dist', function(){
	var tsSources = [ 'client/apps/**/*.ts','typings/**/*.ts','!client/app.d.ts'];
	var tsConfigOptions = require('../tsconfig.json').compilerOptions;
	
	var tsResult = gulp.src(tsSources)
		.pipe(typescript(tsConfigOptions));

 	return tsResult.js
	.pipe(gulp.dest(dest + '/client/apps'));
	
});

gulp.task('scripts:dist', function (done) {
	runSequence(['build:scripts:dist'],['build:vendorScripts:dist'],['removeScripts:dist'], done);
	
});

gulp.task('build:scripts:dist', function () {
	require('./build-scripts')('./dist');
});

gulp.task('removeScripts:dist', function (done) {
	
	var src = ['dist/client/apps/**/*.js','!dist/client/apps/**/*.min.js']		
	del(src,done);

});

gulp.task('styles:dist', function () {		
	return gulp.src(styleVendors).pipe(gulp.dest(dest + '/client/assets/styles'));
});


gulp.task('build:vendorScripts:dist', function (done) {		
	return gulp.src(vendorSrc).pipe(gulp.dest(dest + '/client/scripts'));
});

gulp.task('sass:dist', function (done) {

  return gulp.src('client/apps/app.scss')
        .pipe(plumber())
        .pipe(sass())
		.pipe(minifyCss())
        .pipe(gulp.dest('dist/client/apps'));
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


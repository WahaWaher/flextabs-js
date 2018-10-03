'use strict';

const gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		scss = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		rename = require("gulp-rename"),
		del = require('del'),
		uglify = require("gulp-uglify"),
		cssnano = require('gulp-cssnano'),
		headerComment = require('gulp-header-comment'),
		headerInfo = `
	    	jQuery.flexTabs
		   Version: 1.0.7
		   Repo: https://github.com/WahaWaher/flextabs-js
		   Author: Sergey Kravchenko
		   Contacts: wahawaher@gmail.com
		   License: MIT
	  `;

// BrowserSync
gulp.task('browser-sync', function() {
	browserSync.init({
  	proxy: 'flextabs.js',
  	notify: false,
  	browser: 'chrome'
  });
});

gulp.task('scss', function() {
    return gulp.src('demo/scss/**/*.scss')
    .pipe(scss({
    	outputStyle: "expanded",
			indentType: "tab", 
			indentWidth: 1
    })).pipe(autoprefixer({
            browsers: ['last 30 versions', '> 0.5%', 'ie 9-11'], // github.com/ai/browserslist#queries
        }))
    .pipe(gulp.dest('demo/css'))
    .pipe(browserSync.stream())
});

gulp.task('default', ['browser-sync', 'scss'], function() {
  gulp.watch('demo/scss/**/*.scss', ['scss']);
	gulp.watch('demo/**/*.js').on('change', browserSync.reload);
	gulp.watch('demo/**/*.+(html|php)').on('change', browserSync.reload);
});

gulp.task('build', ['deldist', 'scss'], function() {

	gulp.src([
		'demo/js/jquery.flextabs.js'
		])
	.pipe(headerComment(headerInfo))
	.pipe(gulp.dest('dist'));

	gulp.src('demo/js/jquery.flextabs.js')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(headerComment(headerInfo))
	.pipe(gulp.dest('dist'));

	gulp.src([
		'demo/css/jquery.flextabs.css',
		'demo/css/jquery.flextabs.theme-default.css'
		])
	.pipe(headerComment(headerInfo))
	.pipe(gulp.dest('dist'));

	gulp.src('demo/css/jquery.flextabs.css')
	.pipe(cssnano({ discardComments: { removeAll: true } }))
   .pipe(rename({ suffix: '.min' }))
   .pipe(headerComment(headerInfo))
	.pipe(gulp.dest('dist'));

	gulp.src('demo/css/jquery.flextabs.theme-default.css')
	.pipe(cssnano({ discardComments: { removeAll: true } }))
   .pipe(rename({ suffix: '.min' }))
   .pipe(headerComment(headerInfo))
	.pipe(gulp.dest('dist'));

	// gulp.src(['demo/folder/**/*']).pipe(gulp.dest('dist/folder'));

});


gulp.task('deldist', function() {
  return del.sync('dist');
});
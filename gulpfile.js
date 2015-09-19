"use strict";

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	opn = require('opn'),
	sass = require('gulp-sass'),
	minify = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	spritesmith = require('gulp.spritesmith');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
  opn('http://localhost:8080/');
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/assets/img/icons-png/*.*')
            .pipe(spritesmith({
                imgName: 'sprites.png',
                imgPath: '../img/sprites.png',
                cssName: '_sprites.scss'
            }));

    spriteData.img.pipe(gulp.dest('app/assets/img'));
    spriteData.css.pipe(gulp.dest('app/assets/scss'));
});

gulp.task('css', function(){
	gulp.src('app/assets/scss/style.scss')
		.pipe(sass())
		.pipe(minify())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(connect.reload());
	gulp.src('app/assets/scss/_ie.scss')
		.pipe(sass())
		.pipe(minify())
		.pipe(rename('ie.css'))
		.pipe(gulp.dest('app/assets/css'));
});

gulp.task('html', function(){
	gulp.src('app/*.html')
		.pipe(connect.reload());
});

gulp.task('compress', function() {
  gulp.src('app/assets/js/*.js')
    .pipe(uglify())
    .pipe(rename('js.min.js'))
    .pipe(gulp.dest('app/assets/js/min'));
});

gulp.task('watch', function(){
	gulp.watch(['app/*.html'], ['html']);
	gulp.watch(['app/assets/scss/*.scss'], ['css']);
	gulp.watch(['app/assets/js/*.js'], ['compress']);
});

gulp.task('default', ['connect', 'sprite', 'watch']);
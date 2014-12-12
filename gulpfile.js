// gulpfile.js

var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');


gulp.task('clean', function() {
	gulp.src(['./build'])
		.pipe(clean());
});

gulp.task('copy-html-files', function() {
	// gulp.src(['./app/**/*.html', '!./app/index.html'], {base: 'app/'})
	gulp.src(['./app/**/*.html'])
	  .pipe(gulp.dest('build/'));
});

gulp.task('move-images', function() {
	gulp.src('./app/**/*.gif')
		.pipe(gulp.dest('build/'));
})

gulp.task('usemin', function() {
	gulp.src('./app/index.html')
	  .pipe(usemin({
	  	// insert vendor prefixes
		css: [minifyCss(), rev()],
		js: [uglify(), rev()]
	  }))
	  .pipe(gulp.dest('build/'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'app/'	
	})
});

gulp.task('connectMin', function() {
	connect.server({
		root: 'build',
		port: '8888'	
	});
});

gulp.task('default', ['connect']);
gulp.task('build', ['copy-html-files', 'move-images', 'usemin']);


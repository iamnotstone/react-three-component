var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var webpack = require('webpack-stream');

gulp.task('clean',function(){
	del(['./dist/*.js']);
});



gulp.task('transpile',function(){
	return gulp.src('./src/index.js')
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./dist/'));
})

gulp.task('build',function(callback){
	runSequence('clean',['transpile'],callback)
})


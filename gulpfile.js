var gulp = require('gulp');
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

gulp.task('install', function(){
  return gulp.src('./dist/react-three-component.js')
  .pipe(gulp.dest('../oycad/client/dist/js/lib/'))
})

gulp.task('build',function(callback){
	runSequence('clean',['transpile'],callback)
})


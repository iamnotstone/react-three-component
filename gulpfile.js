var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task('clean',function(){
	del(['./client/dist/js/*.js','./client/dist/css/*.css']);

});



gulp.task('transpile',function(){
	return gulp.src('./src/index.js')
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./dist/'));
})

gulp.task('build',function(callback){
	runSequence('clean',['transpile'],callback)
})


gulp.task('watch',function(){
	gulp.watch('./client/src/**/*.js',['build']);
})

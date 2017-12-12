'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runSequence = require('run-sequence');

//Create Fonts & Font SASS
var fontName = 'vscom-icons';

gulp.task('iconfont', function () {
    gulp.src(['assets/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/css/templates/_icons.scss',
            targetPath: '../../assets/sass/vscom-icon.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: false,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        }))
        .pipe(gulp.dest('distribute/fonts/'));
});

//Compile Font SASS into CSS
gulp.task('styles', function() {
    return gulp.src('distribute/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./distribute/css/'));
});

// This will run in this order:
// * iconfont
// * styles
// * Finally call the callback function
gulp.task('build', function (callback) {
    runSequence('iconfont','styles',
        callback);
});

//Watch task
gulp.task('default',function() {
    gulp.watch('assets/sass/**/*.scss',['styles']);
});

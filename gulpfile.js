'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runSequence = require('run-sequence');

//Create Fonts & SASS template
var fontName = 'vscom-icons';

gulp.task('iconfont', function () {
    gulp.src(['assets/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/css/templates/_icons.scss',
            targetPath: '../../assets/sass/vscom-icons.scss',
            fontPath: '../fonts/',
            fontHeight: 1001,
            normalize: true
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: false,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        }))
        .pipe(gulp.dest('distribute/fonts/'));
});

//Compile SASS template into CSS
gulp.task('styles', function() {
    return gulp.src('distribute/sass/**/*.scss')
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./distribute/css/'));
});

// This will run in this order:
// * iconfont
// * styles
// * Finally call the callback function

gulp.task('build', function (done) {
    runSequence('iconfont', 'styles', function () {
        console.log('Run something else');
        done();
    });
});
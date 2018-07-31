'use strict';

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runSequence = require('run-sequence');
var ttf2svg = require('gulp-ttf-svg');
var fs = require('fs');
var fontBlast = require('font-blast');

//Convert TTF font type (MLD2 Icon font or subset) into single SVG file
gulp.task('ttf2svg', function () {
    return gulp.src('src/fonts/**.ttf')
        .pipe(ttf2svg())
        .pipe(gulp.dest('src/svg'));
});

//Extract glyphs fron single SVG font (mld2 icon font converted from ttf2svg task above task) into individual SVG files
gulp.task('font-blast', function () {
    return gulp.src('src/svg/vscom-icons.svg')
        .pipe(fontBlast('src/svg/vscom-icons.svg', 'src/icons'));
});


//Create Fonts & SASS template
var fontName = 'vscom-icons';

gulp.task('iconfont', function () {
    gulp.src(['src/icons/svg/*.svg'], { base: 'src/' })
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'src/css/templates/_icons.css',
            targetPath: '../css/_vscom-icons.css',
            fontPath: '../fonts/',
            fontHeight: 1001,
            normalize: true,
            cssClass: 'vscom-icon'
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: false,
            formats: ['ttf', 'woff', 'woff2','svg']
        }))
        .pipe(gulp.dest('dist/fonts/'));
});

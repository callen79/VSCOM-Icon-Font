'use strict';

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runSequence = require('run-sequence');
var ttf2svg = require('gulp-ttf-svg');
var fs = require('fs');
var fontBlast = require('font-blast');

//Convert TTF font type (MLD2 Icon font or subset) into SVG font
     //Only use if new MLD2 icons need to be added - only ttf available
gulp.task('ttf2svg', function () {
    return gulp.src('src/fonts/**.ttf')
        .pipe(ttf2svg())
        .pipe(gulp.dest('src/fonts/svg'));
});

//Extract glyphs from SVG font and separate into individual SVG files
    //Use with the ttf2svg task above
gulp.task('font-blast', function () {
    return gulp.src('src/fonts/svg/vscom-icons.svg')
        .pipe(fontBlast('src/fonts/fonts/svg/vscom-icons.svg', 'src/icons'));
});

//Create Fonts & SASS template from individual SVG icons (src/icons)
var fontName = 'vscom-icons';

gulp.task('create-font', function () {
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

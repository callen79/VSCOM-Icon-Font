var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'VSCOM Icons';

gulp.task('iconfont', function(){
  gulp.src(['app/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'app/assets/css/templates/_icons.css',
      targetPath: '../../dist/css/_icons.css',
      fontPath: '../../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: false,
      formats: ['ttf', 'eot', 'woff','woff2','svg']
     }))
    .pipe(gulp.dest('dist/fonts/'));
});
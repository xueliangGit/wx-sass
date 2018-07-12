// 载入外挂
var config = require('./config')
var gulp = require('gulp')
var rename = require('gulp-rename')
var notify = require('gulp-notify')
var sass = require('gulp-sass')
var plumber = require('gulp-plumber')
var AutoPrefix = require('gulp-autoprefixer')

var eslint = require('gulp-eslint')
gulp.task('sass', function () {
  return gulp.src(config.scss.src)
    .pipe(plumber({ errorHandler: notify.onError('Error:<%= error.message %>') }))
    // .pipe(sourcemaps.init())
    .pipe(AutoPrefix({
      browsers: config.browsers,
      cascade: true
    }))
    // .pipe(replace('!--','--!'))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(rename((path) => { path.basename = path.basename.replace('.scss', ''); path.extname = '.wxss' }))
    .pipe(gulp.dest(config.scss.dist))
})

// js
gulp.task('js', function () {
  return gulp.src(config.js.src)
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
  // .pipe(eslint.failAfterError());
})
// 开发环境
gulp.task('dev', ['sass', 'js'], function () {
  // 看守所有.less档
  // gulp.watch(config.less.watchSrc, ['less']);
  // 看守所有.sass档
  console.log('config.scss.watchSrc', config.scss.watchSrc)
  gulp.watch([config.scss.watchSrc], ['sass'])
  gulp.watch(config.js.watchSrc, ['js'])
  // var auto={};
})
gulp.task('watchScss', ['sass'], function () {
  gulp.watch([config.scss.watchSrc], ['sass'])
})
gulp.task('production', ['production_', 'sass'])

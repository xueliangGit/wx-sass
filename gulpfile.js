// 载入外挂
var config = require('./config')
var gulp = require('gulp')
// var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
// var minifycss = require('gulp-minify-css')
//  replace = require('gulp-replace'),
//  watch = require('gulp-watch'),
var notify = require('gulp-notify')
// sourcemaps=require('gulp-sourcemaps'),
//  less = require('gulp-less'),
var sass = require('gulp-sass')
var plumber = require('gulp-plumber')
var AutoPrefix = require('gulp-autoprefixer')
// LessPluginAutoPrefix = require('less-plugin-autoprefix');
// var autoprefixer = LessPluginAutoPrefix({
//     browsers:config.browsers,
//     cascade: true
// });
var eslint = require('gulp-eslint')

// var env = {
// production: false
// };
// var reload      = browserSync.reload;
// var spritesmith = require('gulp.spritesmith');//雪碧图
// sass
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
// // 样式~
// gulp.task('less',function(){
//   if(env.production){
//   return gulp.src(config.less.src)
//     .pipe(plumber({errorHandler:notify.onError('Error:less--<%= error.message.split("less")[1] %>')}))
//     .pipe(less({
//         plugins: [autoprefixer]
//     }))
//    // .pipe(concat('style.css'))
//     .pipe(gulp.dest(config.less.dist))
//     // .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest(config.less.dist));
//   //  .pipe(notify({ message: 'Styles task complete' }));
//   }else{
//   return gulp.src(config.less.src)
//     .pipe(plumber({errorHandler:notify.onError('Error:less--<%= error.message.split("less")[1] %>')}))
//      .pipe(sourcemaps.init())
//     .pipe(less({
//         plugins: [autoprefixer]
//     }))
//    // .pipe(concat('style.css'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(config.less.dist))
//     // .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest(config.less.dist));
//   //  .pipe(notify({ message: 'Styles task complete' }));
//   }
// })
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

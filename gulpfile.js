/**
 * Gulpfile for project
 * created by Sam Xu
 */

// 载入外挂
var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    order = require("gulp-order"),
    // spriter = require('gulp-css-spriter'),
    // base64 = require('gulp-css-base64'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    webpack = require('gulp-webpack'),
    fileinclude = require('gulp-file-include');


// 样式
gulp.task('styles', function() {
  gulp.src(['./src/assets/css/*.css', './src/lib/css/*.css'])
      .pipe(gulp.dest('./dist/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'Styles task complete' }));
  return gulp.src('./src/assets/css/*.less')
      .pipe(less())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('./dist/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'Styles task complete' }));
});

// 脚本
gulp.task('scripts', function(callback) {
  return gulp.src(['./src/assets/js/*.js', './src/lib/js/*.js'])
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream());
});
gulp.task('thirdPartyJs', function() {
 return gulp.src(['./src/lib/js/*.js'])
     .pipe(order([
       "src/lib/js/jquery-1.8.2.js",
       "src/lib/js/bootstrap.js",
       "src/lib/js/*.js"
     ]))
     .pipe(jshint('.jshintrc'))
     // .pipe(jshint.reporter('default'))
     // .pipe(concat('main.js'))
     .pipe(rename({ suffix: '.min' }))
     .pipe(uglify())
     .pipe(gulp.dest('./dist/js'))
     .pipe(notify({ message: 'Scripts task complete' }));
});

// 图片
gulp.task('images', function() {
  return gulp.src('./src/assets/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('./dist/images'))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'Images task complete' }));
});
//html
gulp.task('html', function() {
  return gulp.src('./views/**/*.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'html task complete' }));
});
// 清理
gulp.task('clean', function() {
  return gulp.src('./dist/', {read: false})
      .pipe(clean());
});

//预设任务
gulp.task('default', ['clean', 'serve']);


gulp.task('serve', ['styles', 'scripts', 'thirdPartyJs', 'images', 'html'], function() {
    //从这个项目的根目录启动服务器
    browserSync.init({
        server: "./dist/"
    });

    // 看守所有.scss档
    gulp.watch(['./src/assets/css/**/*.less','./src/assets/css/**/*.css'], ['styles']);

    // 看守所有.js档
    gulp.watch('./src/assets/js/**/*.js', ['scripts', 'thirdPartyJs']);

    // 看守所有图片档
    gulp.watch('./src/assets/images/**/*', ['images']);

    //看守html
    gulp.watch('./src/assets/**/*.html', ['html']) ;

    gulp.watch(['./dist/**']).on('change', browserSync.reload);

});
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify')
var useref = require('gulp-useref');
var gulpIf = require('gulp-if')
var concat = require('gulp-concat')
var cssnano = require('gulp-cssnano')
var imagemin = require('gulp-imagemin')
var cache = require('gulp-cache')
var del = require('del');

gulp.task('sass', function () {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('useref', function() {
    return gulp.src('app/index.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
})

gulp.task('images', function() {
    return gulp.src('app/static/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/static/images'))
})

gulp.task('clean', function () {
    return del.sync('dist')
})

gulp.task('fonts', function() {
    return gulp.src('app/static/fonts/**/*')
        .pipe(gulp.dest('dist/static/fonts'))
})

gulp.task('watch', ['browserSync'], function (){
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/scripts/main.js', browserSync.reload());
    gulp.watch('app/index.html', browserSync.reload());
})

gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function (){
    console.log('Building files');
})


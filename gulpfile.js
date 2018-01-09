var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('assets/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist/assets'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function(){
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

gulp.task('watch', ['browserSync'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
})
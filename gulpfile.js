var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var when = require('gulp-if');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var sequence = require('gulp-sequence');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var synchronizer = require('browser-sync').create();

var paths = {
    host: 'anita.deve',
    source: 'frontend',
    destination: 'public_html',
    stylesheet: ['frontend/style.scss'],
    stylesheets: ['frontend/**/*.scss'],
    javascript: ['frontend/code.js'],
    javascripts: ['frontend/**/*.js'],
    views: ['theme/index.html'],
    copyable: 'frontend/**/*.{html,eot,ttf,woff,woff2,ico,svg,png,jpeg,jpg,webm,mp4,gif,json}'
};


var relative = {
    base: 'frontend'
};

function stylesheets(development) {
    return function() {
        return sass(paths.stylesheet, {
            require: ['sass-globbing'],
            loadPath: ['node_modules/modularized-normalize-scss'],
            sourcemap: true
        })
        .pipe(autoprefixer({
            browsers: ['Safari >= 8', 'iOS 7', 'Firefox > 25', 'IE 7'],
            cascade: false
        }))
        .pipe(when(development, sourcemaps.write()))
        .pipe(when(!development, cssmin()))
        .pipe(gulp.dest(paths.destination))
        .pipe(when(development, synchronizer.stream()));
    };
}

function javascripts(development) {
    return function() {
        return gulp.src(paths.javascript, relative)
            .pipe(browserify({
                insertGlobals: true,
                debug: development
            }))
            .pipe(when(!development, uglify()))
            .pipe(gulp.dest(paths.destination))
            .pipe(when(development, synchronizer.stream()));
    };
}

gulp.task('javascripts-develop', javascripts(true));
gulp.task('javascripts-production', javascripts(false));

gulp.task('stylesheets-develop', stylesheets(true));
gulp.task('stylesheets-production', stylesheets(false));

gulp.task('clean', function() {
    return del(paths.destination);
});

gulp.task('copy', function() {
    return gulp.src(paths.copyable, relative)
        .pipe(gulp.dest(paths.destination))
        .pipe(synchronizer.stream());
});

gulp.task('synchronize', function() {
    synchronizer.init({
        proxy: paths.host
    });
});

gulp.task('build-develop', sequence('clean', 'synchronize', 'copy', 'stylesheets-develop', 'javascripts-develop'));

gulp.task('develop', ['build-develop'], function() {
    gulp.watch(paths.copyable, ['copy']);
    gulp.watch(paths.javascript, ['javascripts-develop']);
    gulp.watch(paths.stylesheets, ['stylesheets-develop']);
    gulp.watch(paths.javascripts, ['javascripts-develop']);
});

gulp.task('build-minify', sequence(['copy', 'stylesheets-production', 'javascripts-production']));
gulp.task('build-stage', sequence('clean', 'build-minify'));
gulp.task('build-production', sequence('clean', 'build-minify'));


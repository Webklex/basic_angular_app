/**
 * Created by webklex on 09.01.16.
 */

var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var ngAnnotate  = require('gulp-ng-annotate');
var bowerFiles  = require('main-bower-files');
var gulpFilter  = require('gulp-filter');
var rename      = require('gulp-rename');
var flatten     = require('gulp-flatten');
var inject      = require('gulp-inject');
var filesort    = require('gulp-angular-filesort');
var serve       = require('gulp-webserver');
var gutil       = require('gulp-util');

var dir = {
    src:    'src',
    bower:  'bower_components',
    dist:   'dist',
    tmp:    '.tmp'
};

dir.styles  = [
    dir.src+'/**/*.css',
    dir.src+'/**/**/*.css',
    dir.src+'/**/**/**/*.css',
    dir.src+'/**/**/**/**/*.css',
    dir.src+'/**/**/**/**/**/*.css'
];
dir.scripts = [
    dir.src+'/**/*.js',
    dir.src+'/**/**/*.js',
    dir.src+'/**/**/**/*.js',
    dir.src+'/**/**/**/**/*.js',
    dir.src+'/**/**/**/**/**/*.js'
];

gulp.task('serve', ['watch'], function(){
    gulp.src(dir.dist)
        .pipe(serve({
            livereload: true,
            directoryListing: true,
            open: false,
            //path: dir.dist
            fallback: 'index.html'
        }));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(dir.scripts, ['scripts']);
    gulp.watch(dir.styles, ['styles']);
    gulp.watch(dir.bower, ['bower']);
    gulp.watch([dir.src+'/**/*.html', dir.src+'/*.html'], ['inject']);
});

gulp.task('build', ['default'], function(){
    gutil.log(gutil.colors.green('Build has been completed'));
});

gulp.task('default', ['styles', 'scripts', 'bower', 'inject'], function(){

});

gulp.task('bower', function() {
    var jsFilter    = gulpFilter('*.js', {restore: true});
    var cssFilter   = gulpFilter('*.css', {restore: true});
    var fontFilter  = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore: true});
    var imageFilter = gulpFilter(['*.gif', '*.png', '*.svg', '*.jpg', '*.jpeg'], {restore: true});

    return gulp.src(bowerFiles())

        // JS
        .pipe(jsFilter)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dir.tmp+'/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dir.dist+'/js'))
        .pipe(jsFilter.restore)

        // CSS
        .pipe(cssFilter)
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest(dir.tmp+'/css'))
        .pipe(minifyCss({keepBreaks:true}))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dir.dist+'/css'))
        .pipe(cssFilter.restore)

        // FONTS
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dir.dist+'/fonts'))
        .pipe(fontFilter.restore)

        // IMAGES
        .pipe(imageFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dir.dist+'/images'))
        .pipe(imageFilter.restore)
});

gulp.task('scripts', function () {
    gulp.src(dir.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //.pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dist+'/js'))
});

gulp.task('styles', function () {
    gulp.src(dir.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dist+'/css'))
});

gulp.task('inject', function(){
    gulp.src('./src/index.html')
        .pipe(inject(
            gulp.src( [dir.dist+'/js/**/*.js']).pipe(filesort()), {
                addRootSlash : true,
                //ignorePath : '',
                transform : function ( filePath, file, i, length ) {
                    return '<script type="text/javascript" src="' + filePath.replace(dir.dist+'/', '')  + '"></script>';
                }
            }
        ))
        .pipe(inject(
            gulp.src( [dir.dist+'/css/**/*.css'], {read: false}), {
                addRootSlash : true,
                //ignorePath : '',
                transform : function ( filePath, file, i, length ) {
                    return '<link rel="stylesheet" href="' + filePath.replace(dir.dist+'/', '') + '"/>';
                }
            }
        ))
        .pipe(inject(
            gulp.src([
                dir.src+'/app/views/**/**/*.html',
                dir.src+'/app/views/**/*.html',
                dir.src+'/app/views/*.html'
            ]), {
                addRootSlash : true,
                ignorePath : dir.src+'/app/views/',
                transform : function ( filePath, file, i, length ) {
                    return '<script type = "text/ng-template" id="'+filePath.substring(1)+'">' +
                        file.contents.toString('utf8')+ '</script>';
                }
            }
        ))
        .pipe(gulp.dest(dir.dist));
});
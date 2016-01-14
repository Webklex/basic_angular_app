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
var series      = require('stream-series');
var htmlmin     = require('gulp-htmlmin');

var path = "";

var config = {
    depth: 6,
    debug: {
        autoOpen:   false,
        livereload: true,
        directoryListing: true
    }
};

var dir = {
    src:    'src',
    bower:  'bower_components',
    dist:   'dist',
    tmp:    '.tmp',
    styles:     [],
    scripts:    [],
    images:     [],
    folders:    [],
    html:   []
};

//Build CSS paths
for(var sI = dir.styles.length; sI < config.depth; sI++ ){
    path = "";
    for(var ssI = sI; ssI <= config.depth -1; ssI++ ){path += "/**";}
    dir.styles.push(dir.src+path+'/*.css');
    dir.scripts.push(dir.src+path+'/*.js');
    dir.html.push(dir.src+path+'/*.html');
    dir.folders.push(dir.src+path+'/*');
    dir.images.push(dir.src+path+'/*.{jpg,jpeg,png,gif}');
}


/*Gulp task Serve*/
gulp.task('serve', ['watch'], function(){
    gulp.src(dir.dist)
        .pipe(serve({
            livereload: config.debug.livereload,
            directoryListing:{
                enable: config.debug.directoryListing,
                path:   dir.dist
            },
            open: config.debug.autoOpen,
            //path: dir.dist
            fallback: 'index.html'
        }));
});

/*Gulp task Watch*/
gulp.task('watch', ['default'], function () {
    gulp.watch(dir.scripts, ['scripts']);
    gulp.watch(dir.styles,  ['styles']);
    gulp.watch(dir.bower,   ['bower']);
    gulp.watch(dir.images,  ['images']);
    gulp.watch([dir.src+'/**/*.html', dir.src+'/*.html'], ['inject']);
});

/*Gulp task Build*/
gulp.task('build', ['default'], function(){
    gutil.log(gutil.colors.green('Build has been completed'));
});

/*Gulp task Default*/
gulp.task('default', ['styles', 'scripts', 'images', 'bower', 'inject'], function(){});

/*Gulp task Bower*/
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
        .pipe(minifyCss())
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

/*Gulp task Scripts*/
gulp.task('scripts', function () {
    gulp.src(dir.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dir.tmp+'/js'))
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dist+'/js'))
});

/*Gulp task Styles*/
gulp.task('styles', function () {
    gulp.src(dir.styles)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dir.tmp+'/css'))
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dist+'/css'))
});


/*Gulp task Images*/
gulp.task('images', function () {
    gulp.src(dir.images)
        .pipe(rename({
            dirname: ""
        }))
        .pipe(gulp.dest(dir.dist+'/images'))
});

/*Gulp task Inject*/
gulp.task('inject', function(){
    var vendorCssStream = gulp.src([dir.dist+'/css/vendors*.css'], {read: false});
    var appCssStream    = gulp.src([dir.dist+'/css/**/*.css', '!'+dir.dist+'/css/vendors*.css'], {read: false});

    var htmlDir = dir.html;
    htmlDir.push('!'+dir.src+'/index.html');

    gulp.src('./src/index.html')
        .pipe(inject(
            gulp.src( [dir.dist+'/js/**/*.js']).pipe(filesort()), {
                addRootSlash : true,
                //ignorePath : '',
                transform : function ( filePath, file, i, length ) {
                    return '<script type="text/javascript" src="' + filePath.replace(dir.dist+'/', '').substring(1)  + '"></script>';
                }
            }
        ))
        .pipe(inject(series(vendorCssStream, appCssStream), {
            addRootSlash : true,
            //ignorePath : '',
            transform : function ( filePath, file, i, length ) {
                return '<link rel="stylesheet" href="' + filePath.replace(dir.dist+'/', '').substring(1) + '"/>';
            }
        }))
        .pipe(inject(
            gulp.src(htmlDir)
                .pipe(htmlmin({collapseWhitespace: true})),
            {
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
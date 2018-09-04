var gulp = require("gulp");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var sass = require("gulp-sass");
var ejs = require("gulp-ejs");
var autoprefixer = require("gulp-autoprefixer");
var cache = require('gulp-cached');
var merge = require('merge-stream');
var imagemin = require("gulp-imagemin");
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant')
var mozjpeg = require('imagemin-mozjpeg')
var changed  = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');


/*--------------------- ejs [ejs] --------------------*/
gulp.task('ejs', function() {
  var under = gulp.src(["./app/views/**/*.ejs" , '!./app/views/partial/*.ejs'])
    .pipe(cache( 'ejs' ))
    .pipe(plumber())
    .pipe(ejs({ msg: 'compiled!'}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./public/'))

    var top =  gulp.src('./app/views/index.ejs')
    .pipe(ejs({ msg: 'compiled!'}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./public/'))
    .pipe(browser.reload({stream:true}));

    return merge(under, top);
});

/*--------------------- sass [sass] --------------------*/
gulp.task("sass", function() {
  gulp.src("./app/stylesheets/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({pretty: true}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./public/css/"))
    .pipe(browser.reload({stream:true}));
    });

/*--------------------- image [imagemin] --------------------*/
gulp.task("imagemin", function () {
  gulp.src("./app/images/**/*.+(jpg|jpeg|png|gif|svg)")
    .pipe(changed('./public/img/'))
    .pipe(imagemin([
      pngquant({ quality: '65-80', speed: 1 }),
      mozjpeg({ quality: 75 }),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest("./public/img/"));
});

/*--------------------- JavaScript [jsmin] --------------------*/
gulp.task("jsmin", function() {
    gulp.src("./app/javascripts/*.js")
        .pipe(changed( 'jsmin' ))
        .pipe(plumber())
        .pipe(uglify())
        .pipe( rename({
          extname: '.min.js'
        }) )
        .pipe(gulp.dest("./public/js/"))
        .pipe(browser.reload({stream:true}))
});

/*--------------------- browser sync [server] --------------------*/
gulp.task("server", function() {
    browser({
        server: {
            baseDir: ["./public/"],
        },

         ghostMode: {
          location: true
        }
    });
});

/*--------------------- watch --------------------*/
gulp.task('watch', function () {
    gulp.watch(['./app/views/**/*.ejs','./app/views/partial/*.ejs'],['ejs']);
    gulp.watch("./app/**/*.scss", ['sass']);
    gulp.watch("./app/javascripts/*.js", ['jsmin']);
});

/*--------------------- default [gulp] --------------------*/
gulp.task('default', ['server' , 'watch' ,'imagemin' ,'ejs', 'sass'] );

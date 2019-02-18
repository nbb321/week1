var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var jsmin = require("gulp-uglify");
var css = require("gulp-clean-css");
var webserver = require("gulp-webserver");


//进行编译sass
gulp.task("sass", function() {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
});
//进行压缩css
gulp.task("css", function() {
    return gulp.src("./src/css/*.css")
        .pipe(css())
        .pipe(gulp.dest('./dist/css'))
});
//进行js合并并压缩
gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(concat())
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'))
});
//开启服务
gulp.task("webserver", function() {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            port: 8080,
            open: true
        }));
});
gulp.task("watch", function() {
    return gulp.watch("./src/sass/*.scss", gulp.series("sass"))
});
gulp.task("default", gulp.series("sass", "css", "webserver", "watch"));
gulp.task("build", gulp.parallel("sass", "css"));
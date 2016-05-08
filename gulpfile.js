var gulp = require("gulp");

// sass
gulp.task("sass", function() {
    var postcss = require("gulp-postcss");
    var autoprefixer = require("autoprefixer");
    var sass = require("gulp-sass");

    gulp.src("./css/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
        .pipe(gulp.dest("./css"));
});

// watch
gulp.task("watch", function() {
    gulp.watch("./css/*.scss", ["sass"]);
});

// default
gulp.task("default", ["sass", "watch"]);

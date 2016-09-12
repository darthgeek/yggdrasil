var gulp = require("gulp");
var sequence = require("gulp-sequence");

gulp.task("build:dev", function (cb) {
  sequence("webpack:dev", ["css", "font", "hbs"], cb);
});

gulp.task("build_dev", ["build:dev"]);
var config = require("../config");
var gulp = require("gulp");

gulp.task("font", function() {
  gulp.src(config.fontSource + "/**/*.*").pipe(gulp.dest(config.fontTarget));
});

var config = require("../config");
var gulp = require("gulp");

gulp.task("hbs", function () {
  gulp.src(config.hbsSource + "/**/*.*").pipe(gulp.dest(config.hbsTarget));
});

var config = require("../config");
var gulp = require("gulp");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");

gulp.task("pre-test", function () {
  return gulp.src([config.jsSource + "/**/*.js"])
      .pipe(istanbul())
      // Force `require` to return covered files
      .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], function () {
  return gulp.src([config.testSource + "/**/*.js"])
      .pipe(mocha())
      // Creating the reports after tests ran
      .pipe(istanbul.writeReports({dir: "build/coverage"}));
      // Enforce a coverage of at least 90%
      // .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}));
});

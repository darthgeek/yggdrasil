var config = require("../config");
var gulp = require("gulp");
var codacy = require("gulp-codacy");

gulp.task('codacy', function codacyTask() {
  return gulp.src([config.buildDir + '/coverage/lcov.info'])
      .pipe(codacy({
        token: process.env.codacyToken
      }))
      ;
});
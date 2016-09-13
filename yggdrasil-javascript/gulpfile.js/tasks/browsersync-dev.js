var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var config = require("../config");
var browserSync = require("browser-sync").create();

gulp.task("browsersync:refresh", ["webpack:dev"], function () {
  browserSync.reload();
});

gulp.task("browsersync:dev", ["webpack:dev"], function (cb) {
  browserSync.init({
    proxy: "http://localhost:8080"
  });

  var srcDirs = [
    config.jsSource + "/**/*",
    config.cssSource + "/**/*",
    config.fontSource + "/**/*",
    config.hbsSource + "/**/*"
  ];

  gutil.log("Running browsersync:dev - watching " + srcDirs);
  gulp.watch(srcDirs, ["browsersync:refresh"]);
});

gulp.task("browsersync_dev", ["browsersync:dev"]);

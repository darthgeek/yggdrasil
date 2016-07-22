var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var logger = require("../lib/compileLogger");
var config = require("../config/webpack")("development");

gulp.task("webpack:dev", function (cb) {
  var built = false;

  gutil.log("Running webpack:dev");

  var compiler = webpack(config, function (err, stats) {
    logger(err, stats);
    var jsonStats = stats.toJson();
    if (err || jsonStats.errors.length > 0) {
      process.exit(1);
      return;
    }

    if (!built) {
      gutil.log("webpack:dev complete");
      built = true;
      cb();
    }
  });
});

gulp.task("webpack_dev", ["webpack:dev"]);
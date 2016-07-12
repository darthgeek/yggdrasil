var config = require('../config');
var gulp = require('gulp');

gulp.task('css', function() {
  gulp.src(config.cssSource + '/**/*.*').pipe(gulp.dest(config.cssTarget));
});

// Process command line arguments
var task = "default", rootDir;
var args = process.argv.slice(2);
for (var i = 0; i < args.length; i++) {
  var item = args[i];
  switch (item) {
    case "--root-dir":
      rootDir = args[i + 1];
      break;
    case "--task":
      task = args[i + 1];
      break;
  }
}

// Include reuqired packages
var gulp = require("gulp");
var gutil = require("gulp-util");
var requireDir = require("require-dir");

process.env.rootDir = rootDir;

requireDir("./tasks", {
  recurse: true
});

if (task && task !== "null") {
  gutil.log("Running gulpfile task '" + task + "'");
  gulp.start(task);
}
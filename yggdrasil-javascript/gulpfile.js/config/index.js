var path = require("path");

var rootDir = path.normalize(process.env.rootDir);
var buildDir = path.join(rootDir, "build");
var assetsSrc = path.join(rootDir, "src/main/resources/META-INF/resources");
var resourcesTarget = path.join(buildDir, "resources/main");
var assetsTarget = path.join(resourcesTarget, "META-INF/resources");

var config = {
  buildDir: buildDir,
  jsSource: path.join(assetsSrc, "js"),
  vendorSource: path.join(assetsSrc, "js/vendor"),
  jsTarget: path.join(assetsTarget, "js"),
  testSource: path.join(assetsSrc, "testjs"),
  cssSource: path.join(assetsSrc, "css"),
  cssTarget: path.join(assetsTarget, "css"),
  fontSource: path.join(assetsSrc, "font"),
  fontTarget: path.join(assetsTarget, "font"),
  hbsSource: path.join(assetsSrc, "hbs"),
  hbsTarget: path.join(assetsTarget, "hbs"),
  classpathTarget: resourcesTarget
};

module.exports = config;

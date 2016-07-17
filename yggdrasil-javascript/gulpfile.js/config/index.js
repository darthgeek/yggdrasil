var path = require('path');

var rootDir = path.normalize(process.env.rootDir);
var buildDir = path.join(rootDir, 'build');
var assetsSrc = path.join(rootDir, 'src/main/resources/META-INF/resources');
var resourcesTarget = path.join(buildDir, 'resources/main');
var assetsTarget = path.join(resourcesTarget, 'META-INF/resources')

var config = {
  jsSource: path.join(assetsSrc, 'js'),
  jsTarget: path.join(assetsTarget, 'js'),
  cssSource: path.join(assetsSrc, 'css'),
  cssTarget: path.join(assetsTarget, 'css'),
  fontSource: path.join(assetsSrc, 'font'),
  fontTarget: path.join(assetsTarget, 'font'),
  classpathTarget: resourcesTarget,
  vendorSource: path.join(assetsTarget, 'vendor')
}

module.exports = config;
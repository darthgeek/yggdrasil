var log = require("lib/logger").getLogger("game/screen-metrics.js");

/**
 * Display orientation enumeration.
 * @type {{PORTRAIT: number, LANDSCAPE: number}}
 */
ScreenMetrics.Orientation = {
  PORTRAIT: 0,
  LANDSCAPE: 1
}

/**
 * Creates the screen metrics object.
 * @constructor
 */
function ScreenMetrics(defaultWidth, defaultHeight) {
  this.defaultWidth = defaultWidth || 1280;
  this.defaultHeight = defaultHeight || 800;
  this.defaultAspect = this.defaultWidth / this.defaultHeight;
  this.scaleX = 1.0;
  this.scaleY = 1.0;

  this.update();
};

/**
 * Updates the screen metrics based on the current window size.
 */
ScreenMetrics.prototype.update = function () {
  this.windowWidth = window.innerWidth;
  this.windowHeight = window.innerHeight;
  this.windowAspect = this.windowWidth / this.windowHeight;


  this.devicePixelRatio = window.devicePixelRatio;
  this.gameWidth = this.windowWidth * window.devicePixelRatio;
  this.gameHeight = this.windowHeight * window.devicePixelRatio;

  return this;
};

module.exports = ScreenMetrics;
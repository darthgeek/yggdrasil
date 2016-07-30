var _instance = {
  windowWidth: 0,
  windowHeight: 0,
  defaultGameWidth: 0,
  defaultGameHeight: 0,
  maxGameWidth: 0,
  maxGameHeight: 0,
  gameWidth: 0,
  gameHeight: 0,
  scaleX: 0,
  scaleY: 0,
  offsetX: 0,
  offsetY: 0
};

/**
 * Utilities for calculating window size and scaling factors.
 * @constructor
 */
function ScreenMetrics() {
  /**
   * Display orientation.
   * @type {{PORTRAIT: number, LANDSCAPE: number}}
   */
  this.Orientation = {
    PORTRAIT: 0,
    LANDSCAPE: 1
  };
};

/**
 * Gets the current screen metrics.
 * @returns {{windowWidth: number, windowHeight: number, defaultGameWidth: number, defaultGameHeight: number,
 *  maxGameWidth: number, maxGameHeight: number, gameWidth: number, gameHeight: number, scaleX: number, scaleY: number,
 *  offsetX: number, offsetY: number}}
 */
ScreenMetrics.prototype.get = function () {
  return _instance;
};

/**
 * Calculates screen metrics based on default game size, preferred orientation and optional maximum width and height.
 * @param defaultWidth
 * @param defaultHeight
 * @param orientation
 * @param maxWidth
 * @param maxHeight
 * @returns
 *    windowWidth: number,
 *    windowHeight: number,
 *    defaultGameWidth: number,
 *    defaultGameHeight: number,
 *    maxGameWidth: number,
 *    maxGameHeight: number,
 *    gameWidth: number,
 *    gameHeight: number,
 *    scaleX: number,
 *    scaleY: number,
 *    offsetX: number,
 *    offsetY: number
 *  }}
 */
ScreenMetrics.prototype.calculate = function (defaultWidth, defaultHeight, orientation, maxWidth, maxHeight) {
  if (!orientation) orientation = this.Orientation.LANDSCAPE;

  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  // swap if window dimensions do not match orientation
  if ((windowWidth < windowHeight && orientation === this.Orientation.LANDSCAPE) ||
      (windowHeight < windowWidth && orientation === this.Orientation.PORTRAIT)) {
    var tmp = windowWidth;
    windowWidth = windowHeight;
    windowHeight = tmp;
  }

  // calculate max game dimension. The bounds are iPad and iPhone
  if (!maxWidth || !maxHeight) {
    if (orientation === this.Orientation.LANDSCAPE) {
      maxWidth = Math.round(defaultWidth * 1420 / 1280);
      maxHeight = Math.round(defaultHeight * 960 / 800);
    } else {
      maxWidth = Math.round(defaultWidth * 960 / 800);
      maxHeight = Math.round(defaultHeight * 1420 / 1280);
    }
  }

  var defaultAspect = (orientation === this.Orientation.LANDSCAPE) ? 1280 / 800 : 800 / 1280;
  var windowAspect = windowWidth / windowHeight;

  var offsetX = 0;
  var offsetY = 0;
  var gameWidth = 0;
  var gameHeight = 0;

  // "iPhone" landscape ... and "iPad" portrait
  if (windowAspect > defaultAspect) {
    gameHeight = defaultHeight;
    gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
    gameWidth = Math.min(gameWidth, maxWidth);
    offsetX = (gameWidth - defaultWidth) / 2;
    offsetY = 0;
  } else {    // "iPad" landscpae ... and "iPhone" portrait
    gameWidth = defaultWidth;
    gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
    gameHeight = Math.min(gameHeight, maxHeight);
    offsetX = 0;
    offsetY = (gameHeight - defaultHeight) / 2;
  }

  // calculate scale
  var scaleX = windowWidth / gameWidth;
  var scaleY = windowHeight / gameHeight;

  _instance = {
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    defaultGameWidth: defaultWidth,
    defaultGameHeight: defaultHeight,
    maxGameWidth: maxWidth,
    maxGameHeight: maxHeight,
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    scaleX: scaleX,
    scaleY: scaleY,
    offsetX: offsetX,
    offsetY: offsetY
  };

  return _instance;
};

module.exports = new ScreenMetrics();

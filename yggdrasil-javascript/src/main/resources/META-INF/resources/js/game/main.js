var $ = require("jquery");
require("phaser-shim");
var log = require("../lib/logger").getLogger("game/main.js");
var stringify = require("json-stringify");
var DemoState = require("demo/demo-state.js");
var ScreenMetrics = require("game/screen-metrics.js");

/* global Phaser */

/**
 * Default options for the application.
 * @type {{width: number, height: number, gameDiv: string}}
 * @private
 */
var _defaultOpts = {
  /**
   * Default width of the game viewport.
   */
  width: 800,
  /**
   * Default height of the game viewport.
   */
  height: 500,
  /**
   * ID of the DOM element to embed the game viewport in.
   */
  gameDiv: "gameDiv"
};

/**
 * Main class for the game.
 * @param options
 * @returns {Main} instance of application
 * @constructor
 */
function Main(options) {
  this.opts = $.extend({}, _defaultOpts, options);
  this.screenMetrics = new ScreenMetrics(this.opts.width, this.opts.height);
  Phaser.Game.call(this, this.screenMetrics.gameWidth, this.screenMetrics.gameHeight, Phaser.AUTO, this.opts.gameDiv)

  this.state.add(DemoState.NAME, new DemoState());
}
Main.prototype = Object.create(Phaser.Game.prototype);


/**
 * Initializes the game and starts the boot sequence.
 */
Main.prototype.init = function () {
  log.info("starting initial game state");
  this.state.start(DemoState.NAME);
};

/**
 * CommonJS exports for this module.
 * @param opts options to pass to application constructor
 * @returns {Main}
 */
module.exports = function (opts) {
  return new Main(opts || {});
};

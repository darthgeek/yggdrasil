var $ = require("jquery");
require("phaser-shim");
var log = require("../lib/logger").getLogger("game/main.js");
var stringify = require("json-stringify");

var ScreenMetrics = require("./screen-metrics");

/*global Phaser */

/**
 * Options for the application.
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
 * Main application class.
 * @param opts configuration options for the application
 * @returns {Main} new instance of application
 * @constructor
 */
function Main(opts) {
  this._opts = $.extend({}, _defaultOpts, opts);

  var screenDims = ScreenMetrics.calculate(this._opts.width, this._opts.height, ScreenMetrics.LANDSCAPE);

  this.game = new Phaser.Game(screenDims.width, screenDims.height, Phaser.AUTO, this._opts.gameDiv);
  this.map = null;

  var _this = this;

  this.game.state.add("Demo", {
    preload: function () {
      log.info("[BOOT] preload");
      var screenDims = ScreenMetrics.get();
      this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
      this.scale.setResizeCallback(function(state) {
        var screenDims = ScreenMetrics.calculate(_this._opts.width, _this._opts.height, ScreenMetrics.LANDSCAPE);
        state.setUserScale(screenDims.scaleX, screenDims.scaleY);
      }, this);
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      if (!this.game.device.desktop) {
        this.scale.forceOrientation(true, false);
      }

      _this.game.load.tilemap("tilemap", "assets/simple-map.json", null, Phaser.Tilemap.TILED_JSON);
      _this.game.load.image("terrain", "assets/terrain.png");
    },
    create: function () {
      log.info("[BOOT] create");
      var map = _this.game.add.tilemap("tilemap");
      map.addTilesetImage("terrain", "terrain");
      var layer = map.createLayer("Dirt");
      layer.resizeWorld();
      map.createLayer("Grass");
      map.createLayer("Details");
      map.createLayer("Details 2");
    }
  });

  return this;
}

/**
 * Initializes the game and starts the boot sequence.
 */
Main.prototype.init = function () {
  log.info("starting boot state");
  this.game.state.start("Demo");
};

/**
 * CommonJS exports for this module.
 * @param opts options to pass to application constructor
 * @returns {Main}
 */
module.exports = function (opts) {
  return new Main(opts || {});
};


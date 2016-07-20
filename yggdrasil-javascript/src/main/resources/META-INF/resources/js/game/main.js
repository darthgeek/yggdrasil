var $ = require("jquery");
require("phaser-shim");
var log = require("../lib/logger").getLogger("game/main.js");

/*global Phaser */

/**
 * Options for the application.
 * @type {{width: number, height: number, gameDiv: string}}
 * @private
 */
var _defaultOpts = {
  /**
   * Width of the game viewport.
   */
  width: 640,
  /**
   * Height of the game viewport.
   */
  height: 580,
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
  var _opts = $.extend({}, _defaultOpts, opts);

  this.game = new Phaser.Game(_opts.width, _opts.height, Phaser.AUTO, _opts.gameDiv);

  var _this = this;

  // TODO - split game state initialization out to separate method/class
  this.game.state.add("Boot", {
    preload: function () {
      log.info("[BOOT] preload");
      // TODO - load booting assets
    },
    create: function () {
      log.info("[BOOT] create");
      _this.game.state.start("Preload");
    }
  });

  this.game.state.add("Preload", {
    preload: function () {
      log.info("[PRELOAD] preload");
      // TODO: load preload assets
    },
    create: function () {
      log.info("[PRELOAD] create");
      _this.game.state.start("Play");
    }
  });

  this.game.state.add("Play", {
    create: function () {
      log.info("[PLAY] create");
    }
  });

  return this;
}

/**
 * Initializes the game and starts the boot sequence.
 */
Main.prototype.init = function () {
  log.info("starting boot state");
  this.game.state.start("Boot");
};

/**
 * CommonJS exports for this module.
 * @param opts options to pass to application constructor
 * @returns {Main}
 */
module.exports = function (opts) {
  return new Main(opts || {});
};


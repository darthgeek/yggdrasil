require("phaser-shim");
var log = require("../lib/logger").getLogger("game/demo-state.js");
var stringify = require("json-stringify");

/* global Phaser */

/**
 * Creates the 'Demo' game state, used for POC and experimentation.
 * @param main application instance this game state belongs to
 * @constructor
 */
function DemoState(main) {
  this.main = main;
  this.name = 'Demo';

};
DemoState.prototype = new Phaser.State();

/**
 * Preloads assets required by the game state.
 */
DemoState.prototype.preload = function () {
  Phaser.State.call(this.preload);

  var _this = this;

  this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  this.main.screenMetrics.update();
  this.scale.setUserScale(this.main.screenMetrics.scaleX, this.main.screenMetrics.scaleY);

  log.debug("initial: " + stringify(this.main.screenMetrics));

  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  this.scale.setResizeCallback(function () {
    _this.main.screenMetrics.update();
    _this.scale.setUserScale(_this.main.screenMetrics.scaleX, _this.main.screenMetrics.scaleY);

    log.debug("resize: " + stringify(_this.main.screenMetrics));
  }, this);
  if (!this.game.device.desktop) {
    this.scale.forceOrientation(true, false);
  }

  this.cursors = this.game.input.keyboard.createCursorKeys();

  this.game.load.tilemap("tilemap", "assets/simple-map.json", null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image("terrain", "assets/terrain.png");
};

/**
 * Called after all assets are preloaded.
 */
DemoState.prototype.create = function () {
  Phaser.State.call(this.create);

  var map = this.game.add.tilemap("tilemap");
  map.addTilesetImage("terrain", "terrain");
  var layer = map.createLayer("Dirt");
  layer.resizeWorld();
  map.createLayer("Grass");
  map.createLayer("Details");
  map.createLayer("Details 2");
};

/**
 * Called on each game state update tick.
 */
DemoState.prototype.update = function () {
  if (this.cursors.up.isDown) {
    this.game.camera.y -= 4;
  } else if (this.cursors.down.isDown) {
    this.game.camera.y += 4;
  }

  if (this.cursors.left.isDown) {
    this.game.camera.x -= 4;
  } else if (this.cursors.right.isDown) {
    this.game.camera.x += 4;
  }
}

module.exports = DemoState;


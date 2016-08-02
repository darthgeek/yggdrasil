require("phaser-shim");
var log = require("../lib/logger").getLogger("game/demo-state.js");
var stringify = require("json-stringify");
var throttle = require('throttle-debounce/throttle');

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

  this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  this.main.screenMetrics.update();
  log.debug("initial: " + stringify(this.main.screenMetrics));

  this.game.camera.bounds = null;

  this.scale.setUserScale(this.main.screenMetrics.scaleX, this.main.screenMetrics.scaleY);
  this.scale.setGameSize(this.main.screenMetrics.windowWidth, this.main.screenMetrics.windowHeight);
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  if (!this.game.device.desktop) {
    this.scale.forceOrientation(true, false);
  }

  this.scale.setResizeCallback(function (scale, parentBounds) {
    var metrics = this.main.screenMetrics.update();
    scale.setUserScale(metrics.scaleX, metrics.scaleY);
    scale.setGameSize(metrics.windowWidth, metrics.windowHeight);
    scale.game.camera.setSize(metrics.windowWidth, metrics.windowHeight);

    this.updateLayerSizes();
  }, this);

  this.cursors = this.game.input.keyboard.createCursorKeys();

  this.game.load.tilemap("tilemap", "assets/simple-map.json", null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image("terrain", "assets/terrain.png");
};

/**
 * Resizes tilemap layers
 */
DemoState.prototype.updateLayerSizes = throttle(100, function () {
  var metrics = this.main.screenMetrics;
  $.each(this.layers, function (idx, layer) {
    layer.resize(metrics.windowWidth, metrics.windowHeight)
  });

  log.debug("resize: " + stringify(metrics));
});

/**
 * Called after all assets are preloaded.
 */
DemoState.prototype.create = function () {
  Phaser.State.call(this.create);

  var map = this.game.add.tilemap("tilemap");
  map.addTilesetImage("terrain", "terrain");
  this.layers = [];
  this.layers.push(map.createLayer("Dirt"));
  this.layers.push(map.createLayer("Grass"));
  this.layers.push(map.createLayer("Details"));
  this.layers.push(map.createLayer("Details 2"));
  this.layers[0].resizeWorld();
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


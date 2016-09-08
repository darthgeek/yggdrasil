require("phaser-shim");
var log = require("../lib/logger").getLogger("demo/demo-state.js");
var stringify = require("json-stringify");
var throttle = require("throttle-debounce/throttle");
var SystemMenu = require("game/system-menu.js");

/* global Phaser */

/**
 * Creates the 'Demo' game state, used for POC and experimentation.
 * @constructor
 */
function DemoState() {
};
DemoState.prototype = Object.create(Phaser.State.prototype);

DemoState.NAME = 'Demo';

/**
 * Preloads assets required by the game state.
 */
DemoState.prototype.preload = function () {
  Phaser.State.call(this.preload);

  var _scale = this.scale;
  var _game = this.game;

  _scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  _game.screenMetrics.update();

  _scale.setUserScale(_game.screenMetrics.scaleX, _game.screenMetrics.scaleY);
  _scale.setGameSize(_game.screenMetrics.gameWidth, _game.screenMetrics.gameHeight);
  _scale.pageAlignHorizontally = true;
  _scale.pageAlignVertically = true;
  if (!_game.device.desktop) {
    _scale.forceOrientation(true, false);
  }

  _scale.setResizeCallback(function (scale, parentBounds) {
    var metrics = _game.screenMetrics.update();
    scale.setUserScale(metrics.scaleX, metrics.scaleY);
    scale.setGameSize(metrics.gameWidth, metrics.gameHeight);
    scale.game.camera.setSize(metrics.gameWidth, metrics.gameHeight);

    this.updateLayerSizes();
  }, this);

  this.cursors = _game.input.keyboard.createCursorKeys();

  _game.load.tilemap("tilemap", "assets/medium-demo-map.json", null, Phaser.Tilemap.TILED_JSON);
  _game.load.image("terrain", "assets/terrain.png");

  _game.load.image("menuFrame", "assets/menuFrame.png");
  _game.load.spritesheet("menuButton", "assets/button.png", 252, 80);
};

/**
 * Resizes tilemap layers
 */
DemoState.prototype.updateLayerSizes = throttle(100, function () {
  var metrics = this.game.screenMetrics;
  $.each(this.layers, function (idx, layer) {
    layer.resize(metrics.gameWidth, metrics.gameHeight)
  });
});

/**
 * Called after all assets are preloaded.
 */
DemoState.prototype.create = function () {
  Phaser.State.call(this.create);

  var _game = this.game;

  var map = _game.add.tilemap("tilemap");
  map.addTilesetImage("terrain", "terrain");
  var _layers = this.layers = [];
  _layers.push(map.createLayer("Ground"));
  _layers.push(map.createLayer("Barriers"));
  _layers[0].resizeWorld();

  this.worldLayer = _game.add.group();
  this.uiLayer = _game.add.group();
  this.uiLayer.fixedToCamera = true;

  this.systemMenu = new SystemMenu(this.uiLayer, Phaser.Keyboard.ESC);
  this.systemMenu.addButton("Demo", this.onDemoButton, this);
};

/**
 * Called on each game state update tick.
 */
DemoState.prototype.update = function () {
  var _game = this.game;
  if (this.cursors.up.isDown) {
    _game.camera.y -= 4;
  } else if (this.cursors.down.isDown) {
    _game.camera.y += 4;
  }

  if (this.cursors.left.isDown) {
    _game.camera.x -= 4;
  } else if (this.cursors.right.isDown) {
    _game.camera.x += 4;
  }
};

/**
 * Handle te demo menu action.
 */
DemoState.prototype.onDemoButton = function () {
  log.info("Demo menu action chosen!");
};

module.exports = DemoState;


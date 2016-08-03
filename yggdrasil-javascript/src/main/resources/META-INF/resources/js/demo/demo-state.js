require("phaser-shim");
var log = require("../lib/logger").getLogger("demo/demo-state.js");
var stringify = require("json-stringify");
var throttle = require('throttle-debounce/throttle');

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
  _scale.setGameSize(_game.screenMetrics.windowWidth, _game.screenMetrics.windowHeight);
  _scale.pageAlignHorizontally = true;
  _scale.pageAlignVertically = true;
  if (!_game.device.desktop) {
    _scale.forceOrientation(true, false);
  }

  _scale.setResizeCallback(function (scale, parentBounds) {
    var metrics = _game.screenMetrics.update();
    scale.setUserScale(metrics.scaleX, metrics.scaleY);
    scale.setGameSize(metrics.windowWidth, metrics.windowHeight);
    scale.game.camera.setSize(metrics.windowWidth, metrics.windowHeight);

    if (this.menuFrame) {
      this.menuFrame.x = metrics.gameWidth / 2;
      this.menuFrame.y = metrics.gameHeight / 2;
    }

    this.updateLayerSizes();
  }, this);

  this.cursors = _game.input.keyboard.createCursorKeys();
  var escKey = _game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  escKey.onDown.add(this.onEscKey, this);

  _game.load.tilemap("tilemap", "assets/medium-demo-map.json", null, Phaser.Tilemap.TILED_JSON);
  _game.load.image("terrain", "assets/terrain.png");
  _game.load.image("menuFrame", "assets/menuFrame.png");
  _game.load.spritesheet("menuButton", "assets/button.png", 150, 39);
};

/**
 * Handles pressing of the ESC key.
 * @param key
 */
DemoState.prototype.onEscKey = function (key) {
  log.info("ESC key pressed");
  var metrics = this.game.screenMetrics;

  if (!this.menuFrame) {
    var _game = this.game;
    this.menuFrame = _game.add.group();
    this.uiLayer.add(this.menuFrame);

    var frame = this.menuFrame.create(0, 0, "menuFrame");
    frame.anchor.set(0.5);

    var button = _game.add.button(0, 0, "menuButton", this.onDemoButton, this, 0, 1, 2);
    button.anchor.set(0.5);
    this.menuFrame.add(button);

    var style = {
      font: "16px Arial",
      fontWeight: "Bold",
      fill: "#ffffff",
      align: "center"
    };
    var text = _game.add.text(0, 0, "Demo Action", style);
    text.anchor.set(0.45);
    this.menuFrame.add(text);

    this.menuFrame.x = metrics.gameWidth / 2;
    this.menuFrame.y = metrics.gameHeight / 2;
  } else {
    this.menuFrame.destroy();
    this.menuFrame = null;
  }
};

/**
 * Handle te demo menu action.
 */
DemoState.prototype.onDemoButton = function () {
  log.info("Demo menu action chosen!");
  if (this.menuFrame) {
    this.menuFrame.destroy();
    this.menuFrame = null;
  }
};

/**
 * Resizes tilemap layers
 */
DemoState.prototype.updateLayerSizes = throttle(100, function () {
  var metrics = this.game.screenMetrics;
  $.each(this.layers, function (idx, layer) {
    layer.resize(metrics.windowWidth, metrics.windowHeight)
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
}

module.exports = DemoState;


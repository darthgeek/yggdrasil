require("phaser-shim");
var log = require("lib/logger").getLogger("game/game-active-state.js");
var throttle = require("throttle-debounce/throttle");
var SystemMenu = require("game/system-menu.js");
$ = require("jquery");
require("jquery-ui");

GameActiveState.NAME = 'Game';

/* global Phaser */

/**
 * Creates the 'GameActive' game state, which governs normal game play while logged in.
 * @constructor
 */
function GameActiveState() {
}
GameActiveState.prototype = Object.create(Phaser.State.prototype);

GameActiveState.NAME = 'Active';

/**
 * Preloads assets required by the game state.
 */
GameActiveState.prototype.preload = function () {
  Phaser.State.call(this.preload);

  log.debug("GameActiveState:preload");

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
};

/**
 * Called after all assets are preloaded.
 */
GameActiveState.prototype.create = function () {
  Phaser.State.call(this.create);

  log.debug("GameActiveState:create");

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

  this.systemMenu = new SystemMenu(_game, Phaser.Keyboard.ESC);
};

/**
 * Resizes tilemap layers
 */
GameActiveState.prototype.updateLayerSizes = throttle(100, function () {
  var metrics = this.game.screenMetrics;
  $.each(this.layers, function (idx, layer) {
    layer.resize(metrics.gameWidth, metrics.gameHeight)
  });
});

/**
 * Called on each game state update tick.
 */
GameActiveState.prototype.update = function () {
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


module.exports = GameActiveState;
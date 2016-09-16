require("phaser-shim");
var log = require("lib/logger").getLogger("game/loading-state.js");
var GameActiveState = require("game/game-active-state");
var GameAssets = require("game/game-assets")

LoadingState.NAME = "Loading";

/* global Phaser */

/**
 * Creates the "Loading" game state, which pre-loads game assets.
 * @constructor
 */
function LoadingState() {
}
LoadingState.prototype = Object.create(Phaser.State.prototype);

LoadingState.NAME = "Loading";

/**
 * Preloads assets required by the game state.
 */
LoadingState.prototype.preload = function () {
  Phaser.State.call(this.preload);

  var _game = this.game
  var style = {font: "24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
  this.loadingText = _game.add.text(0, 0, "...", style);
  this.loadingText.setTextBounds(0, 0, _game.screenMetrics.windowWidth, _game.screenMetrics.windowHeight);

  _game.load.onLoadStart.add(function () {
    this.loadingText.setText("loading...");
  }, this);
  _game.load.onLoadComplete.add(function () {
    this.loadingText.setText("load complete");
  }, this);
  _game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText("loading... " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  }, this);

  GameAssets.forEach(function (asset) {
    asset.load(_game.load);
  });

  _game.load.start();

  log.debug("LoadingState:preload");
};

/**
 * Called after all assets are preloaded.
 */
LoadingState.prototype.create = function () {
  Phaser.State.call(this.create);

  log.debug("LoadingState:create");

  var _game = this.game;
  _game.state.start(GameActiveState.NAME);
};

module.exports = LoadingState;

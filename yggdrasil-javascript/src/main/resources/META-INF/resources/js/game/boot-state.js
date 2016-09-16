require("phaser-shim");
var log = require("lib/logger").getLogger("game/boot-state.js");
var LoadingState = require("game/loading-state.js");

BootState.NAME = 'Boot';

/* global Phaser */

/**
 * Creates the 'Boot' game state, which performs very lightweight initial setup and kicks off the loading state.
 * @constructor
 */
function BootState() {
}
BootState.prototype = Object.create(Phaser.State.prototype);

BootState.NAME = 'Boot';

/**
 * Called after all assets are preloaded.
 */
BootState.prototype.create = function () {
  Phaser.State.call(this.create);

  log.debug("BootState:create");

  var _game = this.game;
  _game.physics.startSystem(Phaser.Physics.ARCADE);

  _game.state.start(LoadingState.NAME);
};

module.exports = BootState;

require("phaser-shim");
var log = require("../lib/logger").getLogger("game/system-menu.js");

/**
 * Creates the system menu.
 * @param group UI layer sprite group
 * @param key keycode to toggle the system menu (defaults to ESC)
 * @constructor
 */
function SystemMenu(group, key) {
  this.group = group;
  var keyCode = key || Phaser.KeyCode.ESC;

  var _game = this.group.game;
  var _metrics = _game.screenMetrics;

  var menuKey = _game.input.keyboard.addKey(keyCode);
  menuKey.onDown.add(this.onMenuToggle, this);

  this.menuFrameGroup = _game.add.group();
  group.add(this.menuFrameGroup);
  this.menuFrameGroup.visible = false;

  var frame = this.menuFrameGroup.create(0, 0, "menuFrame");
  frame.anchor.set(0.5);
  this.menuFrameGroup.x = _metrics.gameWidth / 2;
  this.menuFrameGroup.y = _metrics.gameHeight / 2;
}

/**
 * Handles the menu toggle event.
 */
SystemMenu.prototype.onMenuToggle = function () {
  log.info("System menu toggle");
  var _metrics = this.group.game.screenMetrics;
  this.menuFrameGroup.visible = !this.menuFrameGroup.visible;
};

/**
 * Creates a new button on the system menu.
 * @param label Label to use for the button
 * @param cb callback when button is pressed
 * @param ctx context for the button press callback
 */
SystemMenu.prototype.addButton = function (label, cb, ctx) {
  var _game = this.group.game;
  var _menuFrameGroup = this.menuFrameGroup;

  var button = _game.add.button(0, 0, "menuButton", function () {
    _menuFrameGroup.visible = false;
    cb();
  }, ctx, 1, 2, 0);
  button.anchor.set(0.5);
  _menuFrameGroup.add(button);

  var style = {
    font: "16px Arial",
    fontWeight: "Bold",
    fill: "#000000",
    align: "center"
  };
  var text = _game.add.text(0, 0, label, style);
  text.anchor.set(0.45);
  _menuFrameGroup.add(text);
};

module.exports = SystemMenu;
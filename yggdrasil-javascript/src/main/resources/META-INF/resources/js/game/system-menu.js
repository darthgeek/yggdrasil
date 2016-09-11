require("phaser-shim");
var log = require("lib/logger").getLogger("game/system-menu.js");

/**
 * Default skin configuration for the system menu.
 *
 * @type {{frameImage: string,
 *         titleStyle: {},
 *         buttonImage: string,
 *         buttonStyle: {}}}
 * @private
 */
var _defaultSkin = {
  /** Name of image asset for the menu frame. */
  frameImage: "menuFrame",
  /** Name of spritesheet asset for menu button.  0 = DOWN, 1 = OVER, 2 = OUT */
  buttonSprite: "menuButton",

  /** Style for button text. */
  buttonStyle: {
    font: "16px Arial",
    fontWeight: "Bold",
    fill: "#000000",
    align: "center"
  },
  /** Bounds of the button box as insets from the menu frame plus inter-button spacing. */
  buttonBox: {
    marginLeft: 22,
    marginRight: 22,
    marginTop: 100,
    marginBottom: 24,
    spacing: -10
  }
};

/**
 * Creates the system menu.
 * @param group UI layer sprite group
 * @param key keycode to toggle the system menu (defaults to ESC)
 * @param skin textures and metrics for the system menu skin
 * @constructor
 */
function SystemMenu(group, key, skin) {
  this.group = group;
  this.skin = $.extend({}, _defaultSkin, skin);
  this.buttons = [];

  var keyCode = key || Phaser.KeyCode.ESC;

  var _game = this.group.game;

  var menuKey = _game.input.keyboard.addKey(keyCode);
  menuKey.onDown.add(this.onMenuToggle, this);

  this.menuFrameGroup = _game.add.group();
  group.add(this.menuFrameGroup);
  this.menuFrameGroup.visible = false;

  this.menuFrame = this.menuFrameGroup.create(0, 0, this.skin.frameImage);

  var frameData = _game.cache.getImage(this.skin.frameImage);
  var buttonData = _game.cache.getFrameByIndex(this.skin.buttonSprite, 0);
  this.metrics = {
    frame: {
      width: frameData.width,
      height: frameData.height
    },
    button: {
      width: buttonData.width,
      height: buttonData.height
    }
  };
}

/** Global counter for auto-generated button IDs. */
SystemMenu.ID_COUNTER = 1;

/**
 * Handles the menu toggle event.
 */
SystemMenu.prototype.onMenuToggle = function () {
  log.debug("System menu toggle");
  var _screenMetrics = this.group.game.screenMetrics;

  if (!this.menuFrameGroup.visible) {
    this.menuFrameGroup.x = (_screenMetrics.windowWidth - this.metrics.frame.width) / 2;
    this.menuFrameGroup.y = (_screenMetrics.windowHeight - this.metrics.frame.height) / 2;
  }
  this.menuFrameGroup.visible = !this.menuFrameGroup.visible;
};

/**
 * Creates a new button on the system menu.
 * @param label button text to display
 * @param cb callback when button is pressed
 * @param ctx context for the button press callback
 * @param id id for button
 * @return {Phaser.Button} button object
 */
SystemMenu.prototype.addButton = function (label, cb, ctx, id) {
  var _game = this.group.game;

  var _cb = (typeof cb === 'function') ? cb : function () {
    log.warn("no callback registered for button: id " + id);
  };

  var _menuFrameGroup = this.menuFrameGroup;
  var button = _game.add.button(0, 0, this.skin.buttonSprite, function () {
    _menuFrameGroup.visible = false;
    _cb();
  }, ctx, 1, 2, 0);
  button.forceOut = true;
  this.menuFrame.addChild(button);

  var text = _game.add.text(0, 0, label, this.skin.buttonStyle);
  text.anchor.x = 0.5;
  text.anchor.y = 0.4;
  text.x = this.metrics.button.width / 2;
  text.y = this.metrics.button.height / 2;
  button.addChild(text);

  this.buttons.push(button);
  this.layoutButtons();

  return button;
};

/**
 * Recalculates layout for the current set of button sprites.
 */
SystemMenu.prototype.layoutButtons = function () {
  var bbLeftM = this.skin.buttonBox.marginLeft;
  var bbRightM = this.skin.buttonBox.marginRight;
  var bbTopM = this.skin.buttonBox.marginTop;
  var fWidth = this.metrics.frame.width
  var bbSpacing = this.skin.buttonBox.spacing;
  var bHeight = this.metrics.button.height;
  var bWidth = this.metrics.button.width;

  for (var i = 0; i < this.buttons.length; i++) {
    var button = this.buttons[i];
    button.x = (bbLeftM + fWidth - bbRightM - bWidth) / 2;
    button.y = i * (bHeight + bbSpacing) + bbTopM;
  }
};

module.exports = SystemMenu;
require("phaser-shim");
var log = require("lib/logger").getLogger("game/system-menu.js");
var stringify = require("json-stringify-safe");
var menuItem = require("../../hbs/menu-item.hbs")


/**
 * Configures the system menu.
 * @param game Phaser game object
 * @param key keycode to toggle the system menu (defaults to ESC)
 * @constructor
 */
function SystemMenu(game, key) {
  var _this = this;
  var keyCode = key || Phaser.KeyCode.ESC;

  this.game = game;
  var menuKey = this.game.input.keyboard.addKey(keyCode);
  menuKey.onDown.add(this.onMenuToggle, this);

  // TODO: check for admin permission to display menu item
  this.addMenu("admin-menu", "Admin", "fa fa-lock", function (ev, elem) {
    // TODO: open admin control panel
  });

  this.addMenu("settings-menu", "Settings", "fa fa-gear", function (ev, elem) {
    // TODO: open user settings panel
  });

  this.addMenu("logout-menu", "Logout", "fa fa-power-off", function (ev, elem) {
    $("#logout-form").submit();
  });
}

/**
 * Handles the menu toggle event.
 */
SystemMenu.prototype.onMenuToggle = function () {
  log.debug("System menu toggle");
  $("#system-menu").toggle("slide", {direction: "right"});
};

/**
 * Adds a menu item to the system menu.
 * @param id DOM id for the menu item
 * @param label display text for the menu item
 * @param icon CSS class for menu item icon span
 * @param cb callback when menu item is pressed
 */
SystemMenu.prototype.addMenu = function (id, label, icon, cb) {
  $("#system-menu").find("ul").append(menuItem({
    id: id,
    icon: icon,
    label: label
  }));
  var menuEl = $("#" + id);
  menuEl.find('a').click(function (ev) {
    log.info("Menu item " + id + " (" + label + ") selected");
    var _cb = (typeof cb === 'function') ? cb : function () {
    };
    var blinkMs = 75;
    $(ev.target).blur()
        .fadeOut(blinkMs)
        .fadeIn(blinkMs)
        .fadeOut(blinkMs)
        .fadeIn(blinkMs,
            function () {
              _cb(ev, menuEl)
            });
  });

}

module.exports = SystemMenu;
require("phaser-shim");
var log = require("lib/logger").getLogger("game/system-menu.js");
var stringify = require("json-stringify-safe");
var menuItem = require("../../hbs/menu-item.hbs");
var errorPanel = require("../../hbs/error-panel.hbs");
var security = require("lib/security");
var util = require("lib/utils");
var $ = require("jquery");
var _ = require("underscore");
var Dashboard = require("page/admin/dashboard");

/**
 * Configures the system menu.
 * @param game Phaser game object
 * @param key keycode to toggle the system menu (defaults to ESC)
 * @constructor
 */
function SystemMenu(game, key) {
  this.systemPanel = null;

  var _this = this;
  var keyCode = key || Phaser.KeyCode.ESC;

  this.game = game;
  var menuKey = this.game.input.keyboard.addKey(keyCode);
  menuKey.onDown.add(this.onMenuToggle, this);

  if (security.hasPermission("PERM_ADMIN")) {
    this.addMenu("admin-menu", "Admin", "fa fa-lock", function (ev, elem) {
      _this.openSystemPanel(util.url("api/systemPanel/admin/dashboard"),
          function () {
            _this.systemPanel = new Dashboard();
          });
    });
  }

  this.addMenu("settings-menu", "Settings", "fa fa-gear", function (ev, elem) {
    _this.openSystemPanel(util.url("api/systemPanel/settings"));
  });

  this.addMenu("logout-menu", "Logout", "fa fa-power-off", function (ev, elem) {
    $("#logout-form").submit();
  });

  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.async = true;
  });
}

/**
 * Handles the menu toggle event.
 */
SystemMenu.prototype.onMenuToggle = function () {
  log.debug("System menu toggle");
  var panel = $("#system-panel");

  if (panel.is(":visible")) {
    panel.hide("slide", {direction: "right"});
  } else {
    $("#system-menu").toggle("slide", {direction: "right"});
  }
};

/**
 * Opens the system panel with the appropriate contents loaded.
 * @param url URL to system panel contents
 * @param cb optional callback when panel is loaded
 */
SystemMenu.prototype.openSystemPanel = function (url, cb) {
  var _cb = (typeof cb === "function") ? cb : function () {
  };

  $.get({
    url: url,
    dataType: "html",
    ifModified: true,
    timeout: 5000,
    success: function (content) {
      var d = document.createElement("div");
      d.innerHTML = content;

      var panel = $("#system-panel");
      panel.empty();
      panel.append($(d).find(".embedded"));
      $(panel).ready(function () {
        _cb();
      });
    }
  }).fail(function (xhr, status, error) {
    var html;
    if (xhr.status === 0) {
      html = errorPanel(
          {
            status: xhr.status,
            summary: "Request timed out",
            details: "The application timed out trying to load the system panel " + url + ": " + error
          });
    } else {
      html = errorPanel(
          {
            status: xhr.status,
            summary: xhr.statusText,
            details: "There was an error loading the system panel " + url + ": " + error
          });
    }
    $("#system-panel").html(html);
  }).complete(function () {
    $("#system-menu").hide("slide", {direction: "right"});
    $("#system-panel").toggle("slide", {direction: "right"});
  });
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
  menuEl.find("a").click(function (ev) {
    log.info("Menu item " + id + " (" + label + ") selected");
    var _cb = (typeof cb === "function") ? cb : function () {
    };
    var blinkMs = 75;
    $(ev.target).blur()
        .fadeOut(blinkMs)
        .fadeIn(blinkMs)
        .fadeOut(blinkMs)
        .fadeIn(blinkMs,
            function () {
              _cb(ev, menuEl);
            });
  });
};

module.exports = SystemMenu;
require("../lib/common.js");
var log = require("../lib/logger").getLogger("page/game-sandbox.js");
var Main = require("../game/main.js");

/**
 * Page specific functionality.
 * @constructor
 */
function Page() {
  this.main = new Main();

  var _this = this;
  $(function () {
    _this.init();
  });
}

/**
 * Initializes the page after DOM ready.
 */
Page.prototype.init = function () {
  log.info("Initializing game engine...");
  this.main.init();
};

window.page = new Page();
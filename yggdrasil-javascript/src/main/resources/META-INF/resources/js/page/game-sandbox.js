require("../lib/common.js");
var log = require("../lib/logger").getLogger("page/home.js");
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
  log.info("Starting game instance");
  this.main.init();
};

window.page = new Page();

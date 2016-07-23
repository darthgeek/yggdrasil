/**
 * Created by jason on 7/21/2016.
 */
require("../lib/common.js");
var log = require("../lib/logger").getLogger("page/basic.js");

/**
 * Page specific functionality.
 * @constructor
 */
function Page() {
  var _this = this;
  $(function () {
    _this.init();
  });
}

/**
 * Initializes the page after DOM ready.
 */
Page.prototype.init = function () {
  log.info("Page loaded");
}

window.page = new Page();
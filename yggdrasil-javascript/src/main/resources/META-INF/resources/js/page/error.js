/**
 * Created by jason on 7/21/2016.
 */
require("../lib/common.js");
var modernizer = require("modernizr");
var log = require("../lib/logger").getLogger("page/error.js");

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

  // Strip the query string off the address bar
  if (modernizer.history) {
    history.pushState(null, "", location.href.split("?")[0]);
  }
};

window.page = new Page();
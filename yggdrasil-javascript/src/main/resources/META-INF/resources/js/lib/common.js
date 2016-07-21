/* global __webpack_public_path__ */

if (typeof window != 'undefined') {
//noinspection JSAnnotator
  __webpack_public_path__ = window._contextPath + "js/"; // eslint-disable-line camelcase

  var $ = window["jQuery"] = window.jquery = require("jquery");

  require("bootstrap");
  require("bootstrap/dist/css/bootstrap.css");

  require("font-awesome/css/font-awesome.min.css");
  require("ionicons/dist/css/ionicons.min.css");
}

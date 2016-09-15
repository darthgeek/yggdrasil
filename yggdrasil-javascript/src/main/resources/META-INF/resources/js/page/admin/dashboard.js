require("lib/common");
var log = require("lib/logger").getLogger("page/admin/dashboard.js");
require("datatables.net");
require("datatables.net-bs");
require("datatables.net-bs/css/dataTables.bootstrap.css");

/**
 * Page specific functionality.
 * @constructor
 */
function Dashboard() {
  var _this = this;
  $(function () {
    _this.init();
  });
}

/**
 * Initializes the page after DOM ready.
 */
Dashboard.prototype.init = function () {
  log.info("Dashboard loaded");

  var table = $("#userManagementTable");
  table.DataTable();

  $("[data-toggle='tooltip']").tooltip();
};

module.exports = Dashboard;

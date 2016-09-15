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
  var dataTable = table.DataTable({
    "lengthChange": false,
    "pageLength": 50,
    "autoWidth": false,
    "order": [[2, "desc"]],
    "dom": '<"add-user-button"><"search-users">rtip',
    "responsive": true,
    "columnDefs": [
      {"targets": 0, "orderable": false, "width": "50px"},
      {"targets": 1, "orderable": false, "width": "10px"},
      {"targets": 4, "width": "90px"},
      {"targets": 5, "orderable": false, "width": "20px"}
    ]
  });

  $("div.search-users").html('<input type="text" class="form-control" placeholder="Search" length="10">');
  $("div.add-user-button").html('<a href="javascript:void(0)" class="btn btn-sm btn-info pull-left">' +
      '<i class="fa fa-user-plus"></i> Add User</a>');

  $('div.search-users > input').keyup(function () {
    dataTable.search($(this).val()).draw();
  });

  $("[data-toggle='tooltip']").tooltip();
};

module.exports = Dashboard;

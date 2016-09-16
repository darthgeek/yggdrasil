require("lib/common");
var log = require("lib/logger").getLogger("page/admin/dashboard.js");
var stringify = require("json-stringify-safe");
var Backbone = require("backbone");
var _ = require("underscore");
var dateformat = require("dateformat");
var icon = require("../../../hbs/icon.hbs");
var userPopupMenu = require("../../../hbs/user-popup-menu.hbs");
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
  var dataTable = table.DataTable({  // eslint-disable-line new-cap
    "lengthChange": false,
    "pageLength": 50,
    "autoWidth": false,
    "order": [[2, "desc"]],
    "dom": "<,add-user-button,><,search-users,>rtip",
    "columnDefs": [
      {
        "targets": 0,
        "orderable": false,
        "width": "20px",
        "data": null,
        "className": "text-nowrap",
        "render": function (data, type, full, meta) {
          var cell = "";
          if (_.contains(data.roles, "ADMIN")) {
            cell += icon({iconClass: "fa fa-key admin-icon", toolTip: "Administrator"});
          }
          return cell;
        }
      },
      {
        "targets": 1,
        "orderable": false,
        "width": "10px",
        "data": null,
        "className": "text-nowrap",
        "render": function (data, type, full, meta) {
          if (data.online) {
            return icon({iconClass: "fa fa-circle online-icon", toolTip: "User is online"});
          } else {
            return icon({iconClass: "fa fa-circle-o offline-icon", toolTip: "User is offline"});
          }
        }
      },
      {
        "targets": 2,
        "data": null,
        "render": function (data, type, full, meta) {
          var cell = "";
          switch (data.accountType) {
            case "LOCAL":
              cell += icon({iconClass: "fa fa-database online-icon", toolTip: "Local account"});
              break;
            case "GOOGLE":
              cell += icon({iconClass: "fa fa-google account-icon", toolTip: "Google account"});
              break;
          }
          cell += " " + data.username;
          return cell;
        }
      },
      {
        "targets": 3,
        "data": null,
        "render": function (data, type, full, meta) {
          return "<a href='mailto:" + data.email + "'>" + data.email + "</a>";
        }
      },
      {
        "targets": 4,
        "width": "90px",
        "className": "text-nowrap",
        "data": null,
        "render": function (data, type, full, meta) {
          var createdDate = new Date(data.createdTime);
          return dateformat(createdDate, "h:MM TT mmm dS yyyy");
        }
      },
      {
        "targets": 5,
        "orderable": false,
        "width": "20px",
        "data": null,
        "render": function (data, type, full, meta) {
          return userPopupMenu({userId: data.id});
        }
      }
    ]
  });

  // TODO - refactor user out to it's own module
  var apiUrl = window._contextPath + "/api/user";
  if (apiUrl.startsWith("/")) {
    apiUrl = apiUrl.substr(1);
  }

  this.Users = Backbone.Collection.extend({url: apiUrl});
  this.users = new this.Users();
  this.users.fetch({
    success: function (collection, response, options) {
      var users = collection.toJSON();
      log.info("loaded " + users.length + " users");
      dataTable.rows.add(users);
      var onlineUsers = _.filter(users, function (user) {
        return user.online;
      });
      $("#total-user-count").html(users.length);
      $("#online-user-count").html(onlineUsers.length);
      dataTable.draw();
    }
  });

  $("div.search-users").html("<input type='text' class='form-control' placeholder='Search' length='10'>");
  $("div.add-user-button").html("<a href='javascript:void(0)' class='btn btn-sm btn-default pull-left'>" +
      "<i class='fa fa-user-plus'></i> Add User</a>");

  $("div.search-users > input").keyup(function () {
    dataTable.search($(this).val()).draw();
  });

  $("[data-toggle='tooltip']").tooltip();
};

module.exports = Dashboard;

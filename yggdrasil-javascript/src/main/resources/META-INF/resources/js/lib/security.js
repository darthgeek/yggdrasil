_ = require("underscore");

function Security() {
  this.user = window._user;
  this.permissions = window._permissions;
}

Security.prototype.hasPermission = function (perm) {
  return _.contains(this.permissions, perm);
}

module.exports = new Security();
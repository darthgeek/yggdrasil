_ = require("underscore");

/**
 * Security context holder for client side.
 * @constructor
 */
function Security() {
  this.user = window._user;
  this.permissions = window._permissions;
}

/**
 * Determines if user has a particular permission.
 * @param perm permission to check
 */
Security.prototype.hasPermission = function (perm) {
  return _.contains(this.permissions, perm);
}

module.exports = new Security();
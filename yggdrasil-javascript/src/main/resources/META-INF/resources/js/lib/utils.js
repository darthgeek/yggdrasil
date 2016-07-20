require("date-util");
var $ = require("jquery");
var _ = require("underscore");

/**
 * Contains static utility methods used throughout application.
 * @type {{}}
 */
var Utils = { };

/**
 * Simple convenience method used to throw an Error with the given message. Allows the use of the paradigm:
 *
 * var e = init.prop || Utils.die("prop must be provided");
 *
 * @param message   error message
 */
Utils.die = function (message) {
  throw new Error(message);
};

/**
 * Is called to format raw date value as formatted date string.
 *
 * @param {string|number|Date} date     either a Date, a timestamp string or millis-since-epoch value
 * @param [format]                      optional format string (if none provided, uses "mm/dd/yyyy hh:MM TT")
 * @param {boolean} utc                 format as UTC date.
 *
 * @return {string}                     formatted date string
 */
Utils.formatDate = function(date, format, utc) {
  if (!date) {
    return "";
  }
  if (typeof date == "string" && /^\s+$/.test(date)) {
    return "";
  }
  format = format || "mm/dd/yyyy hh:MM TT";

  // date may be a string representation of millis-since-epoch, or a standard timestamp format

  // first, check if its a timestamp
  var dateObj = new Date(date);

  // if not a valid date, try it as a timestamp
  if (isNaN(dateObj.getMilliseconds())) {
    dateObj = parseInt(date);
    dateObj = new Date(dateObj);
  }
  //noinspection UnnecessaryLocalVariableJS
  var formatted = dateObj.format(format, utc); // ex. 05/09/2015 10:14 PM

  return formatted;
};

/**
 * Is called to format raw date value as formatted date string.
 *
 * @param {string|number|Date} date     either a Date, a timestamp string or millis-since-epoch value
 * @param [format]                      optional format string (if none provided, uses "mm/dd/yyyy hh:MM TT")
 * @param {boolean} useBrowserTz        Use the browser timezone when converting dates. Else, it defaults to UTC.
 *
 * @return {string}                     formatted date string
 */
Utils.formatUtcDate = function(date, format) {
  return Utils.formatDate(date, format, true)
};

/**
 * Returns the query string value for the given param name. Returns null if none found.
 *
 * @param name
 *
 * @return {string}                 query string param value
 */
Utils.getParam = function(name) {
  var qry = window.location.search;
  if (!qry) {
    return null;
  }
  qry = qry.substring(1);
  var comps = qry.split("&");
  for (var i = 0; i < comps.length; i++) {
    var nvp = comps[i].split("=");
    var n = nvp[0], v = decodeURIComponent(nvp[1]);
    if (n === name) {
      return v;
    }
  }
  return null;
};

module.exports = Utils;

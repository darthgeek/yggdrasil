require("date-util");
var $ = require("jquery");
var _ = require("underscore");

/**
 * Contains static utility methods used throughout application.
 * @type {{}}
 */
var Utils = { };

/**
 * Is called to format raw date value as formatted date string.
 *
 * @param {string|number|Date} date     either a Date, a timestamp string or millis-since-epoch value
 * @param [format]                      optional format string (if none provided, uses "mm/dd/yyyy hh:MM TT")
 * @param {boolean} utc                 format as UTC date.
 *
 * @return {string}                     formatted date string
 */
Utils.formatDate = function(date, format, utc) { // eslint-disable-line complexity
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
  return Utils.formatDate(date, format, true);
};

module.exports = Utils;

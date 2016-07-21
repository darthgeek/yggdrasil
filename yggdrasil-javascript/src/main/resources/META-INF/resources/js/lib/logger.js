var $ = require("jquery");
var Utils = require("./utils");
var url = require("url");

function LogFactory() {
  /**
   * Mapping of logger names to Logger instances.
   * @type {{}}
   * @private
   */
  this._cache = {};
}

LogFactory.prototype = {};

var Logger = function(name, level) { };

if (typeof window != "undefined") {
  var BRAGI = require("bragi-browser");

  /**
   * Logger object that wraps Bragi logging in an API that is similar to log4j.
   *
   * @param name
   * @param [level]
   * @constructor
   */
  Logger = function(name, level) {
    level = level || url.parse(window.location.search, true).query["logLevel"];
    level = Logger.LEVELS.get(level);

    /**
     * Name of logger (is prefixed to all log statements).
     */
    this._name = name;
    /**
     * LEVELS object specifying granularity of logging.
     *
     * @type {string|*}
     * @private
     */
    this._level = level || Logger.LEVELS.ERROR;

    // -------------------------------------------------------------
    // init based on level
    var logger = this;
    var disabled = [];
    $.each(Logger.LEVELS, function (nm, level) {
      var logLevel = level.level;
      if (logLevel > logger._level.level) {
        disabled.push(level.group);
      }
    });
    // create a blacklist
    BRAGI.options.groupsEnabled = true;
    BRAGI.options.groupsDisabled = disabled;
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    BRAGI.transports.get("console").property("showMeta", false);
  };

// LEVELS objects have a name (corresponding with Logger method name) and a group name (corresponding with Bragi logger group)...
// this allows method names to vary independently of Bragi logging
  Logger.LEVELS = {
    TRACE: {
      name: "trace",
      group: "trace",
      level: 6
    },
    DEBUG: {
      name: "debug",
      group: "debug",
      level: 5
    },
    INFO: {
      name: "info",
      group: "info",
      level: 4
    },
    WARN: {
      name: "warn",
      group: "warn",
      level: 3
    },
    ERROR: {
      name: "error",
      group: "error",
      level: 2
    },
    FATAL: {
      name: "fatal",
      group: "fatal",
      level: 1
    }
  };
  /**
   * Gets the LEVELS object with the given name. Returns null if none found.
   *
   * @param name
   * @return {*}
   */
  Logger.LEVELS.get = function (name) {
    if (!name) {
      return null;
    }
    name = name.toLowerCase();

    var level = null;
    $.each(Logger.LEVELS, function (nm, levelObj) {
      if (levelObj.name === name) {
        level = levelObj;
      }
    });
    return level;
  };

// add all LEVELS as methods on Logger class
  $.each(Logger.LEVELS, function (nm, level) {
    var methodName = level.name;
    var groupName = level.group;

    /**
     * Logs message if instance has been configured for the level this method represents (will ignore call otherwise).
     *
     * @param {string} msg      the message to log
     * @param {*} [args]        optional additional args to provide (i.e. may be an Error object in which case a stacktrace will be shown)
     */
    Logger.prototype[methodName] = function (msg, args) {
      if (typeof msg == "string") {
        msg = msg;
      } else if (msg instanceof Error) {
        //noinspection JSUnresolvedVariable
        msg = msg.message;
        args = msg; // will show error stacktrace
      }
      var date = Utils.formatDate(new Date(), "hh:MM:ss");
      msg = date + " - " + this._name + ": " + msg;
      if (args) {
        BRAGI.log(groupName, msg, args);
      } else {
        BRAGI.log(groupName, msg);
      }
    };
  });

  /**
   * Creates and/or gets Logger for given name.
   *
   * @param name
   * @param [level] level     if provided, will init Logger at given Log Level
   * @return {Logger}
   */
  LogFactory.prototype.getLogger = function (name, level) {
    if (!name) { throw new Error("name is required for call to LogFactory.getLogger()."); }
    var logger = this._cache[name];
    if (!logger) {
      logger = this._cache[name] = new Logger(name, level);
    }
    return logger;
  };
} else {
  LogFactory.prototype.getLogger = function (name, level) {
    return {};
  };
}
module.exports = new LogFactory();

require('../lib/common.js');
var log = require('../lib/logger').getLogger('page/home/js');
var main = require('../game/main.js')();

$(function () {
  log.info("Starting game instance")
  main.init();
});

require('../lib/common.js')
var log = require('../lib/logger').getLogger('page/home/js')

log.info('Javascript loaded');
$(function () {
  log.info('Page ready');
});

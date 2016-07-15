require('../lib/common.js')
var log = require('../lib/logger').getLogger('page/home/js', 'INFO')
require('phaser-shim');

// https://github.com/photonstorm/phaser/issues/1974

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  log.info('Phaser preload');
}

function create() {
  log.info('Phaser create');
}

function update() {
  log.trace('Phaser update');
}

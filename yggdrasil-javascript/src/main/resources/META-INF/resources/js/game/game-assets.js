/**
 * A static image.
 * @param name name of the image asset
 * @param path relative path to the image file
 * @constructor
 */
function ImageAsset(name, path) {
  this.name = name;
  this.path = path;
};
/**
 * Loads the asset.
 * @param loader Phaser asset loader
 */
ImageAsset.prototype.load = function (loader) {
  loader.image(this.name, this.path);
};

// -----------------------------------------------------------------------------------
/**
 * A sprite sheet.
 * @param name name of the sprite sheet asset
 * @param path relative path to image file with the sprite sheet
 * @param tileWidth width of one tile on the sprite sheet
 * @param tileHeight height of one tile on the sprite sheet
 * @constructor
 */
function SpriteSheetAsset(name, path, tileWidth, tileHeight) {
  this.name = name;
  this.path = path;
  this.tileWidth = tileWidth;
  this.tileHeight = tileHeight;
};
/**
 * Loads the asset.
 * @param loader Phaser asset loader
 */
SpriteSheetAsset.prototype.load = function (loader) {
  loader.spritesheet(this.name, this.path, this.tileWidth, this.tileHeight);
};

// -----------------------------------------------------------------------------------
/**
 * A tilemap.
 * @param name name of the tilemap asset
 * @param path relative path to data file for the tilemap
 * @param data (optional) data for the tilemap if path is null
 * @param format format of the tilemap data.  Defaults to Phaser.Tilemap.TILED_JSON.
 * @constructor
 */
function TileMapAsset(name, path, data, format) {
  this.name = name;
  this.path = path;
  this.data = data;
  this.format = format || Phaser.Tilemap.TILED_JSON;
};
/**
 * Loads the asset
 * @param loader Phaser asset loader
 */
TileMapAsset.prototype.load = function (loader) {
  loader.tilemap(this.name, this.path, this.data, this.format);
};

// -----------------------------------------------------------------------------------
/**
 * Manifest of game assets for the loader.
 */
module.exports = [
  // System menu UI assets
  new ImageAsset("menuFrame", "assets/menuFrame.png"),
  new SpriteSheetAsset("menuButton", "assets/button.png", 252, 80),

  // Base game assets
  new TileMapAsset("tilemap", "assets/medium-demo-map.json"),
  new ImageAsset("terrain", "assets/terrain.png")
];

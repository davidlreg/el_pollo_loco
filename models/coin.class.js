/**
 * Represents a coin object in the game.
 *
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
  /**
   * @type {number} Vertical position of the coin
   */
  y = 170;

  /**
   * @type {number} Width of the coin sprite
   */
  width = 120;

  /**
   * @type {number} Height of the coin sprite
   */
  height = 120;

  /**
   * @type {Object} Collision offset values
   * @property {number} top - Top offset
   * @property {number} left - Left offset
   * @property {number} right - Right offset
   * @property {number} bottom - Bottom offset
   */
  offset = {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  };

  /**
   * @type {string[]} Path to the first coin image
   */
  COIN_IMAGE_1 = ["asssets/img/8_coin/coin_1.png"];

  /**
   * @type {string[]} Path to the second coin image
   */
  COIN_IMAGE_2 = ["asssets/img/8_coin/coin_2.png"];

  /**
   * Creates a new Coin instance.
   * Loads the image and sets random x position.
   *
   */
  constructor() {
    super().loadImage(this.COIN_IMAGE_1);
    // this.loadImage(this.COIN_IMAGE_2);

    this.x = 300 + Math.random() * 2100;

    // this.animate();
  }

  /**
   * Loads an image for the coin.
   *
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('img')  --> <img id="img" src"")>
    this.img.src = path;
  }
}

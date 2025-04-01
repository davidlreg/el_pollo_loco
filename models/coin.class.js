/**
 * Represents a coin object in the game.
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
  y = 170;
  width = 120;
  height = 120;
  offset = { top: 50, left: 50, right: 50, bottom: 50 };
  COIN_IMAGE_1 = ["assets/img/8_coin/coin_1.png"];

  /**
   * Creates a new Coin instance.
   * Loads the image and sets random x position.
   */
  constructor() {
    super().loadImage(this.COIN_IMAGE_1);
    this.x = 300 + Math.random() * 2100;
    // TODO: Uncomment this when the animation is implemented
  }

  /**
   * Loads an image for the coin.
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}

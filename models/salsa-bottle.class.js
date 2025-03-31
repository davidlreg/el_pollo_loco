/**
 * Represents a coin object in the game.
 *
 * @class
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {
  /**
   *
   * @type {number} Vertical position of the salsa bottle
   */
  y = 350;

  /**
   *
   * @type {number} Width of the salsa bottle sprite
   */
  width = 80;

  /**
   *
   * @type {number} Height of the salsa bottle sprite
   */
  height = 80;

  /**
   *
   * @type {Object} Collision offset values
   * @property {number} top - Top offset
   * @property {number} left - Left offset
   * @property {number} right - Right offset
   * @property {number} bottom - Bottom offset
   */
  offset = {
    top: 20,
    left: 30,
    right: 20,
    bottom: 20,
  };

  /**
   *
   * @type {string[]} Path to the first salsa bottle image
   */
  SALSA_BOTTLE_IMAGE = ["assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  /**
   * Creates a new salsa bottle instance.
   * Loads the image and sets random x position.
   *
   */
  constructor() {
    super().loadImage(this.SALSA_BOTTLE_IMAGE);
    this.x = 300 + Math.random() * 2100;
  }

  /**
   * Loads an image for the salsa bottle.
   *
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.img.onerror = () => console.error("Fehler beim Laden des Bildes:", path);
  }
}

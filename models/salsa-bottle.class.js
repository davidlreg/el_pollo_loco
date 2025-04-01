/**
 * Represents a salsa bottle in the game.
 *
 * @class
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {
  y = 350;
  width = 80;
  height = 80;

  offset = {
    top: 20,
    left: 30,
    right: 20,
    bottom: 20,
  };

  SALSA_BOTTLE_IMAGE = ["assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  /**
   * Creates a new salsa bottle instance.
   */
  constructor() {
    super().loadImage(this.SALSA_BOTTLE_IMAGE);
    this.x = 300 + Math.random() * 1900;
  }

  /**
   * Loads an image for the salsa bottle.
   *
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.img.onerror = () => console.error("Error loading image:", path);
  }
}

/**
 * Represents a background object in the game that extends MovableObject.
 *
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /** 
   * @type {number} Width of the background object
   *
   */
  width = 720;

  /** 
   * @type {number} Height of the background object
   *
   */
  height = 480;

  /**
   * Creates a new background object.
   *
   * @param {string} imagePath - Path to the image file
   * @param {number} x - X-coordinate position
   * @param {number} y - Y-coordinate position (ignored, calculated from height)
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}

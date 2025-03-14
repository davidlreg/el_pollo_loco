/**
 * Represents an object that can collide with other objects in the game.
 *
 * @class
 * @extends MovableObject
 */
class CollidableObject extends MovableObject {
  /**
   * Collision offset values for fine-tuning collision detection.
   *
   * @type {Object}
   * @property {number} top - Top edge offset
   * @property {number} left - Left edge offset
   * @property {number} right - Right edge offset
   * @property {number} bottom - Bottom edge offset
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
}

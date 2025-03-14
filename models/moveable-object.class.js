/**
 * Represents a movable object that extends a drawable object.
 *
 */
class MovableObject extends DrawableObject {
  /**
   * @type {number} Movement speed
   */
  speed = 0.15;

  /**
   * @type {boolean} Indicates if the object is facing the opposite direction
   */
  otherDirection = false;

  /**
   * @type {number} Vertical speed
   */
  speedY = 0;

  /**
   * @type {number} Acceleration due to gravity
   */
  acceleration = 1;

  /**
   * @type {number} Object's energy level
   */
  energy = 100;

  /**
   * @type {number} Timestamp of the last hit *
   */
  lastHit = 0;

  /**
   * Plays an animation by cycling through a set of images.
   *
   * @param {string[]} images - Array of image paths
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the left.
   *
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Makes the object jump by setting its vertical speed.
   *
   */
  jump() {
    this.speedY = 16.5;
  }

  /**
   * Applies gravity to the object, making it fall if not on the ground.
   *
   */
  applyGravity() {
    setInterval(() => {
      if (this.isCharacterAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  /**
   * Draws the object's hitbox for debugging purposes.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context
   */
  drawHitbox(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
    }
  }

  /**
   * Checks if this object is colliding with another movable object.
   *
   * @param {MovableObject} mo - Another movable object
   * @returns {boolean} True if colliding, otherwise false
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy when hit.
   *
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the object has been recently hurt.
   *
   * @returns {boolean} True if hurt within the last 0.8 seconds
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed / 1000 < 0.8;
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} True if energy is 0
   */
  isDead() {
    return this.energy === 0;
  }
}

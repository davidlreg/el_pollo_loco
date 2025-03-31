/**
 * Represents a chicken enemy that extends MovableObject.
 *
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * Vertical position of the chicken.
   *
   * @type {number}
   */
  y = 350;

  /**
   * Width of the chicken sprite.
   *
   * @type {number}
   */
  width = 60;

  /**
   * Height of the chicken sprite.
   *
   * @type {number}
   */
  height = 70;

  /**
   * Collision offset values for the chicken.
   *
   * @type {Object}
   * @property {number} top - Top offset
   * @property {number} left - Left offset
   * @property {number} right - Right offset
   * @property {number} bottom - Bottom offset
   */
  offset = {
    top: 20,
    left: 10,
    right: 10,
    bottom: 10,
  };

  /**
   * Walking animation image paths.
   *
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Creates a new Chicken instance with random position and speed.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 400 + Math.random() * 2100;
    this.speed = 0.25 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Handles chicken movement and animation.
   *
   */
  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}

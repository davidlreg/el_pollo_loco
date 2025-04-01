/**
 * Represents a chicken enemy that extends MovableObject.
 *
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  y = 350;
  width = 60;
  height = 70;

  offset = {
    top: 20,
    left: 10,
    right: 10,
    bottom: 10,
  };

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
   * @TODO Implement custom movement logic
   */
  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}

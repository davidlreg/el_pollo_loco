/**
 * Represents the Endboss enemy in the game.
 * Inherits from MovableObject.
 */
class Endboss extends MovableObject {
  x = 2600;
  y = 135;
  width = 250;
  height = 300;
  offset = {
    top: 50,
    left: 20,
    right: 20,
    bottom: 30,
  };
  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Creates an instance of Endboss and initializes its animations.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  /**
   * Starts the animation loop for the Endboss.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 500);
  }
}

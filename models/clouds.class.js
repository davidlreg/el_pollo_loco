/**
 * Represents a moving cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 720;

  /**
   * Creates a new Cloud instance.
   */
  constructor() {
    super().loadImage("assets/img/5_background/layers/4_clouds/full.png");
    this.x = 0;
  }

  /**
   * Moves the cloud to the left and resets its position when it moves off-screen.
   * @todo Clouds are not displayed when player moves more than 720px to the right!
   */
  move() {
    this.x -= this.speed;

    if (this.x + this.width < 0) {
      this.x = 720;
    }
  }
}

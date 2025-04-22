class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 720;

  constructor() {
    super().loadImage("assets/img/5_background/layers/4_clouds/full.png");
    this.x = 0;
  }

  /**
   * Moves the cloud to the left and resets its position when it moves off-screen.
   */
  move() {
    this.x -= this.speed;

    if (this.x + this.width < 0) {
      this.x = 720;
    }
  }
}

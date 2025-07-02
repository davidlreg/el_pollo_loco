class StatusBarEndboss extends StatusBar {
  IMAGE_ENDBOSS_HEALTH = [
    "assets/img/7_statusbars/3_icons/icon_health_endboss.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_ENDBOSS_HEALTH);
    this.x = 620;
    this.y = 15;
  }

  /**
   * Draws the status bar and the salsa bottle value on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.endbossHealth);
  }

  updateHealthBar(energy) {
    if (energy > 80) {
      this.endbossHealth = 4;
    } else if (energy > 60) {
      this.endbossHealth = 3;
    } else if (energy > 40) {
      this.endbossHealth = 2;
    } else if (energy > 20) {
      this.endbossHealth = 1;
    } else if (energy > 0) {
      this.endbossHealth = 0;
  }
}

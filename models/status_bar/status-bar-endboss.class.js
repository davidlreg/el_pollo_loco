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
    this.drawValue(ctx, 5);
  }
}

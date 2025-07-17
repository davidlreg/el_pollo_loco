class StatusBarCoins extends StatusBar {
  IMAGE_COIN = ["assets/img/7_statusbars/3_icons/icon_coin.png"];

  constructor() {
    super().loadImage(this.IMAGE_COIN);
    this.x = 0;
    this.y = 80;
  }

  /**
   * Draws the status bar and coin value.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.coins);
  }
}

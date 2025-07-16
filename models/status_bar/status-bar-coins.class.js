class StatusBarCoins extends StatusBar {
  IMAGE_COIN = ["assets/img/7_statusbars/3_icons/icon_coin.png"];

  constructor() {
    super().loadImage(this.IMAGE_COIN);
    // this.x = 200;
    // this.y = 15;

    this.x = 100;
    this.y = 15;
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

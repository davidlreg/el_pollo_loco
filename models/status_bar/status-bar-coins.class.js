/**
 * @class StatusBarCoins
 * @extends StatusBar
 * Represents a status bar for displaying coins.
 */
class StatusBarCoins extends StatusBar {
  IMAGE_COIN = ["assets/img/7_statusbars/3_icons/icon_coin.png"];

  /**
   * Creates an instance of StatusBarCoins.
   * @memberof StatusBarCoins
   */
  constructor() {
    super().loadImage(this.IMAGE_COIN);

    this.x = 200;
    this.y = 15;
  }

  /**
   * Draws the status bar and coin value.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   * @memberof StatusBarCoins
   */
  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.coins);
  }
}

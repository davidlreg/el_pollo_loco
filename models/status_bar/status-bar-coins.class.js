class StatusBarCoins extends StatusBar {
  IMAGES_COIN = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES_COIN);
    this.x = 0;
    this.y = 130;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Draws the status bar and coin value.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  draw(ctx) {
    const coinBarImage = this.getCurrentCoinImage();
    if (coinBarImage) {
      ctx.drawImage(coinBarImage, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Gets the current health bar image based on health level
   *
   * @returns {HTMLImageElement|null} Health bar image or null if not found
   */
  getCurrentCoinImage() {
    const coinIndex = this.getCoinImageIndex();
    const imagePath = this.IMAGES_COIN[coinIndex];
    return this.imageCache[imagePath] || null;
  }

  /**
   * Calculates the correct image index based on coin count
   *
   */
  getCoinImageIndex() {
    if (this.coins >= 9) return 5;
    if (this.coins >= 7) return 4;
    if (this.coins >= 5) return 3;
    if (this.coins >= 3) return 2;
    if (this.coins >= 1) return 1;
    return 0;
  }

  /**
   * Updates the salsa bar based on the collected salsa bottles.
   *
   */
  updateCoinBar(coins) {
    this.coin = coins;
  }
}

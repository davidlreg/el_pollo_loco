class StatusBarSalsa extends StatusBar {
  IMAGES_STATUSBAR_SALSA_BOTTLES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES_STATUSBAR_SALSA_BOTTLES);
    this.x = 5;
    this.y = 70;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Draws the status bar and the salsa bottle value on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    const salsaBarImage = this.getCurrentSalsaImage();
    if (salsaBarImage) {
      ctx.drawImage(salsaBarImage, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Gets the current salsa bar image based on bottle count
   *
   */
  getCurrentSalsaImage() {
    const salsaIndex = this.getSalsaImageIndex();
    const imagePath = this.IMAGES_STATUSBAR_SALSA_BOTTLES[salsaIndex];
    return this.imageCache[imagePath] || null;
  }

  /**
   * Calculates the correct image index based on salsa bottle count
   *
   */
  getSalsaImageIndex() {
    if (this.salsaBottles >= 9) return 5;
    if (this.salsaBottles >= 7) return 4;
    if (this.salsaBottles >= 5) return 3;
    if (this.salsaBottles >= 3) return 2;
    if (this.salsaBottles >= 1) return 1;
    return 0;
  }

  /**
   * Updates the salsa bar based on the collected salsa bottles.
   *
   */
  updateSalsaBar(salsaBottles) {
    this.salsaBottles = salsaBottles;
  }
}

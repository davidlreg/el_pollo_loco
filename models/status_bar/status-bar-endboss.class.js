class StatusBarEndboss extends StatusBar {
  IMAGE_ENDBOSS_HEALTH = [
    "assets/img/7_statusbars/3_icons/icon_health_endboss.png",
  ];

  IMAGES_STATUSBAR_ENDBOSS_HEALTH = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_ENDBOSS_HEALTH);
    this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS_HEALTH);
    this.x = 500;
    this.y = 15;
    this.width = 200;
    this.height = 60;
    this.endbossHealth = 5;
  }

  /**
   * Checks if the icon image is fully loaded and ready to draw
   *
   * @returns {boolean} True if icon is loaded and ready
   */
  isIconLoaded() {
    return this.img && this.img.complete && this.img.naturalWidth > 0;
  }

  /**
   * Draws the status bar and the salsa bottle value on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.save();
    const centerX = this.x + this.width / 2;
    ctx.translate(centerX, 0);
    ctx.scale(-1, 1);
    ctx.translate(-centerX, 0);
    const healthBarImage = this.getCurrentHealthImage();
    if (healthBarImage) {
      ctx.drawImage(healthBarImage, this.x, this.y, this.width, this.height);
    }
    if (this.isIconLoaded()) {
      const iconX = this.x + -20;
      const iconY = this.y - 5;
      const iconSize = 80;
      ctx.drawImage(this.img, iconX, iconY, iconSize, iconSize);
    }
    ctx.restore();
  }

  /**
   * Gets the current health bar image based on health level
   *
   * @returns {HTMLImageElement|null} Health bar image or null if not found
   */
  getCurrentHealthImage() {
    if (this.endbossHealth === undefined || this.endbossHealth === null) {
      this.endbossHealth = 5;
    }
    const healthIndex = Math.max(0, Math.min(5, this.endbossHealth));
    const imagePath = this.IMAGES_STATUSBAR_ENDBOSS_HEALTH[healthIndex];
    return this.imageCache[imagePath] || null;
  }

  /**
   * Updates the end boss health bar based on energy level
   *
   * @param {number} energy - Current energy value (0-100)
   */
  updateHealthBar(energy) {
    if (energy >= 80) {
      this.endbossHealth = 4;
    } else if (energy >= 60) {
      this.endbossHealth = 3;
    } else if (energy >= 40) {
      this.endbossHealth = 2;
    } else if (energy >= 20) {
      this.endbossHealth = 1;
    } else if (energy >= 0) {
      this.endbossHealth = 0;
    }
  }
}

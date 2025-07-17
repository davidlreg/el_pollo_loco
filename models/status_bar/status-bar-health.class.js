class StatusBarHealth extends StatusBar {
  IMAGES_STATUSBAR_HEALTH = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES_STATUSBAR_HEALTH);
    this.x = 110;
    this.y = 15;
    this.width = 200;
    this.height = 60;
    this.health = 5;
  }

  /**
   * Draws the health status bar on the given canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    const healthBarImage = this.getCurrentHealthImage();
    if (healthBarImage) {
      ctx.drawImage(healthBarImage, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Gets the current health bar image based on health level
   *
   * @returns {HTMLImageElement|null} Health bar image or null if not found
   */
  getCurrentHealthImage() {
    if (this.health === undefined || this.health === null) {
      this.health = 5;
    }
    const healthIndex = Math.max(0, Math.min(5, this.health));
    const imagePath = this.IMAGES_STATUSBAR_HEALTH[healthIndex];
    return this.imageCache[imagePath] || null;
  }

  /**
   * Updates the health bar based on the character's energy.
   *
   * @param {number} energy - The current energy value of the character.
   */
  updateHealthBar(energy) {
    if (energy > 80) {
      this.health = 5;
    } else if (energy > 60) {
      this.health = 4;
    } else if (energy > 40) {
      this.health = 3;
    } else if (energy > 20) {
      this.health = 2;
    } else if (energy > 0) {
      this.health = 1;
    } else {
      this.health = 0;
    }
  }
}

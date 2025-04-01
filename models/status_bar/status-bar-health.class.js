/**
 * Class representing the health status bar.
 * @extends StatusBar
 */
class StatusBarHealth extends StatusBar {
  IMAGE_HEALTH = ["assets/img/7_statusbars/3_icons/icon_health.png"];

  /**
   * Creates an instance of StatusBarHealth.
   */
  constructor() {
    super().loadImage(this.IMAGE_HEALTH);
    this.x = 100;
    this.y = 15;
  }

  /**
   * Draws the health status bar on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.health);
  }

  /**
   * Updates the health bar based on the character's energy.
   * TODO: Make energy threshold values configurable.
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

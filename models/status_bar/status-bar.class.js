class StatusBar extends DrawableObject {
  salsaBottles = 69;
  health = 5;
  coins = 0;

  width = 70;
  height = 70;

  constructor() {
    super();
  }

  /**
   * Draws the current value of the status bar next to the icon.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {number} value - The value to display.
   */
  drawValue(ctx, value) {
    ctx.font = "bold 28px 'Comic Sans MS'"; // Fettschrift + Comic Sans MS
    ctx.fillStyle = "white"; // Farbe der Schrift
    ctx.fillText(value, this.x + 65, this.y + 45); // Position neben dem Icon
  }

  setSalsaBottleCount(value) {
    this.salsaBottles = value;
  }

  setHealth(value) {
    this.health = value;
  }

  setCoinCount(value) {
    this.coins = value;
  }
}

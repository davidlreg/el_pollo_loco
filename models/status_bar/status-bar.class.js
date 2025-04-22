class StatusBar extends DrawableObject {
  salsaBottles = 30;
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
    ctx.font = "bold 28px 'Comic Sans MS'";
    ctx.fillStyle = "white";
    ctx.fillText(value, this.x + 65, this.y + 45);
  }

  /**
   * Sets the salsa bottle count.
   * @param {number} value - The number of salsa bottles.
   */
  setSalsaBottleCount(value) {
    this.salsaBottles = value;
  }

  /**
   * Sets the health value.
   * @param {number} value - The health value.
   */
  setHealth(value) {
    this.health = value;
  }

  /**
   * Sets the coin count.
   * @param {number} value - The number of coins.
   */
  setCoinCount(value) {
    this.coins = value;
  }
}

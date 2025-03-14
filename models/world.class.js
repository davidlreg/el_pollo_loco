/**
 * Represents the game world.
 *
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  /**
   * Creates an instance of World.
   *
   * @param {HTMLCanvasElement} canvas - The game canvas.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  /**
   * Assigns this world instance to the character.
   *
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Checks for collisions between the character and enemies at intervals.
   *
   */
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
        }
      });
    }, 200);
  }

  /**
   * Clears the canvas and redraws all game objects.
   *
   */
  draw() {
    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.level.clouds.forEach((cloud) => cloud.move());
    this.ctx.translate(-this.camera_x, 0);

    // Recursively call draw() for continuous rendering
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds multiple objects to the canvas.
   *
   * @param {Array} objects - The objects to be added.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the canvas.
   *
   * @param {Object} mo - The movable object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.drawAssetsOtherDirection(mo);
    }
    mo.draw(this.ctx);
    mo.drawHitbox(this.ctx);
    if (mo.otherDirection) {
      this.restoreAssetFacingDirection(mo);
    }
  }

  /**
   * Clears the entire canvas.
   *
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Flips an object horizontally before drawing.
   *
   * @param {Object} mo - The object to be flipped.
   */
  drawAssetsOtherDirection(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores an object's original direction after being drawn flipped.
   *
   * @param {Object} mo - The object to restore.
   */
  restoreAssetFacingDirection(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}

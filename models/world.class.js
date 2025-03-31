/**
 * Represents the game world.
 *
 */
class World {
  character = new Character();
  status_bar_salsa = new StatusBarSalsa();
  status_bar_health = new StatusBarHealth();
  status_bar_coins = new StatusBarCoins();
  throwable_objects = [];
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
    this.character.statusBarHealth = this.status_bar_health; // Hier übergibst du die Referenz
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
    }, 75);
    setInterval(() => {
      this.level.salsaBottles.forEach((salsaBottle, index) => {
        if (this.character.isColliding(salsaBottle)) {
          this.status_bar_salsa.salsaBottles += 1;
          this.level.salsaBottles.splice(index, 1);
          // TODO Add Sound when Salsa Bottle is collected
        }
      });
    }, 75);
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.status_bar_coins.coins += 1;
          this.level.coins.splice(index, 1);
          // TODO Add Sound when Coin is collected
        }
      });
    }, 75);
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
    this.addObjectsToMap(this.level.salsaBottles);
    this.level.clouds.forEach((cloud) => cloud.move());
    this.ctx.translate(-this.camera_x, 0);

    this.ctx.restore(); // Kamera zurücksetzen

    // Zeichne StatusBars unabhängig von der Kamera
    this.addStatusBarToMap(
      this.status_bar_salsa,
      this.status_bar_health,
      this.status_bar_coins
    );

    this.throwable_objects.forEach((bottle) => {
      console.log("Drawing bottle at", bottle.x, bottle.y); // Debugging
      bottle.draw(this.ctx);
    });

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
   * Adds multiple status bar elements to the canvas.
   *
   * @param {...Object} statusBars - The status bar elements to be drawn.
   */
  addStatusBarToMap(...statusBars) {
    statusBars.forEach((element) => {
      element.draw(this.ctx);
    });
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

class World {
  character = new Character();
  endboss = new Endboss();
  status_bar_salsa = new StatusBarSalsa();
  status_bar_health = new StatusBarHealth();
  status_bar_coins = new StatusBarCoins();
  throwable_objects = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  soundMuted = false;
  endbossActivated = false;
  backgroundMusic = new Audio("assets/audio/mexican-background-music.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.activateEndboss();
  }

  /**
   * Assigns this world instance to the character.
   */
  setWorld() {
    this.character.world = this;
    this.character.statusBarHealth = this.status_bar_health;
  }

  /**
   * Checks for collisions between the character and game objects at intervals.
   */
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isDead) return;

        if (this.character.isColliding(enemy)) {
          if (this.character.speedY < 0) {
            enemy.die();
            this.character.jump();
          } else {
            this.character.hit();
          }
        }
      });
    }, 25);
    setInterval(() => {
      this.level.salsaBottles.forEach((salsaBottle, index) => {
        if (this.character.isColliding(salsaBottle)) {
          this.status_bar_salsa.salsaBottles += 1;
          this.level.salsaBottles.splice(index, 1);
          let salsaBottleCollectedSound = new Audio(
            "assets/audio/item-recieved.mp3"
          );
          salsaBottleCollectedSound.volume = 0.1;
          salsaBottleCollectedSound.play();
        }
      });
    }, 75);
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.status_bar_coins.coins += 1;
          this.level.coins.splice(index, 1);
          let coinSound = new Audio("assets/audio/coin-recieved.mp3");
          coinSound.volume = 0.025;
          coinSound.play();
        }
      });
    }, 75);
  }

  /**
   * Activates the endboss behavior when the character reaches a certain point.
   */
  activateEndboss() {
    setInterval(() => {
      if (this.character.x > 2180) {
        this.endboss.moveLeft();
        this.endbossActivated = true; // Aktivieren, wenn einmal überschritten
        if (!this.endboss.isJumping) {
          this.endboss.currentAnimation = this.endboss.IMAGES_WALKING;
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.endbossActivated && Math.random() < 0.4) {
        this.endboss.currentAnimation = this.endboss.IMAGES_ATTACK;
        this.endboss.bossJump();
      }
    }, 2000);
  }

  /**
   * Clears the canvas and redraws all game objects.
   */
  draw() {
    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.level.clouds.forEach((cloud) => cloud.move());
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.restore();
    this.addStatusBarToMap(
      this.status_bar_salsa,
      this.status_bar_health,
      this.status_bar_coins
    );
    this.throwable_objects.forEach((bottle) => bottle.draw(this.ctx));
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds multiple objects to the canvas.
   * @param {Array} objects - The objects to be added.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single object to the canvas.
   * @param {Object} mo - The movable object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.drawAssetsOtherDirection(mo);
    }
    mo.draw(this.ctx);
    // mo.drawHitbox(this.ctx); // Hitboxen an und ausschalten
    if (mo.otherDirection) {
      this.restoreAssetFacingDirection(mo);
    }
  }

  /**
   * Adds multiple status bar elements to the canvas.
   * @param {...Object} statusBars - The status bar elements to be drawn.
   */
  addStatusBarToMap(...statusBars) {
    statusBars.forEach((element) => element.draw(this.ctx));
  }

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Flips an object horizontally before drawing.
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
   * @param {Object} mo - The object to restore.
   */
  restoreAssetFacingDirection(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  /**
   * Plays the background music for the game.
   */
  playBackgroundMusic() {
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.005; // default 0.005
    this.backgroundMusic.play();
  }
}

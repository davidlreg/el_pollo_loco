class World {
  canvas;
  ctx;
  keyboard;
  level = level1;
  camera_x = 0;
  character = new Character();
  endboss = new Endboss();
  status_bar_salsa = new StatusBarSalsa();
  status_bar_health = new StatusBarHealth();
  status_bar_coins = new StatusBarCoins();
  throwable_objects = [];
  soundMuted = false;
  endbossActivated = false;
  backgroundMusic = new Audio("assets/audio/mexican-background-music.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.startGameLoops();
    this.playBackgroundMusic();
    this.draw();
  }

  /**
   * Assigns this world instance to the character.
   */
  setWorld() {
    this.character.world = this;
    this.character.statusBarHealth = this.status_bar_health;
  }

  startGameLoops() {
    setInterval(() => this.checkCollisions(), 25);
  }

  /**
   * Checks for collisions between the character and game objects at intervals.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead && this.character.isColliding(enemy)) {
        this.character.speedY < 0
          ? (enemy.die(), this.character.jump())
          : this.character.hit();
      }
    });

    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
    }

    this.level.salsaBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.status_bar_salsa.salsaBottles += 1;
        this.level.salsaBottles.splice(index, 1);
        this.playSound("assets/audio/item-recieved.mp3", 0.1);
      }
    });

    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.status_bar_coins.coins += 1;
        this.level.coins.splice(index, 1);
        this.playSound("assets/audio/coin-recieved.mp3", 0.025);
      }
    });

    this.checkBottleEnemyCollisions();
    this.checkEndbossActivation();
  }

  checkBottleEnemyCollisions() {
    this.throwable_objects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.die();
          console.log("Enemy Hit!");
        }
      });
    });
  }

  checkEndbossActivation() {
    if (this.character.x > 2180 && !this.endbossActivated) {
      this.endbossActivated = true;
      this.activateEndboss();
    }
  }

  /**
   * Activates the endboss behavior when the character reaches a certain point.
   */
  activateEndboss() {
    setInterval(() => {
      if (this.character.x > 2180) {
        this.endboss.moveLeft();
        this.endbossActivated = true;
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

  checkBottleEnemyCollisions() {
    this.throwable_objects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.die();
          console.log("Enemy Hit!");
          // // Optionale: Flasche entfernen
          // const index = this.throwable_objects.indexOf(bottle);
          // if (index > -1) this.throwable_objects.splice(index, 1);
        }
      });
    });
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
    this.throwable_objects.forEach((bottle) => this.addToMap(bottle));
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
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x *= -1;
    }
    mo.draw(this.ctx);
    mo.drawHitbox(this.ctx);
    if (mo.otherDirection) {
      this.ctx.restore();
      mo.x *= -1;
    }
  }

  /**
   * Adds multiple status bar elements to the canvas.
   * @param {...Object} statusBars - The status bar elements to be drawn.
   */
  addStatusBarToMap(...statusBars) {
    statusBars.forEach((bar) => bar.draw(this.ctx));
  }

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  playSound(path, volume) {
    const sound = new Audio(path);
    sound.volume = volume;
    sound.play();
  }

  /**
   * Plays the background music for the game.
   */
  playBackgroundMusic() {
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.005;
    this.backgroundMusic.play();
  }
}

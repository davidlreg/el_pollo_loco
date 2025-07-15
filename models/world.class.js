class World {
  startGame;
  canvas;
  ctx;
  keyboard;
  level = level1;
  camera_x = 0;
  character = new Character();
  endboss = new Endboss(this);
  status_bar_salsa = new StatusBarSalsa();
  status_bar_health = new StatusBarHealth();
  status_bar_coins = new StatusBarCoins();
  status_bar_endboss = new StatusBarEndboss();
  throwable_objects = [];
  endbossActivated = false;
  endbossBarShouldBeVisible = true;
  gameOverTimeout = null;
  victory_sound = new Audio("assets/audio/victory-sound.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.startGameLoops();
    this.draw();
  }

  /**
   * Sets the world reference in the character and links the health status bar.
   *
   */
  setWorld() {
    this.character.world = this;
    this.character.statusBarHealth = this.status_bar_health;
  }

  /**
   * Starts the game loops by setting a collision check interval.
   *
   */
  startGameLoops() {
    this.collisionCheckInterval = setInterval(() => this.checkCollisions(), 25);
  }

  /**
   * Checks all relevant collisions and item collections in the game.
   *
   */
  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkCharacterEndbossCollision();
    this.checkBottleEnemyCollisions();
    this.collectBottles();
    this.collectCoins();
    this.checkEndbossActivation();
  }

  /**
   * Checks for collisions between the character and enemies, handling hits and enemy deaths.
   *
   */
  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead && this.character.isColliding(enemy)) {
        this.character.speedY < 0
          ? (enemy.die(), this.character.jump())
          : this.character.hit(20);
      }
    });
  }

  /**
   * Checks for collision between the character and the endboss and triggers character hit.
   *
   */
  checkCharacterEndbossCollision() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit(40);
    }
  }

  /**
   * Handles collection of salsa bottles by the character, updates status and plays sound.
   *
   */
  collectBottles() {
    this.level.salsaBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.status_bar_salsa.salsaBottles += 1;
        this.level.salsaBottles.splice(index, 1);
        this.playSound("assets/audio/item-recieved.mp3", 0.01);
      }
    });
  }

  /**
   * Handles collection of coins by the character, updates status and plays sound.
   *
   */
  collectCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.status_bar_coins.coins += 1;
        this.level.coins.splice(index, 1);
        this.playSound("assets/audio/coin-recieved.mp3", 0.001);
      }
    });
  }

  /**
   * Checks collisions between throwable bottles and enemies,
   * triggers hits or deaths and splash animations.
   *
   */
  checkBottleEnemyCollisions() {
    this.throwable_objects.forEach((bottle) => {
      if (!bottle.hasSplashed && bottle.isColliding(this.endboss)) {
        this.endboss.hit();
        bottle.playSplashAnimation();
      }
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead && !bottle.hasSplashed && bottle.isColliding(enemy)) {
          enemy.die();
          bottle.playSplashAnimation();
        }
      });
    });
  }

  /**
   * Activates the endboss when the character passes a certain position.
   *
   */
  checkEndbossActivation() {
    if (this.character.x > 2180 && !this.endbossActivated) {
      this.endbossActivated = true;
      this.activateEndboss();
    }
  }

  /**
   * Starts the endboss movement and attack intervals.
   *
   */
  activateEndboss() {
    this.endbossMoveInterval = setInterval(
      () => this.endboss.moveEndboss(this.character),
      1000 / 60
    );
    this.endbossAttackInterval = setInterval(
      () => this.endboss.randomEndbossAttack(),
      1600
    );
  }

  /**
   * Main game loop: clears canvas, translates camera, draws objects, and requests next frame.
   *
   */
  draw() {
    if (this.gameIsOver) return;
    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.restore();
    this.drawStatusBars();
    this.animationFrameId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws all game objects including background, enemies, character, and moves clouds.
   *
   */
  drawGameObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.drawThrowables();
    this.level.clouds.forEach((cloud) => cloud.move());
  }

  /**
   * Draws all relevant status bars (health, coins, salsa, endboss if active).
   *
   */
  drawStatusBars() {
    const bars = [
      this.status_bar_salsa,
      this.status_bar_health,
      this.status_bar_coins,
    ];
    if (this.endbossActivated && this.endbossBarShouldBeVisible) {
      bars.push(this.status_bar_endboss);
    }
    this.addStatusBarToMap(...bars);
  }

  /**
   * Draws all throwable objects like bottles.
   *
   */
  drawThrowables() {
    this.throwable_objects.forEach((bottle) => this.addToMap(bottle));
  }

  /**
   * Clears the entire game canvas.
   *
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Adds multiple objects to the canvas/map by drawing each.
   *
   * @param {Array} objects - Array of drawable objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Draws a single game object to the canvas with proper direction handling.
   *
   * @param {Object} mo - Movable object with draw method.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x *= -1;
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.ctx.restore();
      mo.x *= -1;
    }
  }

  /**
   * Draws one or more status bars to the canvas.
   *
   * @param {...Object} statusBars - Status bar objects with draw method.
   */
  addStatusBarToMap(...statusBars) {
    statusBars.forEach((bar) => bar.draw(this.ctx));
  }

  /**
   * Plays a sound from a given path at specified volume.
   *
   * @param {string} path - Audio file path.
   * @param {number} volume - Volume level (0.0 to 1.0).
   */
  playSound(path, volume) {
    const sound = new Audio(path);
    sound.volume = volume;
    sound.play();
  }

  /**
   * Checks if the game is over or won, and triggers respective handlers.
   *
   */
  isGameOver() {
    if (this.character.isDead()) {
      this.handleGameOver();
    } else if (this.endboss.endbossDeath === true) {
      this.gameIsWon = true;
      this.handleGameWon();
    }
  }

  /**
   * Handles the game over sequence with delay, UI update, and stopping loops.
   *
   */
  handleGameOver() {
    this.gameOverTimeout = setTimeout(() => {
      this.stopAllGameLoops();
      this.hideGameUI();
      if (!this.gameIsOver) return;
      this.showGameOverScreen();
      this.stopBackgroundMusic();
    }, 2000);
  }

  /**
   * Handles the game won scenario (currently logs a message).
   *
   */
  handleGameWon() {
    this.gameWonTimeout = setTimeout(() => {
      this.stopAllGameLoops();
      this.hideGameUI();
      if (!this.gameIsWon) return;
      this.showGameWonScreen();
      this.victory_sound.volume = 0.35;
      this.victory_sound.play();
      this.stopBackgroundMusic();
    }, 4000);
  }

  /**
   * Hides the main game UI elements.
   *
   */
  hideGameUI() {
    document.getElementById("canvas").style.display = "none";
    document.querySelector(".bottomWrapper").style.display = "none";
    document.getElementById("headline").style.display = "none";
  }

  /**
   * Shows the game over screen.
   *
   */
  showGameOverScreen() {
    document.getElementById("gameOverScreen").style.display = "block";
  }

  showGameWonScreen() {
    document.getElementById("gameWonScreen").style.display = "block";
  }

  /**
   * Stops background music playback and resets it.
   *
   */
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  /**
   * Stops all running game loops and intervals.
   *
   */
  stopAllGameLoops() {
    this.gameIsOver = true;
    this.character.stopAllIntervals();
    if (this.collisionCheckInterval) clearInterval(this.collisionCheckInterval);
    if (this.endbossMoveInterval) clearInterval(this.endbossMoveInterval);
    if (this.endbossAttackInterval) clearInterval(this.endbossAttackInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }
}

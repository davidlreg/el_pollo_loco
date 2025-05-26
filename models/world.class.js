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
  status_bar_endboss = new StatusBarEndboss();
  throwable_objects = [];
  endbossActivated = false;
  gameOverTimeout = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.startGameLoops();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
    this.character.statusBarHealth = this.status_bar_health;
  }

  startGameLoops() {
    this.collisionCheckInterval = setInterval(() => this.checkCollisions(), 25);
  }

  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkCharacterEndbossCollision();
    this.collectBottles();
    this.collectCoins();
    this.checkBottleEnemyCollisions();
    this.checkEndbossActivation();
  }

  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead && this.character.isColliding(enemy)) {
        this.character.speedY < 0 ? (enemy.die(), this.character.jump()) : this.character.hit();
      }
    });
  }

  checkCharacterEndbossCollision() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
    }
  }

  collectBottles() {
    this.level.salsaBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.status_bar_salsa.salsaBottles += 1;
        this.level.salsaBottles.splice(index, 1);
        this.playSound("assets/audio/item-recieved.mp3", 0.01);
      }
    });
  }

  collectCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.status_bar_coins.coins += 1;
        this.level.coins.splice(index, 1);
        this.playSound("assets/audio/coin-recieved.mp3", 0.001);
      }
    });
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

  activateEndboss() {
    this.endbossMoveInterval = setInterval(() => this.endboss.moveEndboss(this.character), 1000 / 60);
    this.endbossAttackInterval = setInterval(() => this.endboss.randomEndbossAttack(), 2000);
  }

  draw() {
    if (this.gameIsOver) return;

    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.restore();
    this.drawStatusBars();
    this.drawThrowables();

    this.animationFrameId = requestAnimationFrame(() => this.draw());
  }

  drawGameObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.level.clouds.forEach((cloud) => cloud.move());
  }

  drawStatusBars() {
    const bars = [this.status_bar_salsa, this.status_bar_health, this.status_bar_coins];
    if (this.endbossActivated) bars.push(this.status_bar_endboss);
    this.addStatusBarToMap(...bars);
  }

  drawThrowables() {
    this.throwable_objects.forEach((bottle) => this.addToMap(bottle));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

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

  addStatusBarToMap(...statusBars) {
    statusBars.forEach((bar) => bar.draw(this.ctx));
  }

  playSound(path, volume) {
    const sound = new Audio(path);
    sound.volume = volume;
    sound.play();
  }

  isGameOver() {
    if (this.character.isDead()) {
      this.handleGameOver();
    } else if (this.endboss.endbossDeath === true) {
      this.handleGameWon();
    }
  }

  handleGameOver() {
    this.gameOverTimeout = setTimeout(() => {
      this.stopAllGameLoops();
      this.hideGameUI();
      if (!this.gameIsOver) return;
      this.showGameOverScreen();
      this.stopBackgroundMusic();
    }, 2000);
  }

  handleGameWon() {
    console.log("Congrats You Won!");
  }

  hideGameUI() {
    document.getElementById("canvas").style.display = "none";
    document.querySelector(".bottomWrapper").style.display = "none";
    document.getElementById("headline").style.display = "none";
  }

  showGameOverScreen() {
    document.getElementById("gameOverScreen").style.display = "block";
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  stopAllGameLoops() {
    this.gameIsOver = true;
    this.character.stopAllIntervals();
    if (this.collisionCheckInterval) clearInterval(this.collisionCheckInterval);
    if (this.endbossMoveInterval) clearInterval(this.endbossMoveInterval);
    if (this.endbossAttackInterval) clearInterval(this.endbossAttackInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }
}

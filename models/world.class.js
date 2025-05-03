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
    setInterval(() => this.checkCollisions(), 25);
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
        this.playSound("assets/audio/item-recieved.mp3", 0.1);
      }
    });
  }

  collectCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.status_bar_coins.coins += 1;
        this.level.coins.splice(index, 1);
        this.playSound("assets/audio/coin-recieved.mp3", 0.025);
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
    setInterval(() => this.moveEndboss(), 1000 / 60);
    setInterval(() => this.randomEndbossAttack(), 2000);
  }

  moveEndboss() {
    if (this.character.x > 2180) {
      this.endboss.moveLeft();
      if (!this.endboss.isJumping) {
        this.endboss.currentAnimation = this.endboss.IMAGES_WALKING;
      }
    }
  }

  randomEndbossAttack() {
    if (this.endbossActivated && Math.random() < 0.4) {
      this.endboss.currentAnimation = this.endboss.IMAGES_ATTACK;
      this.endboss.bossJump();
    }
  }

  draw() {
    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.restore();
    this.drawStatusBars();
    this.drawThrowables();
    requestAnimationFrame(() => this.draw());
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
}

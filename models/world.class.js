class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
        }
      });
    }, 200);
  }

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
    // Draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  clearCanvas() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawAssetsOtherDirection(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  restoreAssetFacingDirection(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}

/*
if (character.x + character.widht > chicken.x &&
    character.y + character.height > chicken.y &&
    character.x < chicken.x &&
    character.y < chicken.y + chicken.height
)

isColliding(mo) {
  return this.x + this.width > mo.x &&
      this.y + this-height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
}
*/

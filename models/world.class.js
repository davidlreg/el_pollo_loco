class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("asssets/img/5_background/layers/air.png", 0),
    new BackgroundObject("asssets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("asssets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("asssets/img/5_background/layers/1_first_layer/1.png", 0),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.clearCanvas();

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.clouds.forEach((cloud) => cloud.move());

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
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      this.ctx.restore();
      mo.x = mo.x * -1;
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

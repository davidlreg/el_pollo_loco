class MovableObject {
  x = 120;
  y = 280;
  img;
  width = 100;
  height = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15; // Geschwindigkeit der Bewegung
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('img')  --> <img id="img" src"")>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  jump() {
    this.speedY = 16.5;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawHitbox(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left, // X-Position nach rechts verschieben
        this.y + this.offset.top, // Y-Position nach unten verschieben
        this.width - this.offset.left - this.offset.right, // Breite reduzieren (links und rechts)
        this.height - this.offset.top - this.offset.bottom // Höhe reduzieren (oben und unten)
      );
      ctx.stroke();
    }
  }

  /*

if (character.x + character.widht > chicken.x &&
    character.y + character.height > chicken.y &&
    character.x < chicken.x &&
    character.y < chicken.y + chicken.height
)

*/

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
        this.energy = 0;
    }
    this.lastHit = new Date().getTime();
}

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000; // Differenz in Sek
    return timePassed < 0.8;
  }

  isDead() {
    return this.energy == 0;
  }
}

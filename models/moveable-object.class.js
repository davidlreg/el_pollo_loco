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
}

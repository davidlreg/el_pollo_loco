class SalsaBottle extends MovableObject {
  y = 350;
  width = 80;
  height = 80;

  offset = {
    top: 20,
    left: 30,
    right: 20,
    bottom: 20,
  };

  SALSA_BOTTLE_IMAGES = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super();
    this.initializeSalsaBottle();
  }

  initializeSalsaBottle() {
    this.loadInitialImage();
    this.loadAnimationImages();
    this.setStartPosition();
    this.animate();
  }

  loadInitialImage() {
    this.loadImage(this.SALSA_BOTTLE_IMAGES[0]);
  }

  loadAnimationImages() {
    this.loadImages(this.SALSA_BOTTLE_IMAGES);
  }

  setStartPosition() {
    this.x = 300 + Math.random() * 1900;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  playBottleAnimation() {
    let i = this.currentImage % this.SALSA_BOTTLE_IMAGES.length;
    let path = this.SALSA_BOTTLE_IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  animate() {
    setInterval(() => this.playBottleAnimation(), 500);
  }
}

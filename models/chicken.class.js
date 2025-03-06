class Chicken extends MovableObject {
  y = 360;
  width = 50;
  height = 60;

  IMAGES_WALKING = [
    "asssets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "asssets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "asssets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("asssets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 620 + Math.random() * 100;
    this.speed = 0.25 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 250);
  }
}

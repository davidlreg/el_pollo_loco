class Chicken extends MovableObject {
  y = 350;
  width = 60; // Standart 60
  height = 70; // Standart 70

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "asssets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "asssets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "asssets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("asssets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 400 + Math.random() * 2100;
    this.speed = 0.25 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}

class Chicken extends MovableObject {
  y = 350;
  world;
  width = 60;
  height = 70;
  type = "chicken";
  offset = {
    top: 20,
    left: 10,
    right: 10,
    bottom: 10,
  };
  isDead = false;

  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.world = world;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD);
    this.x = 400 + Math.random() * 2100;
    this.speed = 0.25 + Math.random() * 0.25;
    this.animate();
  }
}

class Chicken extends MovableObject {
  y = 360;
  width = 50;
  height = 60;

  constructor() {
    super().loadImage("asssets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500;
  }
}

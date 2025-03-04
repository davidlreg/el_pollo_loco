class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 350;

  constructor() {
    super().loadImage("asssets/img/5_background/layers/4_clouds/1.png");

    this.x = -100 + Math.random() * 720;
  }
}

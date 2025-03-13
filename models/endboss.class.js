class Endboss extends MovableObject {
  x = 2600;
  y = 135;
  width = 250;
  height = 300;

  offset = {
    top: 50,
    left: 20,
    right: 20,
    bottom: 30,
  };

  IMAGES_WALKING = [
    "asssets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "asssets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    // this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 500);
  }
}

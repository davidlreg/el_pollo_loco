class Character extends MovableObject {
  x = 60;
  y = 165;
  width = 120;
  height = 260;
  speed = 3.5;

  IMAGES_IDLE = [
    "asssets/img/2_character_pepe/1_idle/idle/I-1.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-2.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-3.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-4.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-5.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-6.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-7.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-8.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-9.png",
    "asssets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_MOVE_RIGHT = [
    "asssets/img/2_character_pepe/2_walk/W-21.png",
    "asssets/img/2_character_pepe/2_walk/W-22.png",
    "asssets/img/2_character_pepe/2_walk/W-23.png",
    "asssets/img/2_character_pepe/2_walk/W-24.png",
    "asssets/img/2_character_pepe/2_walk/W-25.png",
    "asssets/img/2_character_pepe/2_walk/W-26.png",
  ];

  world;

  constructor() {
    super().loadImage("asssets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_MOVE_RIGHT);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_IDLE.length;
      let path = this.IMAGES_IDLE[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 175);

    setInterval(() => {
      if (this.world.keyboard.moveRight) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.moveLeft) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
        // Walk animation
        let i = this.currentImage % this.IMAGES_MOVE_RIGHT.length;
        let path = this.IMAGES_MOVE_RIGHT[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 175);
  }

  jump() {}
}

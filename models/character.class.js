class Character extends MovableObject {
  world;
  x = 0;
  y = 165; // Default 165
  width = 120;
  height = 260;
  speedX = 4; // Default 4

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

  IMAGES_MOVE = [
    "asssets/img/2_character_pepe/2_walk/W-21.png",
    "asssets/img/2_character_pepe/2_walk/W-22.png",
    "asssets/img/2_character_pepe/2_walk/W-23.png",
    "asssets/img/2_character_pepe/2_walk/W-24.png",
    "asssets/img/2_character_pepe/2_walk/W-25.png",
    "asssets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "asssets/img/2_character_pepe/3_jump/J-31.png",
    "asssets/img/2_character_pepe/3_jump/J-32.png",
    "asssets/img/2_character_pepe/3_jump/J-33.png",
    "asssets/img/2_character_pepe/3_jump/J-34.png",
    "asssets/img/2_character_pepe/3_jump/J-35.png",
    "asssets/img/2_character_pepe/3_jump/J-36.png",
    "asssets/img/2_character_pepe/3_jump/J-37.png",
    "asssets/img/2_character_pepe/3_jump/J-38.png",
    "asssets/img/2_character_pepe/3_jump/J-39.png",
  ];

  constructor() {
    super().loadImage("asssets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_MOVE);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  characterMoveLeft() {
    this.x -= this.speedX;
    this.otherDirection = true;
  }

  characterMoveRight() {
    this.x += this.speedX;
    this.otherDirection = false;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isCharacterAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isCharacterAboveGround() {
    return this.y < 165;
  }

  playIdleAnimation() {
    let i = this.currentImage % this.IMAGES_IDLE.length;
    let path = this.IMAGES_IDLE[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  animate() {
    // Animates the Idle-Animation
    setInterval(() => {
      this.playIdleAnimation();
    }, 175);

    // Animates the Jumping- and Moving-Animation
    setInterval(() => {
      if (this.isCharacterAboveGround()) {
        // Jump Animation
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
          // Walk animation
          this.playAnimation(this.IMAGES_MOVE);
        }
      }
    }, 175);

    // Character Move Right / Left / Jump
    setInterval(() => {
      // Funktion um den Charakter nach Rechts zu bewegen
      if (this.world.keyboard.moveRight && this.x < this.world.level.level_end_x) {
        this.characterMoveRight();
      }
      // Funktion um den Charakter nach Links zu bewegen
      if (this.world.keyboard.moveLeft && this.x > -60) {
        this.characterMoveLeft();
      }
      // Funktion um den Charakter springen zu lassen
      if (this.world.keyboard.jump && !this.isCharacterAboveGround()) {
        this.jump();
      }
      // Lässt die Kammera sich mit dem Charactewr mitbewegen
      this.world.camera_x = -this.x + 60;
    }, 1000 / 60);
  }
}

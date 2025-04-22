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
  speed = 0.005;
  gravity = 1.2;
  jumpStrength = 20;
  groundLevel = 135;
  isJumping = false;

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  currentAnimation = this.IMAGES_ALERT;

  constructor() {
    super().loadImage("assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Starts the animation loop for the Endboss.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.currentAnimation);
    }, 500);
  }

  /**
   * Makes the Endboss jump with a specified jump strength and gravity effect.
   * The jump ends when the Endboss reaches the ground level.
   */
  bossJump() {
    if (this.isJumping) return;

    this.isJumping = true;
    this.jumpHeight = this.jumpStrength;

    let jumpInterval = setInterval(() => {
      this.y -= this.jumpHeight;
      this.jumpHeight -= this.gravity;

      if (this.y >= this.groundLevel) {
        this.y = this.groundLevel;
        clearInterval(jumpInterval);
        this.isJumping = false;
        this.currentAnimation = this.IMAGES_WALKING;
      }
    }, 40);
  }
}

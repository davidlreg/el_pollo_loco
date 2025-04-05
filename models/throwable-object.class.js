class ThrowableObject extends MovableObject {
  speedX;
  speedY;
  world;
  hasSplashed = false;

  IMAGES_BOTTLE_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a throwable object.
   * @param {number} x - The initial x-position.
   * @param {number} y - The initial y-position.
   * @param {object} world - The game world instance.
   * @param {number} direction - The throw direction (-1 for left, 1 for right).
   */
  constructor(x, y, world, direction) {
    super();
    this.x = x + - 10;
    this.y = y + 45;
    this.width = 80;
    this.height = 80;
    this.speedX = 10 * direction;
    this.speedY = 15;
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.world = world;
    this.throw();
    this.animateRotation();
  }

  /**
   * Moves the throwable object in an arc-like motion and triggers splash animation upon impact.
   */
  throw() {
    let throwSound = new Audio("assets/audio/bottle-throw-sound.mp3");
    throwSound.play();
    throwSound.volume = 0.05;

    if (!this.bottleBreakSound) {
      this.bottleBreakSound = new Audio("assets/audio/bottle-break.mp3");
      this.bottleBreakSound.volume = 0.05;
    }

    let hasBroken = false;

    let interval = setInterval(() => {
      this.x += this.speedX;
      this.y -= this.speedY;
      this.speedY -= 1;

      if (this.y > 380) {
        this.y = 360;
        clearInterval(interval);
        this.playSplashAnimation();

        if (!hasBroken) {
          hasBroken = true;
          this.bottleBreakSound.currentTime = 0; // Sound von Anfang abspielen
          this.bottleBreakSound.play();
        }
      }
    }, 50);
  }

  /**
   * Animates the bottle rotation while in the air.
   */
  animateRotation() {
    let rotationInterval = setInterval(() => {
      if (!this.hasSplashed) {
        this.currentImage =
          (this.currentImage + 1) % this.IMAGES_BOTTLE_ROTATION.length;
        this.img =
          this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentImage]];
      } else {
        clearInterval(rotationInterval);
      }
    }, 100);
  }

  /**
   * Plays the splash animation when the bottle hits the ground.
   */
  playSplashAnimation() {
    this.hasSplashed = true;
    let i = 0;
    let splashInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[i]];
      i++;
      if (i >= this.IMAGES_BOTTLE_SPLASH.length) {
        clearInterval(splashInterval);
        this.removeBottle();
      }
    }, 100);
  }

  /**
   * Removes the bottle from the game world after the splash animation.
   */
  removeBottle() {
    setTimeout(() => {
      this.world.throwable_objects = this.world.throwable_objects.filter(
        (obj) => obj !== this
      );
    }, 500);
  }
}

class ThrowableObject extends MovableObject {
  speedX;
  speedY;
  world;
  hasSplashed = false;
  bottleBreakSound;

  offset = {
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
  };

  constructor(x, y, world, direction) {
    super();
    this.initPosition(x, y, direction);
    this.initImages();
    this.initSounds();
    this.world = world;
    this.throw();
    this.animateRotation();
  }

  /**
   * Initializes the bottle's position, size, and speed.
   *
   * @param {number} x - Initial x-coordinate.
   * @param {number} y - Initial y-coordinate.
   * @param {number} direction - Direction multiplier for horizontal speed.
   */
  initPosition(x, y, direction) {
    this.x = x - 10;
    this.y = y + 45;
    this.width = 80;
    this.height = 80;
    this.speedX = 10 * direction;
    this.speedY = 15;
  }

  /**
   * Loads rotation and splash images into memory.
   *
   */
  initImages() {
    this.IMAGES_BOTTLE_ROTATION = this.getRotationImages();
    this.IMAGES_BOTTLE_SPLASH = this.getSplashImages();
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
  }

  /**
   * Initializes sound effects for throwing and breaking the bottle.
   *
   */
  initSounds() {
    this.throwSound = new Audio("assets/audio/bottle-throw-sound.mp3");
    this.throwSound.volume = 0.005;
    this.bottleBreakSound = new Audio("assets/audio/bottle-break.mp3");
    this.bottleBreakSound.volume = 0.005;
  }

  /**
   * Plays the throw sound and starts the throwing motion.
   *
   */
  throw() {
    this.throwSound.play();
    this.startThrowMotion();
  }

  /**
   * Starts the interval to update the bottle's position until it hits the ground.
   * Handles splash and break logic.
   *
   */
  startThrowMotion() {
    let hasBroken = false;

    let interval = setInterval(() => {
      this.updateThrowPosition();

      if (this.hasHitGround()) {
        clearInterval(interval);
        this.triggerSplash(hasBroken);
        hasBroken = true;
      }
    }, 50);
  }

  /**
   * Updates the bottle's position and speed during throw.
   *
   */
  updateThrowPosition() {
    this.x += this.speedX;
    this.y -= this.speedY;
    this.speedY -= 1;
  }

  /**
   * Checks if the bottle has hit the ground.
   *
   * @returns {boolean} True if bottle has hit the ground.
   */
  hasHitGround() {
    return this.y > 380;
  }

  /**
   * Triggers splash animation and break sound if not already played.
   *
   * @param {boolean} hasBroken - Indicates if the bottle is already broken.
   */
  triggerSplash(hasBroken) {
    this.y = 360;
    this.playSplashAnimation();

    if (!hasBroken) {
      this.playBreakSound();
    }
  }

  /**
   * Plays the bottle break sound from the start.
   *
   */
  playBreakSound() {
    this.bottleBreakSound.currentTime = 0;
    this.bottleBreakSound.play();
  }

  /**
   * Animates the bottle rotation until splash occurs.
   *
   */
  animateRotation() {
    let rotationInterval = setInterval(() => {
      if (this.hasSplashed) {
        clearInterval(rotationInterval);
      } else {
        this.rotateBottleImage();
      }
    }, 100);
  }

  /**
   * Advances to the next rotation image frame.
   *
   */
  rotateBottleImage() {
    this.currentImage =
      (this.currentImage + 1) % this.IMAGES_BOTTLE_ROTATION.length;
    this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentImage]];
  }

  /**
   * Plays splash animation and schedules bottle removal.
   *
   */
  playSplashAnimation() {
    this.hasSplashed = true;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.removeBottle();
  }

  /**
   * Removes the bottle from the game world after a delay.
   *
   */
  removeBottle() {
    setTimeout(() => {
      this.removeFromWorld();
    }, 500);
  }

  /**
   * Removes this bottle instance from the world's throwable objects.
   *
   */
  removeFromWorld() {
    this.world.throwable_objects = this.world.throwable_objects.filter(
      (obj) => obj !== this
    );
  }

  /**
   * Returns the file paths for the bottle rotation images.
   *
   * @returns {string[]} Array of rotation image paths.
   */
  getRotationImages() {
    return [
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];
  }

  /**
   * Returns the file paths for the bottle splash images.
   *
   * @returns {string[]} Array of splash image paths.
   */
  getSplashImages() {
    return [
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];
  }
}

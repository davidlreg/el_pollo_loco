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

  initPosition(x, y, direction) {
    this.x = x - 10;
    this.y = y + 45;
    this.width = 80;
    this.height = 80;
    this.speedX = 10 * direction;
    this.speedY = 15;
  }

  initImages() {
    this.IMAGES_BOTTLE_ROTATION = this.getRotationImages();
    this.IMAGES_BOTTLE_SPLASH = this.getSplashImages();
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
  }

  initSounds() {
    this.throwSound = new Audio("assets/audio/bottle-throw-sound.mp3");
    this.throwSound.volume = 0.05;
    this.bottleBreakSound = new Audio("assets/audio/bottle-break.mp3");
    this.bottleBreakSound.volume = 0.05;
  }

  throw() {
    this.throwSound.play();
    this.startThrowMotion();
  }

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

  updateThrowPosition() {
    this.x += this.speedX;
    this.y -= this.speedY;
    this.speedY -= 1;
  }

  hasHitGround() {
    return this.y > 380;
  }

  triggerSplash(hasBroken) {
    this.y = 360;
    this.playSplashAnimation();

    if (!hasBroken) {
      this.playBreakSound();
    }
  }

  playBreakSound() {
    this.bottleBreakSound.currentTime = 0;
    this.bottleBreakSound.play();
  }

  animateRotation() {
    let rotationInterval = setInterval(() => {
      if (this.hasSplashed) {
        clearInterval(rotationInterval);
      } else {
        this.rotateBottleImage();
      }
    }, 100);
  }

  rotateBottleImage() {
    this.currentImage = (this.currentImage + 1) % this.IMAGES_BOTTLE_ROTATION.length;
    this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentImage]];
  }

  playSplashAnimation() {
    this.hasSplashed = true;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.removeBottle();
  }

  removeBottle() {
    setTimeout(() => {
      this.removeFromWorld();
    }, 500);
  }

  removeFromWorld() {
    this.world.throwable_objects = this.world.throwable_objects.filter(obj => obj !== this);
  }

  getRotationImages() {
    return [
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];
  }

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

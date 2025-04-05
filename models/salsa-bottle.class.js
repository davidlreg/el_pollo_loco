/**
 * Represents a salsa bottle in the game.
 *
 * @class
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {
  y = 350;
  width = 80;
  height = 80;

  offset = {
    top: 20,
    left: 30,
    right: 20,
    bottom: 20,
  };

  SALSA_BOTTLE_IMAGES = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new salsa bottle instance.
   */
  constructor() {
    super().loadImage("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.SALSA_BOTTLE_IMAGES);
    this.x = 300 + Math.random() * 1900;
    this.animate();
  }

  /**
   * Loads an image for the salsa bottle.
   *
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Plays the bottle animation.
   */
  playBottleAnimation() {
    let i = this.currentImage % this.SALSA_BOTTLE_IMAGES.length;
    let path = this.SALSA_BOTTLE_IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  animate() {
    setInterval(() => {
      this.playBottleAnimation();
    }, 500);
  }
}

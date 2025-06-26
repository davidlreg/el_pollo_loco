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

  constructor() {
    super();
    this.initializeSalsaBottle();
  }

  /**
   * Initializes the salsa bottle by loading images, setting position, and starting animation.
   *
   */
  initializeSalsaBottle() {
    this.loadInitialImage();
    this.loadAnimationImages();
    this.setStartPosition();
    this.animate();
  }

  /**
   * Loads the initial image of the salsa bottle.
   *
   */
  loadInitialImage() {
    this.loadImage(this.SALSA_BOTTLE_IMAGES[0]);
  }

  /**
   * Loads all images used for the salsa bottle animation.
   *
   */
  loadAnimationImages() {
    this.loadImages(this.SALSA_BOTTLE_IMAGES);
  }

  /**
   * Sets a random start position for the salsa bottle on the x-axis.
   *
   */
  setStartPosition() {
    this.x = 300 + Math.random() * 1900;
  }

  /**
   * Loads a single image from the given path.
   *
   * @param {string} path - The URL or path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Updates the current image to the next frame in the salsa bottle animation.
   *
   */
  playBottleAnimation() {
    let i = this.currentImage % this.SALSA_BOTTLE_IMAGES.length;
    let path = this.SALSA_BOTTLE_IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Starts the animation loop, switching images every 500ms.
   *
   */
  animate() {
    setInterval(() => this.playBottleAnimation(), 500);
  }
}

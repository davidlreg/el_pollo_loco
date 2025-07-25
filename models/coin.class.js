class Coin extends MovableObject {
  y = 170;
  width = 120;
  height = 120;
  offset = { top: 50, left: 50, right: 50, bottom: 50 };

  COIN_IMAGES = [
    "assets/img/8_coin/coin_1.png",
    "assets/img/8_coin/coin_2.png",
  ];

  constructor() {
    super().loadImage("assets/img/8_coin/coin_1.png");
    this.loadImages(this.COIN_IMAGES);
    this.x = 300 + Math.random() * 1900;
    this.animate();
  }

  /**
   * Loads an image for the coin.
   *
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Plays the coin animation.
   *
   */
  playCoinAnimation() {
    let i = this.currentImage % this.COIN_IMAGES.length;
    let path = this.COIN_IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Starts an interval to play the coin animation every 500 milliseconds.
   *
   */
  animate() {
    setInterval(() => {
      this.playCoinAnimation();
    }, 500);
  }
}

/**
 * Represents a drawable object in a 2D canvas context.
 */
class DrawableObject {
  x = 120;
  y = 280;
  width = 100;
  height = 150;
  img;
  imageCache = {};
  currentImage = 0;
  isLoaded = false;

  constructor() {}

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    let img = new Image();
    img.src = path;
    img.onload = () => {
      this.img = img;
      this.isLoaded = true;
    };
  }

  /**
   * Loads multiple images and stores them in the cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.onload = () => {
        this.imageCache[path] = img;
      };
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

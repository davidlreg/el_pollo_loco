/**
 * Represents a drawable object in a 2D canvas context.
 *
 */
class DrawableObject {
  /**
   * X-coordinate of the object.
   *
   * @type {number}
   */
  x = 120;

  /**
   * Y-coordinate of the object.
   *
   * @type {number}
   */
  y = 280;

  /**
   * Width of the object.
   *
   * @type {number}
   */
  width = 100;

  /**
   * Height of the object.
   *
   * @type {number}
   */
  height = 150;

  /**
   * The image to be drawn.
   *
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for storing multiple images.
   *
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Index of the current image.
   *
   * @type {number}
   */
  currentImage = 0;

  /**
   * Creates a new DrawableObject.
   *
   */
  constructor() {}

  /**
   * Loads an image from the specified path.
   *
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    let img = new Image();
    img.src = path;
    img.onload = () => {
      this.img = img;
      console.log("Bild erfolgreich geladen:", path);
    };
    img.onerror = () => console.error("Fehler: Bild nicht gefunden!", path);
  }

  /**
   * Loads multiple images and stores them in the imageCache.
   *
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */

  draw(ctx) {
    if (!this.img) {
      console.error("Fehler: Bild ist noch nicht geladen!", this.img);
      return; // Zeichne nichts, wenn das Bild fehlt
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

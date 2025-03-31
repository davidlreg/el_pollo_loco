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

  constructor(x, y, world, direction) {
    super();
    this.x = x;
    this.y = y;
    this.width = 80; // Breite setzen
    this.height = 80; //Höhe setzen
    this.speedX = 10 * direction; // Richtung berücksichtigen
    this.speedY = 15;
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.world = world;
    this.throw();
    this.animateRotation();
  }

  throw() {
    let interval = setInterval(() => {
      this.x += this.speedX; // Bewegt das Objekt nach vorne
      this.y -= this.speedY; // Lässt die Flasche steigen
      this.speedY -= 1; // Verringert die Steigung (Schwerkraft)

      // Löscht das Objekt, wenn es aus dem Bildschirm fliegt
      // Bedingung: Wenn die Flasche den Boden (z. B. y > 380) berührt
      if (this.y > 380) {
        this.y = 360; // Setze die Flasche genau auf den Boden
        clearInterval(interval); // Stoppe die Bewegung
        this.playSplashAnimation();
      }
    }, 50);
  }

  animateRotation() {
    let rotationInterval = setInterval(() => {
      if (!this.hasSplashed) {
        this.currentImage = (this.currentImage + 1) % this.IMAGES_BOTTLE_ROTATION.length;
        this.img = this.imageCache[this.IMAGES_BOTTLE_ROTATION[this.currentImage]];
      } else {
        clearInterval(rotationInterval); // Stoppe die Rotation, wenn die Flasche zerschellt
      }
    }, 100);
  }

  playSplashAnimation() {
    this.hasSplashed = true; // Setzt den Zustand auf "zerbrochen"
    let i = 0;
    let splashInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[i]];
      i++;

      if (i >= this.IMAGES_BOTTLE_SPLASH.length) {
        clearInterval(splashInterval);
        this.removeBottle(); // Flasche nach Animation löschen
      }
    }, 100);
  }

  removeBottle() {
    setTimeout(() => {
      this.world.throwable_objects = this.world.throwable_objects.filter((obj) => obj !== this);
    }, 500);
  }
}

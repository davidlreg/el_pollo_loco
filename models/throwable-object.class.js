class ThrowableObject extends MovableObject {
  speedX;
  speedY;
  world; // Füge eine `world`-Eigenschaft hinzu

  IMAGES_BOTTLE_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, world, direction) {
    super().loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.speedX = 10 * direction; // Richtung berücksichtigen
    this.speedY = 15;
    this.world = world; // Weist das `world`-Objekt zu
    this.throw();
  }

  throw() {
    let interval = setInterval(() => {
      this.x += this.speedX; // Bewegt das Objekt nach vorne
      this.y -= this.speedY; // Lässt die Flasche steigen
      this.speedY -= 1; // Verringert die Steigung (Schwerkraft)

      // Löscht das Objekt, wenn es aus dem Bildschirm fliegt
      // Bedingung: Wenn die Flasche den Boden (z. B. y > 350) berührt
      if (this.y > 350) {
        clearInterval(interval); // Stoppe die Bewegung
        this.world.throwable_objects = this.world.throwable_objects.filter(
          (obj) => obj !== this
        ); // Entferne das Objekt aus dem Array
      }
    }, 50);
  }
}

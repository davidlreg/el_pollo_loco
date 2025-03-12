class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 720;

  constructor() {
    super().loadImage("asssets/img/5_background/layers/4_clouds/full.png");

    this.x = 0;
  }

  move() {
    this.x -= this.speed; // Bewege die Wolke nach links

    // Wenn die Wolke aus dem Bild verschwindet, setze sie wieder nach rechts
    // TODO Wolken werden nicht angezeigt wenn Spieler weiter als 720 px nach rechts gelaufen ist!!!
    if (this.x + this.width < 0) {
      this.x = 720;
    }
  }
}

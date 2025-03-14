class StatusBarHealth extends StatusBar {
  IMAGE_HEALTH = ["asssets/img/7_statusbars/3_icons/icon_health.png"];

  constructor() {
    super().loadImage(this.IMAGE_HEALTH);

    this.x = 100;
    this.y = 15;
  }

  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.health);
  }

  updateHealthBar(energy) {
    // Hier wird die Gesundheit basierend auf der Energie des Charakters gesetzt
    if (energy > 80) {
      this.health = 5;
    } else if (energy > 60) {
      this.health = 4;
    } else if (energy > 40) {
      this.health = 3;
    } else if (energy > 20) {
      this.health = 2;
    } else if (energy > 0) {
      this.health = 1;
    } else {
      this.health = 0;
    }
  }
}

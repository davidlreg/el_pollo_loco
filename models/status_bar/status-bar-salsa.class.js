class StatusBarSalsa extends StatusBar {
  IMAGE_SALSA_BOTTLE = ["assets/img/7_statusbars/3_icons/icon_salsa_bottle.png"];

  constructor() {
    super().loadImage(this.IMAGE_SALSA_BOTTLE);

    this.x = 0;
    this.y = 15;
  }

  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.salsaBottles);
  }
}

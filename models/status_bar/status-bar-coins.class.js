class StatusBarCoins extends StatusBar {
  IMAGE_COIN = ["assets/img/7_statusbars/3_icons/icon_coin.png"];

  constructor() {
    super().loadImage(this.IMAGE_COIN);

    this.x = 200;
    this.y = 15;
  }

  draw(ctx) {
    super.draw(ctx);
    this.drawValue(ctx, this.coins);
  }
}

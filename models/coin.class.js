class Coin {
  y = 170;
  width = 120;
  height = 120;

  COIN_IMAGE_1 = ["asssets/img/8_coin/coin_1.png"];
  COIN_IMAGE_2 = ["asssets/img/8_coin/coin_2.png"];

  constructor() {
    this.loadImage(this.COIN_IMAGE_1);
    // this.loadImage(this.COIN_IMAGE_2);

    this.x = 300 + Math.random() * 2100;

    // this.animate();
  }

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('img')  --> <img id="img" src"")>
    this.img.src = path;
  }
}

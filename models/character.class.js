class Character extends MovableObject {
  x = 60;
  y = 165;
  width = 120;
  height = 260;

  constructor() {
    super().loadImage("asssets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages([
      "asssets/img/2_character_pepe/1_idle/idle/I-1.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-2.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-3.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-4.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-5.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-6.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-7.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-8.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-9.png",
      "asssets/img/2_character_pepe/1_idle/idle/I-10.png",
    ]);
  }

  jump() {}

  // throwBottle() {

  // }
}

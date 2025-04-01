/**
 * Creates a new game level with specified elements.
 *
 * @param {Array<Chicken|Endboss>} enemies - Enemies in the level
 * @param {Array<Cloud>} clouds - Clouds in the level
 * @param {Array<Coin>} coins - Collectable coins in the level
 * @param {Array<Coin>} salsaBottles - Collectable salsa bottles in the level
 * @param {Array<BackgroundObject>} backgroundObjects - Background layers with positioning
 * @returns {Level} New Level instance
 */
const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud()],
  [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
  [new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle()],
  [
    new BackgroundObject("assets/img/5_background/layers/air.png", -719),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719 * 3),
  ]
);

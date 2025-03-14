/**
 * Creates a new game level with the specified elements.
 *
 * @constructor
 * @param {Array<Chicken|Endboss>} enemies - Collection of enemy characters in the level
 * @param {Array<Cloud>} clouds - Collection of cloud objects in the level
 * @param {Array<Coin>} coins - Collection of collectable coins in the level
 * @param {Array<Coin>} salsaBottles - Collection of collectable salsa bottles in the level
 * @param {Array<BackgroundObject>} backgroundObjects - Collection of background layers with positioning
 * @returns {Level} New Level instance with the specified game elements
 */
const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud()],
  [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
  [new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle(), new SalsaBottle()],
  [
    new BackgroundObject("asssets/img/5_background/layers/air.png", -719),
    new BackgroundObject("asssets/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("asssets/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("asssets/img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("asssets/img/5_background/layers/air.png", 0),
    new BackgroundObject("asssets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("asssets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("asssets/img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("asssets/img/5_background/layers/air.png", 719),
    new BackgroundObject("asssets/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("asssets/img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("asssets/img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("asssets/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("asssets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("asssets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("asssets/img/5_background/layers/1_first_layer/1.png", 719 * 2),

    new BackgroundObject("asssets/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("asssets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("asssets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("asssets/img/5_background/layers/1_first_layer/2.png", 719 * 3),
  ]
);

let level1;

function initLevelOne() {
  level1 = new Level(
    [new Chicken(), new Chicken(), new SmallChicken(), new Chicken(), new SmallChicken(), new Chicken(), new SmallChicken()],
    generateClouds(),
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
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
}

/**
 * Generates an array of cloud objects positioned along the x-axis.
 * @returns {Cloud[]} An array of Cloud instances.
 */
function generateClouds() {
  let clouds = [];
  for (let i = 0; i < 5; i++) {
    let cloud = new Cloud();
    cloud.x = i * 720;
    clouds.push(cloud);
  }
  return clouds;
}

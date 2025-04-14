class Level {
  /**
   * @type {Array} List of enemies in the level
   */
  enemies;

  /**
   * @type {Array} List of clouds in the level
   */
  clouds;

  /**
   * @type {Array} List of coins in the level
   */
  coins;

  /**
   * @type {Array} List of salsa bottles in the level
   */
  salsaBottles;

  /**
   * @type {Array} List of background objects in the level
   */
  backgroundObjects;

  /**
   * @type {number} X-coordinate where the level ends
   */
  level_end_x = 2200;

  constructor(enemies, clouds, coins, salsaBottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.salsaBottles = salsaBottles;
    this.backgroundObjects = backgroundObjects;
  }
}

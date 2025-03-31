/**
 * Represents a playable character in the game that extends MovableObject
 *
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * Reference to the game world
   *
   */
  world;
  /**
   * Horizontal position of the character
   *
   */
  x = 0;
  /**
   * Vertical position of the character (Default: 165)
   *
   */
  y = 165;
  /**
   * Width of the character sprite
   *
   */
  width = 120;
  /**
   * Height of the character sprite
   *
   */
  height = 260;
  /**
   * Horizontal movement speed (Default: 4)
   *
   */
  speedX = 4;

  /**
   * Collision offset values for the character
   *
   * @type {Object}
   */
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 10,
  };

  lastThrowTime = 0;
  throwCooldown = 1000; // Cooldown in Millisekunden (1 Sekunde)

  /**
   * Array of image paths for idle animation
   *
   */
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Array of image paths for walking animation
   *
   */
  IMAGES_MOVE = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of image paths for jumping animation
   *
   */
  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Array of image paths for hurt animation
   *
   */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Array of image paths for death animation
   *
   */
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates a new Character instance, loads images and sets up animations
   *
   * @constructor
   */
  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_MOVE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  /**
   * Moves the character to the left
   *
   */
  characterMoveLeft() {
    this.x -= this.speedX;
    this.otherDirection = true;
  }

  /**
   * Moves the character to the right
   *
   */
  characterMoveRight() {
    this.x += this.speedX;
    this.otherDirection = false;
  }

  characterThrowBottle() {
    let currentTime = new Date().getTime();

    if (currentTime - this.lastThrowTime >= this.throwCooldown) {
      console.log("Throwing Salsa-Bottle");
      this.world.status_bar_salsa.salsaBottles--;

      let offsetX = this.otherDirection ? -20 : 50;
      let direction = this.otherDirection ? -1 : 1; // -1 für links, 1 für rechts

      let bottle = new ThrowableObject(
        this.x + offsetX + this.world.camera_x,
        this.y + 100,
        this.world,
        direction
      );

      this.world.throwable_objects.push(bottle);
      bottle.throw();
      this.lastThrowTime = currentTime;
    }
  }

  /**
   * Checks if the character is currently above ground level
   *
   * @returns {boolean} True if character is above ground
   */
  isCharacterAboveGround() {
    return this.y < 165;
  }

  /**
   * Plays the idle animation for the character
   *
   */
  playIdleAnimation() {
    let i = this.currentImage % this.IMAGES_IDLE.length;
    let path = this.IMAGES_IDLE[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Sets up animation intervals for character movements and states
   *
   */
  animate() {
    // Animates the Idle-Animation
    setInterval(() => {
      this.playIdleAnimation();
    }, 175);

    // Animates the Jumping- and Moving-Animation
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isCharacterAboveGround()) {
        // Jump Animation
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
          // Walk animation
          this.playAnimation(this.IMAGES_MOVE);
        }
      }
    }, 175);

    // Character Move Right / Left / Jump / Throw
    setInterval(() => {
      // Funktion um den Charakter nach Rechts zu bewegen
      if (
        this.world.keyboard.moveRight &&
        this.x < this.world.level.level_end_x
      ) {
        this.characterMoveRight();
      }
      // Funktion um den Charakter nach Links zu bewegen
      if (this.world.keyboard.moveLeft && this.x > -60) {
        this.characterMoveLeft();
      }
      // Funktion um den Charakter springen zu lassen
      if (this.world.keyboard.jump && !this.isCharacterAboveGround()) {
        this.jump();
      }
      if (
        this.world.keyboard.throwBottle &&
        this.world.status_bar_salsa.salsaBottles > 0
      ) {
        this.characterThrowBottle();
      }
      // Lässt die Kammera sich mit dem Charactewr mitbewegen
      this.world.camera_x = -this.x + 60;
    }, 1000 / 60);
  }
}

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

  /**
   * Array of image paths for idle animation
   *
   */
  IMAGES_IDLE = [
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
  ];

  /**
   * Array of image paths for walking animation
   *
   */
  IMAGES_MOVE = [
    "asssets/img/2_character_pepe/2_walk/W-21.png",
    "asssets/img/2_character_pepe/2_walk/W-22.png",
    "asssets/img/2_character_pepe/2_walk/W-23.png",
    "asssets/img/2_character_pepe/2_walk/W-24.png",
    "asssets/img/2_character_pepe/2_walk/W-25.png",
    "asssets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of image paths for jumping animation
   *
   */
  IMAGES_JUMPING = [
    "asssets/img/2_character_pepe/3_jump/J-31.png",
    "asssets/img/2_character_pepe/3_jump/J-32.png",
    "asssets/img/2_character_pepe/3_jump/J-33.png",
    "asssets/img/2_character_pepe/3_jump/J-34.png",
    "asssets/img/2_character_pepe/3_jump/J-35.png",
    "asssets/img/2_character_pepe/3_jump/J-36.png",
    "asssets/img/2_character_pepe/3_jump/J-37.png",
    "asssets/img/2_character_pepe/3_jump/J-38.png",
    "asssets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Array of image paths for hurt animation
   *
   */
  IMAGES_HURT = ["asssets/img/2_character_pepe/4_hurt/H-41.png", "asssets/img/2_character_pepe/4_hurt/H-42.png", "asssets/img/2_character_pepe/4_hurt/H-43.png"];

  /**
   * Array of image paths for death animation
   *
   */
  IMAGES_DEAD = [
    "asssets/img/2_character_pepe/5_dead/D-51.png",
    "asssets/img/2_character_pepe/5_dead/D-52.png",
    "asssets/img/2_character_pepe/5_dead/D-53.png",
    "asssets/img/2_character_pepe/5_dead/D-54.png",
    "asssets/img/2_character_pepe/5_dead/D-55.png",
    "asssets/img/2_character_pepe/5_dead/D-56.png",
    "asssets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates a new Character instance, loads images and sets up animations
   *
   * @constructor
   */
  constructor() {
    super().loadImage("asssets/img/2_character_pepe/1_idle/idle/I-1.png");
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

    // Character Move Right / Left / Jump
    setInterval(() => {
      // Funktion um den Charakter nach Rechts zu bewegen
      if (this.world.keyboard.moveRight && this.x < this.world.level.level_end_x) {
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
      // Lässt die Kammera sich mit dem Charactewr mitbewegen
      this.world.camera_x = -this.x + 60;
    }, 1000 / 60);
  }
}

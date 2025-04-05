/**
 * Represents a playable character in the game.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
  world;
  x = 0;
  y = 165;
  width = 120;
  height = 260;
  speedX = 4;
  walkingSound = new Audio(
    "assets/audio/character-footsteps.wav"
  );
  jumpingSound = new Audio(
    "assets/audio/character-jump-soundeffect.mp3"
  );

  /**
   * Collision offset values.
   * @type {Object}
   */
  offset = { top: 120, left: 30, right: 40, bottom: 10 };

  lastThrowTime = 0;
  throwCooldown = 1000;

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

  IMAGES_MOVE = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

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

  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

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
   * Initializes the character, loads images, and starts animations.
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
   * Moves the character left.
   */
  characterMoveLeft() {
    this.x -= this.speedX;
    this.otherDirection = true;
    if (!this.isCharacterAboveGround()) {
      this.playWalkingSound();
    }
  }

  /**
   * Moves the character right.
   */
  characterMoveRight() {
    this.x += this.speedX;
    this.otherDirection = false;
    if (!this.isCharacterAboveGround()) {
      this.playWalkingSound();
    }
  }

  /**
   * Spielt den Geh-Sound ab, wenn er nicht bereits läuft.
   */
  playWalkingSound() {
    if (this.walkingSound.paused && !this.isCharacterAboveGround()) {
      this.walkingSound.loop = true;
      this.walkingSound.volume = 0.2;
      this.walkingSound.play();
    }
  }

  /**
   * Stoppt den Geh-Sound, wenn der Charakter nicht mehr läuft.
   */
  stopWalkingSound() {
    if (
      (!this.world.keyboard.moveLeft && !this.world.keyboard.moveRight) ||
      this.isCharacterAboveGround()
    ) {
      this.walkingSound.pause();
      this.walkingSound.currentTime = 0; // Zurücksetzen für den nächsten Start
    }
  }

  /**
   * Throws a bottle if cooldown allows.
   */
  characterThrowBottle() {
    let currentTime = new Date().getTime();

    if (currentTime - this.lastThrowTime >= this.throwCooldown) {
      this.world.status_bar_salsa.salsaBottles--;
      let offsetX = this.otherDirection ? -20 : 50;
      let direction = this.otherDirection ? -1 : 1;
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
   * Checks if the character is above the ground.
   * @returns {boolean} True if above ground.
   */
  isCharacterAboveGround() {
    return this.y < 165;
  }

  /**
   * Plays the idle animation.
   */
  playIdleAnimation() {
    let i = this.currentImage % this.IMAGES_IDLE.length;
    let path = this.IMAGES_IDLE[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Handles animation logic.
   */
  animate() {
    setInterval(() => {
      this.playIdleAnimation();
    }, 175);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isCharacterAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
          this.playAnimation(this.IMAGES_MOVE);
        }
      }
    }, 175);

    setInterval(() => {
      if (
        this.world.keyboard.moveRight &&
        this.x < this.world.level.level_end_x
      ) {
        this.characterMoveRight();
      }
      if (this.world.keyboard.moveLeft && this.x > -60) {
        this.characterMoveLeft();
      }
      if (this.world.keyboard.jump && !this.isCharacterAboveGround()) {
        this.jump();
      }
      if (
        this.world.keyboard.throwBottle &&
        this.world.status_bar_salsa.salsaBottles > 0
      ) {
        this.characterThrowBottle();
      }

      // Sound stoppen, wenn kein Bewegungs-Input
      this.stopWalkingSound();

      this.world.camera_x = -this.x + 60;
    }, 1000 / 60);
  }
}

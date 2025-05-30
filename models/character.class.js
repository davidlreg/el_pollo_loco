class Character extends MovableObject {
  world;
  x = 0;
  y = 165;
  width = 120;
  height = 260;
  offset = { top: 120, left: 30, right: 40, bottom: 10 };
  speedX = 4;
  speedY = 0;
  lastThrowTime = 0;
  throwCooldown = 1000;
  intervalIds = [];
  sleepMode = false;
  hasPlayedDeathSound = false;
  isFallingAfterDeath = false;
  lastInputTime = Date.now();
  walkingSound = new Audio("assets/audio/character-footsteps.wav");
  jumpingSound = new Audio("assets/audio/character-jump-soundeffect.mp3");
  characterDeadSound = new Audio("assets/audio/character-dead.mp3");
  characterSnoringSound = new Audio("assets/audio/snoring-sound.mp3");

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

  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
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

  IMAGES_HURT = ["assets/img/2_character_pepe/4_hurt/H-41.png", "assets/img/2_character_pepe/4_hurt/H-42.png", "assets/img/2_character_pepe/4_hurt/H-43.png"];

  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.initCharacterImages();
    this.applyGravity();
    this.animate();
  }

  initCharacterImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_MOVE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Plays the idle animation.
   */
  playIdleAnimation() {
    if (!this.sleepMode) {
      let i = this.currentImage % this.IMAGES_IDLE.length;
      let path = this.IMAGES_IDLE[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  playSnoringSound() {
    if (this.characterSnoringSound.paused) {
      this.characterSnoringSound.volume = 0.05;
      this.characterSnoringSound.loop = true;
      this.characterSnoringSound.play();
    }
  }

  stopSnoringSound() {
    this.characterSnoringSound.pause();
    this.characterSnoringSound.currentTime = 0;
  }

  moveCharacter(direction) {
    this.x += direction * this.speedX;
    this.otherDirection = direction < 0;
    if (!this.isCharacterAboveGround()) {
      this.playWalkingSound();
    }
  }

  /**
   * Plays the walking sound if not already playing.
   */
  playWalkingSound() {
    if (this.walkingSound.paused && !this.isCharacterAboveGround()) {
      this.walkingSound.loop = true;
      this.walkingSound.volume = 0.02;
      this.walkingSound.play();
    }
  }

  /**
   * Stops the walking sound when the character is idle or in the air.
   */
  stopWalkingSound() {
    if ((!this.world.keyboard.moveLeft && !this.world.keyboard.moveRight) || this.isCharacterAboveGround()) {
      this.walkingSound.pause();
      this.walkingSound.currentTime = 0;
    }
  }

  /**
   * Throws a bottle if the cooldown has passed.
   */
  characterThrowBottle() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastThrowTime >= this.throwCooldown) {
      this.world.status_bar_salsa.salsaBottles--;
      let offsetX = this.otherDirection ? -20 : 50;
      let direction = this.otherDirection ? -1 : 1;
      let bottle = new ThrowableObject(this.x + offsetX + this.world.camera_x, this.y + 100, this.world, direction);
      this.world.throwable_objects.push(bottle);
      bottle.throw();
      this.lastThrowTime = currentTime;
    }
  }

  /**
   * Handles character death behavior.
   * Displays game over and plays death sound.
   */
  characterDead() {
    if (!this.hasPlayedDeathSound) {
      this.characterDeadSound.volume = 0.025;
      this.characterDeadSound.play();
      this.hasPlayedDeathSound = true;
      this.speedY = 20;
      this.isFallingAfterDeath = true;
    }
    this.stopSnoringSound();
    this.playAnimation(this.IMAGES_DEAD);
    this.world.isGameOver();
  }

  /**
   * Checks whether the character is above ground.
   * @returns {boolean} True if character is above ground.
   */
  isCharacterAboveGround() {
    return this.y < 165;
  }

  animate() {
    this.startSleepAnimationLoop();
    this.startInputTrackingLoop();
    this.startAnimationUpdateLoop();
    this.startMovementAndCameraLoop();
  }

  startSleepAnimationLoop() {
    const id = setInterval(() => {
      if (this.sleepMode && !this.isDead()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.playSnoringSound();
      } else {
        this.playIdleAnimation();
        this.stopSnoringSound();
      }
    }, 175);
    this.intervalIds.push(id);
  }

  startInputTrackingLoop() {
    const id = setInterval(() => {
      const now = Date.now();
      const inactive = now - this.lastInputTime > 12000;

      if (inactive && !this.sleepMode) {
        this.sleepMode = true;
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }

      if (this.anyKeyPressed()) {
        this.lastInputTime = now;
        if (this.sleepMode) {
          this.sleepMode = false;
          this.playIdleAnimation();
        }
      }
    }, 100);
    this.intervalIds.push(id);
  }

  anyKeyPressed() {
    const keyboard = this.world.keyboard;
    return keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.throwBottle;
  }

  startAnimationUpdateLoop() {
    const id = setInterval(() => {
      if (this.isDead()) {
        this.characterDead();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isCharacterAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
        this.playAnimation(this.IMAGES_MOVE);
      }
    }, 175);
    this.intervalIds.push(id);
  }

  startMovementAndCameraLoop() {
    const id = setInterval(() => {
      if (!this.isDead()) {
        this.handleMovementInput();
      }
      this.stopWalkingSound();
      this.updateCamera();
    }, 1000 / 60);
    this.intervalIds.push(id);
  }

  handleMovementInput() {
    const keyboard = this.world.keyboard;
    if (keyboard.moveRight && this.x < this.world.level.level_end_x) {
      this.moveCharacter(1);
      this.stopSnoringSound();
    }
    if (keyboard.moveLeft && this.x > -60) {
      this.moveCharacter(-1);
      this.stopSnoringSound();
    }
    if (keyboard.jump && !this.isCharacterAboveGround()) {
      this.jump();
      this.stopSnoringSound();
    }
    if (keyboard.throwBottle && this.world.status_bar_salsa.salsaBottles > 0) {
      this.characterThrowBottle();
      this.stopSnoringSound();
    }
  }

  updateCamera() {
    this.world.camera_x = -this.x + 60;
  }

  stopAllIntervals() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];
  }

  stopAllSounds() {
    this.walkingSound.pause();
    this.walkingSound.currentTime = 0;
    this.jumpingSound.pause();
    this.jumpingSound.currentTime = 0;
    this.characterDeadSound.pause();
    this.characterDeadSound.currentTime = 0;
    this.characterSnoringSound.pause();
    this.characterSnoringSound.currentTime = 0;
  }
}

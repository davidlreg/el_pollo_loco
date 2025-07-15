class MovableObject extends DrawableObject {
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  enemyDownSound = new Audio("assets/audio/enemy-down.mp3");

  /**
   * Plays an animation by cycling through a set of images.
   *
   * @param {string[]} images - Array of image paths
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Handles object movement and animation.
   *
   * @TODO Implement custom movement logic
   */
  animate() {
    this.moveLeft();
    this.walkingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }

  /**
   * Moves the object to the left.
   *
   */
  moveLeft() {
    if (this.endbossDeath) return;
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Makes the object jump by setting its vertical speed.
   *
   */
  jump() {
    this.speedY = 16.5;
    if (this instanceof Character) {
      this.jumpingSound.volume = 0.001;
      this.jumpingSound.play();
    }
  }

  /**
   * Checks if object should apply gravity effects
   *
   * @returns {boolean} True if gravity should be applied
   */
  shouldApplyGravity() {
    return (
      this.isCharacterAboveGround() ||
      this.speedY > 0 ||
      this.isFallingAfterDeath
    );
  }

  /**
   * Updates object position and speed due to gravity
   *
   */
  updatePositionAndSpeed() {
    this.y -= this.speedY;
    this.speedY -= this.acceleration;
  }

  /**
   * Handles ground collision and stops falling
   *
   */
  handleGroundCollision() {
    if (this.y >= 165 && !this.isFallingAfterDeath) {
      this.y = 165;
      this.speedY = 0;
    }
  }

  /**
   * Handles character death fall completion
   *
   */
  handleDeathFallCompletion() {
    if (this instanceof Character && this.y > 600) {
      this.speedY = 0;
      this.isFallingAfterDeath = false;
    }
  }

  /**
   * Applies gravity to the object, making it fall if not on the ground
   *
   */
  applyGravity() {
    setInterval(() => {
      if (this.shouldApplyGravity()) {
        this.updatePositionAndSpeed();
        this.handleGroundCollision();
        this.handleDeathFallCompletion();
      }
    }, 1000 / 60);
  }

  /**
   * Handles the death of the object, stopping movement and playing sound.
   *
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;
    this.speed = 0;
    clearInterval(this.walkingInterval);
    let enemyDownSound = new Audio("assets/audio/enemy-down.mp3");
    enemyDownSound.volume = 0.05;
    enemyDownSound.play();
    this.loadImage(this.IMAGE_DEAD);
    setTimeout(() => {
      const index = world.level.enemies.indexOf(this);
      if (index > -1) {
        world.level.enemies.splice(index, 1);
      }
    }, 800);
  }

  /**
   * Calculates collision bounds for an object
   *
   * @param {MovableObject} obj - Object to calculate bounds for
   * @returns {Object} Object with left, right, top, bottom bounds
   */
  getCollisionBounds(obj) {
    return {
      left: obj.x + obj.offset.left,
      right: obj.x + obj.width - obj.offset.right,
      top: obj.y + obj.offset.top,
      bottom: obj.y + obj.height - obj.offset.bottom,
    };
  }

  /**
   * Checks if collision should be ignored between objects
   *
   * @param {MovableObject} mo - Other movable object
   * @returns {boolean} True if collision should be ignored
   */
  shouldIgnoreCollision(mo) {
    return (
      (this instanceof ThrowableObject && mo instanceof Character) ||
      (this instanceof Character && mo instanceof ThrowableObject)
    );
  }

  /**
   * Checks if two bounding boxes overlap
   *
   * @param {Object} bounds1 - First object bounds
   * @param {Object} bounds2 - Second object bounds
   * @returns {boolean} True if bounds overlap
   */
  boundsOverlap(bounds1, bounds2) {
    return (
      bounds1.right > bounds2.left &&
      bounds1.left < bounds2.right &&
      bounds1.bottom > bounds2.top &&
      bounds1.top < bounds2.bottom
    );
  }

  /**
   * Checks if this object is colliding with another movable object
   *
   * @param {MovableObject} mo - Another movable object
   * @returns {boolean} True if colliding, otherwise false
   */
  isColliding(mo) {
    if (this.shouldIgnoreCollision(mo)) {
      return false;
    }
    const thisBounds = this.getCollisionBounds(this);
    const moBounds = this.getCollisionBounds(mo);
    return this.boundsOverlap(thisBounds, moBounds);
  }

  /**
   * Reduces energy by damage amount and ensures minimum value
   *
   * @param {number} damage - Amount of damage to apply
   */
  applyDamage(damage) {
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;
  }

  /**
   * Plays hurt sound effect
   *
   */
  playHurtSound() {
    let hurtSound = new Audio("assets/audio/character-pain.mp3");
    hurtSound.volume = 0.02;
    hurtSound.play();
  }

  /**
   * Updates health bar if it exists
   *
   */
  updateHealthDisplay() {
    if (this.statusBarHealth) {
      this.statusBarHealth.updateHealthBar(this.energy);
    }
  }

  /**
   * Wakes up character from sleep mode if applicable
   *
   */
  wakeUpCharacter() {
    if (this instanceof Character && this.sleepMode) {
      this.sleepMode = false;
      this.lastInputTime = new Date().getTime();
    }
  }

  /**
   * Reduces the object's energy by given damage amount when hit
   *
   * @param {number} damage - Amount of energy to reduce
   */
  hit(damage = 20) {
    if (this.isHurt()) return;
    this.applyDamage(damage);
    this.playHurtSound();
    this.lastHit = new Date().getTime();
    this.updateHealthDisplay();
    this.wakeUpCharacter();
  }

  /**
   * Checks if the object has been recently hurt.
   *
   * @returns {boolean} True if hurt within the last 0.8 seconds
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed / 1000 < 0.8;
  }

  /**
   * Updates the health bar based on the energy level.
   *
   * @param {StatusBarHealth} statusBarHealth - The status bar health object
   */
  updateHealthBarStatus(statusBarHealth) {
    statusBarHealth.updateHealthBar(this.energy);
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} True if energy is 0
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Plays the splash animation when the bottle hits the ground.
   *
   */
  playSplashAnimation() {
    this.hasSplashed = true;
    let i = 0;
    let splashInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[i]];
      i++;
      if (i >= this.IMAGES_BOTTLE_SPLASH.length) {
        clearInterval(splashInterval);
        this.removeBottle();
      }
    }, 100);
  }
}

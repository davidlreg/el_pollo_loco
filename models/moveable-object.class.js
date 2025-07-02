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
   * Applies gravity to the object, making it fall if not on the ground.
   *
   */
  applyGravity() {
    setInterval(() => {
      if (
        this.isCharacterAboveGround() ||
        this.speedY > 0 ||
        this.isFallingAfterDeath
      ) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this.y >= 165 && !this.isFallingAfterDeath) {
          this.y = 165;
          this.speedY = 0;
        }

        if (this instanceof Character && this.y > 600) {
          this.speedY = 0;
          this.isFallingAfterDeath = false;
        }
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
   * Draws the object's hitbox for debugging purposes.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context
   */
  drawHitbox(ctx) {
    const isRelevant =
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof ThrowableObject ||
      this instanceof Endboss;

    if (!isRelevant) return;

    const thisLeft = this.x + this.offset.left;
    const thisTop = this.y + this.offset.top;
    const thisWidth = this.width - this.offset.left - this.offset.right;
    const thisHeight = this.height - this.offset.top - this.offset.bottom;

    let hit = false;

    if (this.world) {
      const allObjects = [
        ...this.world.level.enemies,
        ...this.world.throwable_objects,
        this.world.character,
        this.world.endboss,
      ];

      hit = allObjects.some((obj) => {
        if (obj === this || typeof obj.isColliding !== "function") return false;
        return this.isColliding(obj);
      });
    }

    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = hit ? "lime" : "red";
    ctx.rect(thisLeft, thisTop, thisWidth, thisHeight);
    ctx.stroke();
  }

  /**
   * Checks if this object is colliding with another movable object.
   *
   * @param {MovableObject} mo - Another movable object
   * @returns {boolean} True if colliding, otherwise false
   */
  isColliding(mo) {
    const thisLeft = this.x + this.offset.left;
    const thisRight = this.x + this.width - this.offset.right;
    const thisTop = this.y + this.offset.top;
    const thisBottom = this.y + this.height - this.offset.bottom;
    const moLeft = mo.x + mo.offset.left;
    const moRight = mo.x + mo.width - mo.offset.right;
    const moTop = mo.y + mo.offset.top;
    const moBottom = mo.y + mo.height - mo.offset.bottom;

    if (
      (this instanceof ThrowableObject && mo instanceof Character) ||
      (this instanceof Character && mo instanceof ThrowableObject)
    ) {
      return false;
    }

    return (
      thisRight > moLeft &&
      thisLeft < moRight &&
      thisBottom > moTop &&
      thisTop < moBottom
    );
  }

  /**
   * Reduces the object's energy when hit.
   *
   */
  hit() {
    if (this.isHurt()) {
      return;
    }
    this.energy -= 20; // 20 Default / 0 = Godmode
    let hurtSound = new Audio("assets/audio/character-pain.mp3");
    hurtSound.play();
    hurtSound.volume = 0.02;
    if (this.energy <= 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
    if (this.statusBarHealth) {
      this.statusBarHealth.updateHealthBar(this.energy);
    }
    if (this instanceof Character && this.sleepMode) {
      this.sleepMode = false;
      this.lastInputTime = new Date().getTime();
    }
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

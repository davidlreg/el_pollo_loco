class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  enemyDownSound = new Audio("assets/audio/enemy-down.mp3");

  /**
   * Plays an animation by cycling through a set of images.
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
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 16.5;
    if (this instanceof Character) {
      this.jumpingSound.volume = 0.02;
      this.jumpingSound.play();
    }
  }

  /**
   * Applies gravity to the object, making it fall if not on the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isCharacterAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y >= 165) {
          this.y = 165;
          this.speedY = 0;
        }
      }
    }, 1000 / 60);
  }

  /**
   * Handles the death of the object, stopping movement and playing sound.
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;
    this.speed = 0;
    clearInterval(this.walkingInterval);
    this.enemyDownSound.volume = 0.3;
    this.enemyDownSound.play();
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
   * @param {CanvasRenderingContext2D} ctx - The rendering context
   */
  drawHitbox(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Coin ||
      this instanceof SalsaBottle ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - Another movable object
   * @returns {boolean} True if colliding, otherwise false
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy when hit.
   */
  hit() {
    if (this.isHurt()) {
      return;
    }
    this.energy -= 20;
    let hurtSound = new Audio("assets/audio/character-pain.mp3");
    hurtSound.play();
    hurtSound.volume = 0.25;
    if (this.energy <= 0) {
      this.energy = 0;
    }
    this.lastHit = new Date().getTime();
    if (this.statusBarHealth) {
      this.statusBarHealth.updateHealthBar(this.energy);
    }
  }

  /**
   * Checks if the object has been recently hurt.
   * @returns {boolean} True if hurt within the last 0.8 seconds
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed / 1000 < 0.8;
  }

  /**
   * Updates the health bar based on the energy level.
   * @param {StatusBarHealth} statusBarHealth - The status bar health object
   */
  updateHealthBarStatus(statusBarHealth) {
    statusBarHealth.updateHealthBar(this.energy);
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if energy is 0
   */
  isDead() {
    return this.energy === 0;
  }
}

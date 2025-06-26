class Endboss extends MovableObject {
  x = 2600;
  y = 135;
  width = 250;
  height = 300;
  speed = 0.01;
  world;

  offset = {
    top: 50,
    left: 20,
    right: 20,
    bottom: 30,
  };

  gravity = 1.2;
  jumpStrength = 20;
  groundLevel = 135;
  isJumping = false;
  energy = 100; // 5 benötigte Treffer = 20 Schaden pro Treffer
  endbossDeath = false;
  endbossAlert = false;
  walkingStarted = false;
  isAttacking = false;
  endbossAlertCounter = 0;
  endbossScream = new Audio("assets/audio/endboss-chicken-scream.mp3");

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  currentAnimation = this.IMAGES_ALERT;

  constructor(world) {
    super().loadImage("assets/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.world = world;
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Starts the alert animation when the player approaches.
   * Stops after 8 frames and sets the alert flag.
   *
   */
  animate() {
    const alertInterval = setInterval(() => {
      if (this.shouldPlayAlertAnimation()) {
        this.playAnimation(this.IMAGES_ALERT);
        this.endbossAlertCounter++;
      }

      if (this.endbossAlertCounter >= 8) {
        clearInterval(alertInterval);

        setTimeout(() => {
          this.endbossAlert = true;
        }, 500);
      }
    }, 500);
  }

  /**
   * Reduces energy when hit, triggers death if energy is zero or below,
   * and updates the health bar. Ignores hits if recently hurt.
   *
   */
  hit() {
    if (this.isHurt()) return;
    this.energy -= 20;
    this.lastHit = new Date().getTime();
    console.log(this.energy);

    if (this.energy <= 0) {
      this.energy = 0;
      this.endbossDeath = true;
      this.die();
    }

    this.world.status_bar_endboss.updateHealthBar(this.energy);
  }

  /**
   * Checks if the object is currently in a hurt cooldown period.
   *
   * @returns {boolean} True if less than 0.8 seconds passed since last hit.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed / 1000 < 0.8;
  }

  /**
   * Handles actions to perform when the entity dies.
   *
   */
  die() {
    console.log("Endboss besiegt!");
  }

  /**
   * Checks if the alert animation should continue.
   *
   * @returns {boolean}
   */
  shouldPlayAlertAnimation() {
    return this.world.character.x > 2000 && this.endbossAlertCounter < 8;
  }

  /**
   * Triggers the jump action and plays attack animation during jump.
   *
   */
  bossJump() {
    if (this.isJumping || this.endbossDeath) return;
    this.startJumpAnimation();
    this.executeJumpPhysics();
  }

  /**
   * Starts the attack animation loop during the jump.
   *
   */
  startJumpAnimation() {
    this.isJumping = true;
    this.jumpHeight = this.jumpStrength;
    this.jumpAnimationInterval = setInterval(() => {
      this.currentAnimation = this.IMAGES_ATTACK;
      this.playAnimation(this.currentAnimation);
    }, 250);
  }

  /**
   * Updates vertical position during jump and stops when landed.
   *
   */
  executeJumpPhysics() {
    this.jumpInterval = setInterval(() => {
      this.y -= this.jumpHeight;
      this.jumpHeight -= this.gravity;

      if (this.y >= this.groundLevel) {
        this.finishJump();
      }
    }, 40);
  }

  /**
   * Ends the jump and clears all related intervals.
   *
   */
  finishJump() {
    this.y = this.groundLevel;
    this.isJumping = false;
    clearInterval(this.jumpInterval);
    clearInterval(this.jumpAnimationInterval);
  }

  /**
   * Moves the boss left if player is close enough and animation has started.
   *
   * @param {Character} character - The player character.
   */
  moveEndboss(character) {
    if (this.endbossAlert && character.x > 2180) {
      this.moveLeft();
      this.tryStartWalkingAnimation();
    }
  }

  /**
   * Starts walking animation once if not already started.
   *
   */
  tryStartWalkingAnimation() {
    if (!this.walkingStarted) {
      this.walkingStarted = true;
      this.startWalkingAnimation();
    }
  }

  /**
   * Loops the walking animation if not jumping or attacking.
   *
   */
  startWalkingAnimation() {
    if (this.walkingInterval) return;

    this.walkingInterval = setInterval(() => {
      if (this.canPlayWalking()) {
        this.currentAnimation = this.IMAGES_WALKING;
        this.playAnimation(this.currentAnimation);
      }
    }, 200);
  }

  /**
   * Checks if walking animation is allowed.
   *
   * @returns {boolean}
   */
  canPlayWalking() {
    return !this.isJumping && !this.isAttacking && !this.endbossDeath;
  }

  /**
   * Randomly triggers the boss’s attack with sound and jump.
   *
   */
  randomEndbossAttack() {
    if (Math.random() < 0.4) {
      this.performAttack();
    }
  }

  /**
   * Plays attack scream and initiates jump.
   *
   */
  performAttack() {
    this.isAttacking = true;
    this.endbossScream.volume = 0.02;
    this.endbossScream.play();
    this.bossJump();
    setTimeout(() => (this.isAttacking = false), 1000);
  }
}

let canvas;
let world;
let isMuted = localStorage.getItem("isMuted") === "true";
let allSounds = [];
let keyboard = new KeyboardInputs();
let muteButton = document.getElementById("mute-btn");
let mobileMuteBtn = document.getElementById("mute-btn-mobile");
let backgroundMusic = new Audio("assets/audio/mexican-background-music.mp3");
const OriginalAudio = window.Audio;

/**
 * Overrides the global Audio constructor to automatically apply the user's mute preference
 * and track all created audio instances.
 *
 * @global
 * @param {...any} args - Arguments passed to the original Audio constructor.
 * @returns {HTMLAudioElement} - A new Audio object with the global mute setting applied.
 */
window.Audio = function (...args) {
  const audio = new OriginalAudio(...args);
  audio.muted = isMuted;
  allSounds.push(audio);
  return audio;
};

/**
 * Initializes the game by setting up the canvas and world.
 *
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.backgroundMusic = backgroundMusic;
  initBackgroundMusic();
  addEventsForMobileButtons();
}

/**
 * Plays the background music for the game.
 *
 */
function initBackgroundMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.0005;
  if (!isMuted) {
    backgroundMusic.play();
  }
}

/**
 * Handles keydown events to track player input.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    event.preventDefault();
    keyboard.moveRight = true;
  }
  if (event.key === "a") {
    event.preventDefault();
    keyboard.moveLeft = true;
  }
  if (event.key === " ") {
    event.preventDefault();
    keyboard.jump = true;
  }
  if (event.key === "b") {
    event.preventDefault();
    keyboard.throwBottle = true;
  }
});

/**
 * Handles keyup events to reset player input.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener("keyup", (event) => {
  if (event.key === "d") {
    event.preventDefault();
    keyboard.moveRight = false;
  }
  if (event.key === "a") {
    event.preventDefault();
    keyboard.moveLeft = false;
  }
  if (event.key === " ") {
    event.preventDefault();
    keyboard.jump = false;
  }
  if (event.key === "b") {
    event.preventDefault();
    keyboard.throwBottle = false;
  }
});

/**
 * Adds touch event listeners to mobile control buttons.
 * Updates the virtual keyboard state based on user interactions
 * with left, right, jump, and throw buttons.
 *
 */
function addEventsForMobileButtons() {
  document
    .getElementById("mobile-left-btn")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.moveLeft = true;
    });
  document
    .getElementById("mobile-right-btn")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.moveRight = true;
    });
  document
    .getElementById("mobile-jump-btn")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.jump = true;
    });
  document
    .getElementById("mobile-throw-btn")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.throwBottle = true;
    });

  document
    .getElementById("mobile-left-btn")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.moveLeft = false;
    });
  document
    .getElementById("mobile-right-btn")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.moveRight = false;
    });
  document
    .getElementById("mobile-jump-btn")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.jump = false;
    });
  document
    .getElementById("mobile-throw-btn")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.throwBottle = false;
    });
}

/**
 * Toggles the mute state of the application.
 * Updates localStorage, applies mute/unmute logic,
 * and adjusts UI buttons accordingly.
 *
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);

  if (isMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }

  if (muteButton) muteButton.innerText = isMuted ? "🔇 Unmute" : "🔊 Mute";
  if (mobileMuteBtn) mobileMuteBtn.innerText = isMuted ? "🔇" : "🔊";
}

/**
 * Mutes and pauses all currently loaded audio elements.
 * Iterates over the allSounds array and disables each sound.
 *
 */
function muteAllSounds() {
  allSounds.forEach((audio) => {
    if (audio) {
      audio.muted = true;
      audio.pause();
    }
  });
}

/**
 * Unmutes all audio elements in the `allSounds` array.
 * Also resumes background music if it is paused.
 *
 */
function unmuteAllSounds() {
  allSounds.forEach((audio) => {
    if (audio) {
      audio.muted = false;
      if (
        audio.src.includes("assets/audio/mexican-background-music.mp3") &&
        audio.paused
      ) {
        audio.play();
      }
    }
  });
}

/**
 * Initializes the start screen and sets up event listeners after the DOM is fully loaded.
 * Sets the mute button label, handles start button behavior, and displays game UI elements.
 *
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
  const startScreen = document.getElementById("startScreen");
  const headline = document.getElementById("headline");
  const canvas = document.getElementById("canvas");
  const startButton = document.getElementById("start-btn");
  const howToPlayButton = document.getElementById("htp-btn");
  const htpDialogWindow = document.getElementById("htpDialog");
  const closeDialog = document.getElementById("closeHtpDialog");
  const bottomWrapper = document.querySelector(".bottomWrapper");
  muteButton.innerText = isMuted ? "🔇 Unmute" : "🔊 Mute";

  /**
   * Starts the game by initializing the first level,
   * hiding the start screen, showing the game UI elements,
   * and calling the main game initialization function.
   *
   */
  function startGame() {
    initLevelOne();
    startScreen.style.display = "none";
    headline.style.display = "block";
    canvas.style.display = "block";
    bottomWrapper.style.display = "flex";
    init();
  }

  /**
   * Displays the "How to Play" dialog and sets up a click listener
   * to close it when clicking outside the dialog.
   *
   */
  function showHtpDialog() {
    htpDialogWindow.style.display = "block";
    setTimeout(() => {
      document.addEventListener("click", closeDialogOutside);
    }, 10);
  }

  /**
   * Closes the HTP dialog by hiding the dialog window
   * and removes the click event listener for outside clicks.
   *
   */
  function closeHtpDialog() {
    htpDialogWindow.style.display = "none";
    document.removeEventListener("click", closeDialogOutside);
  }

  /**
   * Closes the dialog if a click occurs outside of it and not on the trigger button.
   *
   * @param {MouseEvent} event - The click event to check the target element.
   */
  function closeDialogOutside(event) {
    if (
      htpDialogWindow.style.display === "block" &&
      !htpDialogWindow.contains(event.target) &&
      event.target !== howToPlayButton
    ) {
      closeHtpDialog();
    }
  }

  /**
   * Restarts the game by clearing intervals, stopping sounds,
   * resetting variables, initializing level one, and updating UI elements.
   * Also stops and resets the character's snoring sound if it exists.
   *
   */
  function restartGame() {
    clearIntervals();
    stopSounds();
    resetVariables();
    initLevelOne();
    this.gameIsOver = false;
    init();
    document.getElementById("gameOverScreen").style.display = "none";
    headline.style.display = "block";
    canvas.style.display = "block";
    bottomWrapper.style.display = "flex";

    if (world?.character?.characterSnoringSound) {
      world.character.characterSnoringSound.pause();
      world.character.characterSnoringSound.currentTime = 0;
    }
  }

  /**
   * Resets the UI to the start screen by clearing timeouts,
   * hiding game elements, stopping sounds, and clearing intervals.
   *
   */
  function backToStartScreen() {
    if (world?.gameOverTimeout) {
      clearTimeout(world.gameOverTimeout);
      world.gameOverTimeout = null;
    }
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("canvas").style.display = "none";
    document.querySelector(".bottomWrapper").style.display = "none";
    document.getElementById("headline").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    stopSounds();
    clearIntervals();
  }

  /**
   * Clears the collision check interval if it exists.
   *
   */
  function clearIntervals() {
    if (world?.collisionCheckInterval) {
      clearInterval(world.collisionCheckInterval);
    }
  }

  /**
   * Stops and resets all playing sounds including character sounds and background music.
   *
   */
  function stopSounds() {
    allSounds.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (world?.character) {
      world.character.stopAllSounds();
    }

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  /**
   * Resets game-related variables to their initial states.
   *
   * - Creates a new KeyboardInputs instance for `keyboard`.
   * - Sets `world` and `level1` to null.
   *
   */
  function resetVariables() {
    keyboard = new KeyboardInputs();
    world = null;
    level1 = null;
  }

  /**
   * Adds event listeners to UI buttons for game control actions:
   * - Restarting the game
   * - Returning to the start screen
   * - Starting the game
   * - Showing and closing the "How to Play" dialog
   * - Toggling mute (desktop and mobile buttons)
   * - Toggling fullscreen mode for the game canvas
   *
   */
  document.getElementById("restart-btn").addEventListener("click", restartGame);
  document
    .getElementById("backToStart-btn")
    .addEventListener("click", backToStartScreen);
  startButton.addEventListener("click", startGame);
  howToPlayButton.addEventListener("click", showHtpDialog);
  closeDialog.addEventListener("click", closeHtpDialog);
  muteButton.addEventListener("click", toggleMute);
  mobileMuteBtn.addEventListener("click", toggleMute);

  document.getElementById("fullscreen-btn").addEventListener("click", () => {
    let canvas = document.querySelector("canvas");

    if (!document.fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  });
});

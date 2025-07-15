let canvas;
let world;
let isMuted = localStorage.getItem("isMuted") === "true";
let allSounds = [];
let keyboard = new KeyboardInputs();
let muteButton = document.getElementById("mute-btn");
let mobileMuteBtn = document.getElementById("mute-btn-mobile");
const OriginalAudio = window.Audio;

/**
 * Overrides the global Audio constructor to apply mute settings
 *
 * @param {...any} args - Arguments for Audio constructor
 * @returns {HTMLAudioElement} Audio object with mute settings applied
 */
window.Audio = function (...args) {
  const audio = new OriginalAudio(...args);
  audio.muted = isMuted;
  allSounds.push(audio);
  return audio;
};

/**
 * Initializes the game canvas and world
 *
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  initBackgroundMusic();
  addEventsForMobileButtons();
}

/**
 * Sets up and plays background music
 *
 */
function initBackgroundMusic() {
  backgroundMusic = new Audio("assets/audio/mexican-background-music.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.002;
  if (!isMuted) {
    backgroundMusic.play();
  }
}

/**
 * Handles key press actions for game controls
 *
 * @param {string} key - The pressed key
 */
function handleKeyPress(key) {
  if (key === "d") keyboard.moveRight = true;
  if (key === "a") keyboard.moveLeft = true;
  if (key === " ") keyboard.jump = true;
  if (key === "b") keyboard.throwBottle = true;
}

/**
 * Handles key release actions for game controls
 *
 * @param {string} key - The released key
 */
function handleKeyRelease(key) {
  if (key === "d") keyboard.moveRight = false;
  if (key === "a") keyboard.moveLeft = false;
  if (key === " ") keyboard.jump = false;
  if (key === "b") keyboard.throwBottle = false;
}

/**
 * Updates mute button text based on current state
 *
 */
function updateMuteButtonText() {
  if (muteButton) muteButton.innerText = isMuted ? "🔇 Unmute" : "🔊 Mute";
  if (mobileMuteBtn) mobileMuteBtn.innerText = isMuted ? "🔇" : "🔊";
}

/**
 * Toggles global mute state and updates UI
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
  updateMuteButtonText();
}

/**
 * Mutes and pauses all audio elements
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
 * Checks if audio is background music
 *
 * @param {HTMLAudioElement} audio - Audio element to check
 * @returns {boolean} True if audio is background music
 */
function isBackgroundMusic(audio) {
  return (
    audio.src.includes("assets/audio/mexican-background-music.mp3") &&
    audio.paused
  );
}

/**
 * Unmutes all audio elements and resumes background music
 *
 */
function unmuteAllSounds() {
  allSounds.forEach((audio) => {
    if (audio) {
      audio.muted = false;
      if (isBackgroundMusic(audio)) {
        audio.play();
      }
    }
  });
}

/**
 * Gets all UI elements needed for game setup
 *
 * @returns {Object} Object containing all UI elements
 */
function getUIElements() {
  return {
    startScreen: document.getElementById("startScreen"),
    headline: document.getElementById("headline"),
    canvas: document.getElementById("canvas"),
    startButton: document.getElementById("start-btn"),
    howToPlayButton: document.getElementById("htp-btn"),
    htpDialogWindow: document.getElementById("htpDialog"),
    closeDialog: document.getElementById("closeHtpDialog"),
    bottomWrapper: document.querySelector(".bottomWrapper"),
  };
}

/**
 * Sets up game control event listeners
 *
 * @param {Object} elements - UI elements object
 */
function setupGameControlListeners(elements) {
  document
    .getElementById("restart-btn-lost")
    .addEventListener("click", restartGame);
  document
    .getElementById("restart-btn-won")
    .addEventListener("click", restartGame);
  document
    .getElementById("backToStart-btnLost")
    .addEventListener("click", backToStartScreen);
  document
    .getElementById("backToStart-btnWon")
    .addEventListener("click", backToStartScreen);
  elements.startButton.addEventListener("click", checkOrientationAndStartGame);
  muteButton.addEventListener("click", toggleMute);
  mobileMuteBtn.addEventListener("click", toggleMute);
}

/**
 * Sets up dialog and fullscreen event listeners
 *
 * @param {Object} elements - UI elements object
 */
function setupDialogAndFullscreenListeners(elements) {
  elements.howToPlayButton.addEventListener("click", () =>
    showHtpDialog(elements)
  );
  elements.closeDialog.addEventListener("click", () =>
    closeHtpDialog(elements)
  );
  document
    .getElementById("fullscreen-btn")
    .addEventListener("click", toggleFullscreen);
}

/**
 * Requests fullscreen mode for the canvas
 *
 */
function requestFullscreen() {
  let canvas = document.querySelector("canvas");
  if (canvas.requestFullscreen) canvas.requestFullscreen();
  else if (canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
  else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  else if (canvas.msRequestFullscreen) canvas.msRequestFullscreen();
}

/**
 * Toggles fullscreen mode for the game canvas
 *
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/**
 * Shows game UI elements after starting
 *
 * @param {Object} elements - UI elements object
 */
function showGameUI(elements) {
  elements.startScreen.style.display = "none";
  elements.headline.style.display = "block";
  elements.canvas.style.display = "block";
  const isMobile = isMobileDevice();
  updateUIVisibility(isMobile);
}

/**
 * Starts the actual game and initializes level
 *
 * @param {Object} elements - UI elements object
 */
function startGameInternal(elements) {
  gameHasStarted = true;
  initLevelOne();
  showGameUI(elements);
  init();
}

/**
 * Sets up click outside listener for dialog
 *
 * @param {Object} elements - UI elements object
 */
function setupDialogOutsideListener(elements) {
  setTimeout(() => {
    document.addEventListener("click", (event) =>
      closeDialogOutside(event, elements)
    );
  }, 10);
}

/**
 * Shows the how-to-play dialog
 *
 * @param {Object} elements - UI elements object
 */
function showHtpDialog(elements) {
  elements.htpDialogWindow.style.display = "block";
  setupDialogOutsideListener(elements);
}

/**
 * Closes the how-to-play dialog
 *
 * @param {Object} elements - UI elements object
 */
function closeHtpDialog(elements) {
  elements.htpDialogWindow.style.display = "none";
  document.removeEventListener("click", (event) =>
    closeDialogOutside(event, elements)
  );
}

/**
 * Checks if click is outside dialog and closes it
 *
 * @param {MouseEvent} event - Click event
 * @param {Object} elements - UI elements object
 */
function closeDialogOutside(event, elements) {
  const { htpDialogWindow, howToPlayButton } = elements;
  if (
    htpDialogWindow.style.display === "block" &&
    !htpDialogWindow.contains(event.target) &&
    event.target !== howToPlayButton
  ) {
    closeHtpDialog(elements);
  }
}

/**
 * Stops character snoring sound if it exists
 *
 */
function stopCharacterSnoring() {
  if (world?.character?.characterSnoringSound) {
    world.character.characterSnoringSound.pause();
    world.character.characterSnoringSound.currentTime = 0;
  }
}

/**
 * Shows game UI elements after restart
 *
 * @param {Object} elements - UI elements object
 */
function showGameUIAfterRestart(elements) {
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("gameWonScreen").style.display = "none";
  elements.headline.style.display = "block";
  elements.canvas.style.display = "block";
  const isMobile = isMobileDevice();
  updateUIVisibility(isMobile);
}

/**
 * Restarts the game and resets all states
 *
 */
function restartGame() {
  const elements = getUIElements();
  clearIntervals();
  stopSounds();
  resetVariables();
  initLevelOne();
  this.gameIsOver = false;
  init();
  showGameUIAfterRestart(elements);
  stopCharacterSnoring();
}

/**
 * Hides all game UI elements
 *
 */
function hideGameUI() {
  document.getElementById("canvas").style.display = "none";
  document.querySelector(".bottomWrapper").style.display = "none";
  document.getElementById("headline").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("gameWonScreen").style.display = "none";
}

/**
 * Returns to the start screen and resets game state
 *
 */
function backToStartScreen() {
  if (world?.gameOverTimeout) {
    clearTimeout(world.gameOverTimeout);
    world.gameOverTimeout = null;
  }
  document.getElementById("startScreen").style.display = "flex";
  hideGameUI();
  stopSounds();
  clearIntervals();
}

/**
 * Clears all game intervals
 *
 */
function clearIntervals() {
  if (world?.collisionCheckInterval) {
    clearInterval(world.collisionCheckInterval);
  }
}

/**
 * Stops and resets all audio elements
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
 * Resets game variables to initial state
 *
 */
function resetVariables() {
  keyboard = new KeyboardInputs();
  world = null;
  level1 = null;
}

// Event listeners for keyboard input
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  handleKeyPress(event.key);
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();
  handleKeyRelease(event.key);
});

/**
 * Initializes the game when DOM is loaded
 *
 */
document.addEventListener("DOMContentLoaded", function () {
  const elements = getUIElements();
  updateMuteButtonText();
  setupGameControlListeners(elements);
  setupDialogAndFullscreenListeners(elements);
  window.actuallyStartGame = () => startGameInternal(elements);
});

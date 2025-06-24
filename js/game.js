let isMuted = localStorage.getItem("isMuted") === "true";
const OriginalAudio = window.Audio;
let allSounds = [];

window.Audio = function (...args) {
  const audio = new OriginalAudio(...args);
  audio.muted = isMuted;
  allSounds.push(audio);
  return audio;
};

let canvas;
let world;
let keyboard = new KeyboardInputs();
let muteButton = document.getElementById("mute-btn");
let mobileMuteBtn = document.getElementById("mute-btn-mobile");
let backgroundMusic = new Audio("assets/audio/mexican-background-music.mp3");

/**
 * Initializes the game by setting up the canvas and world.
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

// MobileButtons Event Listener

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

muteButton.addEventListener("click", toggleMute);
mobileMuteBtn.addEventListener("click", toggleMute);

function muteAllSounds() {
  allSounds.forEach((audio) => {
    if (audio) {
      audio.muted = true;
      audio.pause();
    }
  });
}

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

  function startGame() {
    initLevelOne();
    startScreen.style.display = "none";
    headline.style.display = "block";
    canvas.style.display = "block";
    bottomWrapper.style.display = "flex";
    init();
  }

  function showHtpDialog() {
    htpDialogWindow.style.display = "block";
    setTimeout(() => {
      document.addEventListener("click", closeDialogOutside);
    }, 10);
  }

  function closeHtpDialog() {
    htpDialogWindow.style.display = "none";
    document.removeEventListener("click", closeDialogOutside);
  }

  function closeDialogOutside(event) {
    if (
      htpDialogWindow.style.display === "block" &&
      !htpDialogWindow.contains(event.target) &&
      event.target !== howToPlayButton
    ) {
      closeHtpDialog();
    }
  }

  startButton.addEventListener("click", startGame);
  howToPlayButton.addEventListener("click", showHtpDialog);
  closeDialog.addEventListener("click", closeHtpDialog);

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

  function clearIntervals() {
    if (world?.collisionCheckInterval) {
      clearInterval(world.collisionCheckInterval);
    }
  }

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

  function resetVariables() {
    keyboard = new KeyboardInputs();
    world = null;
    level1 = null;
  }

  document.getElementById("restart-btn").addEventListener("click", restartGame);
  document
    .getElementById("backToStart-btn")
    .addEventListener("click", backToStartScreen);
});

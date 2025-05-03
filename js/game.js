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
let backgroundMusic = new Audio("assets/audio/mexican-background-music.mp3");

/**
 * Initializes the game by setting up the canvas and world.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  initBackgroundMusic();
}

/**
 * Plays the background music for the game.
 */
function initBackgroundMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.005;
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

muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);

  if (isMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
  }

  if (muteButton) {
    muteButton.innerText = isMuted ? "🔇 Unmute" : "🔊 Mute";
  }
});

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
      if (audio.src.includes("assets/audio/mexican-background-music.mp3") && audio.paused) {
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
    if (htpDialogWindow.style.display === "block" && !htpDialogWindow.contains(event.target) && event.target !== howToPlayButton) {
      closeHtpDialog();
    }
  }

  startButton.addEventListener("click", startGame);
  howToPlayButton.addEventListener("click", showHtpDialog);
  closeDialog.addEventListener("click", closeHtpDialog);
});

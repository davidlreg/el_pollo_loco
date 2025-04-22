let canvas;
let world;
let keyboard = new KeyboardInputs();
let muteButton = document.getElementById("mute-btn");
let isMuted = false;
let allSounds = [];

const OriginalAudio = window.Audio;
window.Audio = function (...args) {
  const audio = new OriginalAudio(...args);
  allSounds.push(audio);
  return audio;
};

/**
 * Initializes the game by setting up the canvas and world.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
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

document.addEventListener(
  "click",
  () => {
    world.playBackgroundMusic();
  },
  { once: true }
);

document.addEventListener(
  "keydown",
  () => {
    world.playBackgroundMusic();
  },
  { once: true }
);

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
  allSounds.forEach((audio) => {
    audio.muted = isMuted;
  });
  muteButton.innerText = isMuted ? "🔇 Unmute" : "🔊 Mute";
});

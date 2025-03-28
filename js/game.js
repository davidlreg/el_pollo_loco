/** @type {HTMLCanvasElement} Canvas element for rendering the game
 *
 */
let canvas;

/** @type {World} Main game world instance
 *
 */
let world;

/** @type {KeyboardInputs} Object managing keyboard input state
 *
 */
let keyboard = new KeyboardInputs();

/**
 * Initializes the game by setting up canvas and world
 *
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

/**
 * Event listener for keydown events to track player input
 *
 * @param {KeyboardEvent} event - The keyboard event
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
 * Event listener for keyup events to reset player input
 *
 * @param {KeyboardEvent} event - The keyboard event
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
  if (event.key === "f") {
    event.preventDefault();
    keyboard.throwBottle = false;
  }
});

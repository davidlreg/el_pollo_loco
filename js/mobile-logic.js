let orientationCheckActive = false;
let gameHasStarted = false;
let mobileResolution = false;
let desktopResolution = false;

/**
 * Detects if the current device supports touch input
 *
 * @returns {boolean} True if device has touch capabilities
 */
function hasTouch() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Checks if the device has a mobile user agent
 *
 * @returns {boolean} True if mobile user agent detected
 */
function hasMobileUserAgent() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detects if the current device is a mobile touch device
 *
 * @returns {boolean} True if device is mobile with touch
 */
function isMobileDevice() {
  const smallScreen = window.innerWidth <= 1024;
  return hasTouch() && (hasMobileUserAgent() || smallScreen);
}

/**
 * Updates UI visibility based on device type
 *
 * @param {boolean} isMobile - Whether device is mobile
 */
function updateUIVisibility(isMobile) {
  const mobileBtnWrapper = document.getElementById("mobileBtnWrapper");
  const headline = document.getElementById("headline");
  const bottomWrapper = document.getElementById("bottomWrapper");
  if (isMobile) {
    if (mobileBtnWrapper) mobileBtnWrapper.style.display = "flex";
    if (headline) headline.style.display = "none";
    if (bottomWrapper) bottomWrapper.style.display = "none";
    window.addEventsForMobileButtons();
  } else {
    if (mobileBtnWrapper) mobileBtnWrapper.style.display = "none";
    if (headline) headline.style.display = "block";
    if (bottomWrapper) bottomWrapper.style.display = "flex";
  }
}

/**
 * Sets full screen overlay styles for turn device screen
 *
 * @param {HTMLElement} element - The turn device screen element
 */
function setFullScreenOverlay(element) {
  element.style.display = "flex";
  element.style.position = "fixed";
  element.style.top = "0";
  element.style.left = "0";
  element.style.width = "100vw";
  element.style.height = "100vh";
  element.style.zIndex = "9999";
}

/**
 * Shows or hides the turn device notification
 *
 * @param {boolean} isMobile - Whether device is mobile
 * @param {boolean} isPortrait - Whether device is in portrait mode
 * @param {boolean} screenTooSmall - Whether screen is too small
 */
function handleTurnDeviceNotification(isMobile, isPortrait, screenTooSmall) {
  const turnDeviceScreen = document.getElementById("turnDeviceScreen");
  if (!gameHasStarted && isMobile && isPortrait && screenTooSmall) {
    if (turnDeviceScreen) setFullScreenOverlay(turnDeviceScreen);
  } else {
    if (turnDeviceScreen) turnDeviceScreen.style.display = "none";
  }
}

/**
 * Checks device orientation and manages UI accordingly
 * Only works when orientation checks are active
 *
 */
function checkOrientation() {
  if (!orientationCheckActive) return;
  const maxWidth = 830;
  const maxHeight = 830;
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const isMobile = isMobileDevice();
  mobileResolution = isMobile;
  desktopResolution = !isMobile;
  updateUIVisibility(isMobile);
  const screenTooSmall =
    window.innerWidth <= maxWidth || window.innerHeight <= maxHeight;
  handleTurnDeviceNotification(isMobile, isPortrait, screenTooSmall);
}

/**
 * Starts the game for desktop devices
 *
 */
function startDesktopGame() {
  const turnDeviceScreen = document.getElementById("turnDeviceScreen");
  if (turnDeviceScreen) turnDeviceScreen.style.display = "none";
  if (typeof window.actuallyStartGame === "function") {
    window.actuallyStartGame();
  }
  checkOrientation();
}

/**
 * Starts the game for mobile devices in landscape mode
 *
 */
function startMobileGame() {
  const turnDeviceScreen = document.getElementById("turnDeviceScreen");
  if (turnDeviceScreen) turnDeviceScreen.style.display = "none";
  if (typeof window.actuallyStartGame === "function") {
    window.actuallyStartGame();
  }
  checkOrientation();
}

/**
 * Initiates orientation check and starts game based on device type
 *
 */
function checkOrientationAndStartGame() {
  orientationCheckActive = true;
  const isMobile = isMobileDevice();
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  if (!isMobile) {
    startDesktopGame();
    return;
  }
  if (isPortrait) {
    const turnDeviceScreen = document.getElementById("turnDeviceScreen");
    if (turnDeviceScreen) turnDeviceScreen.style.display = "flex";
    waitForLandscapeBeforeStarting();
  } else {
    startMobileGame();
  }
}

/**
 * Waits for device rotation to landscape mode before starting game
 *
 */
function waitForLandscapeBeforeStarting() {
  const listener = () => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isMobile = isMobileDevice();
    if (isMobile && !isPortrait) {
      window.removeEventListener("resize", listener);
      window.removeEventListener("orientationchange", listener);
      startMobileGame();
    }
  };
  window.addEventListener("resize", listener);
  window.addEventListener("orientationchange", listener);
}

/**
 * Calculates canvas dimensions for landscape mode
 *
 * @returns {Object} Object with width and height properties
 */
function calculateLandscapeDimensions() {
  const availableHeight = window.innerHeight - 120;
  const newHeight = Math.max(320, Math.min(480, availableHeight));
  const newWidth = (newHeight * 720) / 480;
  return {
    width: Math.min(newWidth, window.innerWidth),
    height: (Math.min(newWidth, window.innerWidth) * 480) / 720,
  };
}

/**
 * Calculates canvas dimensions for portrait mode
 *
 * @returns {Object} Object with width and height properties
 */
function calculatePortraitDimensions() {
  const newWidth = window.innerWidth;
  const newHeight = Math.max(280, Math.min(480, (newWidth * 480) / 720));
  return {
    width: newWidth,
    height: newHeight,
  };
}

/**
 * Adjusts canvas size for mobile devices while maintaining aspect ratio
 *
 */
function adjustCanvasForMobile() {
  const canvas = document.getElementById("canvas");
  const isMobile = isMobileDevice();
  if (isMobile) {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const dimensions = isLandscape
      ? calculateLandscapeDimensions()
      : calculatePortraitDimensions();
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
  } else {
    canvas.width = 720;
    canvas.height = 480;
  }
}

/**
 * Creates touch event handlers for a button
 *
 * @param {string} action - The keyboard action to trigger
 * @returns {Object} Object containing event handler functions
 */
function createTouchHandlers(action) {
  return {
    touchStart: (event, element) => {
      event.preventDefault();
      if (typeof keyboard !== "undefined") keyboard[action] = true;
      element.style.opacity = "0.7";
    },
    touchEnd: (event, element) => {
      event.preventDefault();
      if (typeof keyboard !== "undefined") keyboard[action] = false;
      element.style.opacity = "1";
    },
  };
}

/**
 * Adds touch event listeners to a single mobile control button
 *
 * @param {Object} buttonConfig - Configuration object with id and action
 */
function addButtonEventListeners(buttonConfig) {
  const element = document.getElementById(buttonConfig.id);
  if (!element) return;
  const handlers = createTouchHandlers(buttonConfig.action);
  element.removeEventListener("touchstart", element._touchStartHandler);
  element.removeEventListener("touchend", element._touchEndHandler);
  element.removeEventListener("touchcancel", element._touchCancelHandler);
  element._touchStartHandler = (e) => handlers.touchStart(e, element);
  element._touchEndHandler = (e) => handlers.touchEnd(e, element);
  element._touchCancelHandler = (e) => handlers.touchEnd(e, element);
  element.addEventListener("touchstart", element._touchStartHandler, {
    passive: false,
  });
  element.addEventListener("touchend", element._touchEndHandler, {
    passive: false,
  });
  element.addEventListener("touchcancel", element._touchCancelHandler, {
    passive: false,
  });
}

/**
 * Adds touch event listeners to all mobile control buttons
 *
 */
window.addEventsForMobileButtons = function () {
  const buttons = [
    { id: "mobile-left-btn", action: "moveLeft" },
    { id: "mobile-right-btn", action: "moveRight" },
    { id: "mobile-jump-btn", action: "jump" },
    { id: "mobile-throw-btn", action: "throwBottle" },
  ];
  buttons.forEach(addButtonEventListeners);
};

// Event listeners for orientation and resize changes
window.addEventListener("orientationchange", () => {
  setTimeout(checkOrientation, 300);
});

window.addEventListener("resize", () => {
  setTimeout(checkOrientation, 300);
});

window.addEventListener("orientationchange", () => {
  setTimeout(adjustCanvasForMobile, 300);
});

window.addEventListener("resize", () => {
  setTimeout(adjustCanvasForMobile, 100);
});

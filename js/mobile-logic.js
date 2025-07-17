let orientationCheckActive = true;
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
  const smallScreen = window.innerWidth <= 1368;
  return hasTouch() && (hasMobileUserAgent() || smallScreen);
}

/**
 * Sets mobile button wrapper styles for small screens.
 *
 * @param {HTMLElement} wrapper - Mobile button wrapper element
 */
function setMobileButtonSmallScreenStyles(wrapper) {
  wrapper.style.position = "fixed";
  wrapper.style.zIndex = "10";
  wrapper.style.bottom = "20px";
  wrapper.style.left = "50%";
  wrapper.style.transform = "translateX(-50%)";
}

/**
 * Resets mobile button wrapper styles to default.
 *
 * @param {HTMLElement} wrapper - Mobile button wrapper element
 */
function resetMobileButtonStyles(wrapper) {
  wrapper.style.position = "";
  wrapper.style.zIndex = "";
  wrapper.style.bottom = "";
  wrapper.style.left = "";
  wrapper.style.transform = "";
}

/**
 * Configures UI elements for mobile display.
 *
 * @param {HTMLElement} mobileBtnWrapper - Mobile button wrapper
 * @param {HTMLElement} headline - Headline element
 * @param {HTMLElement} bottomWrapper - Bottom wrapper element
 */
function setupMobileUI(mobileBtnWrapper, headline, bottomWrapper) {
  if (mobileBtnWrapper) {
    mobileBtnWrapper.style.display = "flex";
    const hasSmallScreen = hasSmallScreenResolution();
    hasSmallScreen
      ? setMobileButtonSmallScreenStyles(mobileBtnWrapper)
      : resetMobileButtonStyles(mobileBtnWrapper);
  }
  if (headline) headline.style.display = "none";
  if (bottomWrapper) bottomWrapper.style.display = "none";
  window.addEventsForMobileButtons();
}

/**
 * Configures UI elements for desktop display.
 *
 * @param {HTMLElement} mobileBtnWrapper - Mobile button wrapper
 * @param {HTMLElement} headline - Headline element
 * @param {HTMLElement} bottomWrapper - Bottom wrapper element
 */
function setupDesktopUI(mobileBtnWrapper, headline, bottomWrapper) {
  if (mobileBtnWrapper) mobileBtnWrapper.style.display = "none";
  if (headline) headline.style.display = "block";
  if (bottomWrapper) bottomWrapper.style.display = "flex";
}

/**
 * Updates UI visibility based on device type.
 *
 * @param {boolean} isMobile - Whether device is mobile
 */
function updateUIVisibility(isMobile) {
  const mobileBtnWrapper = document.getElementById("mobileBtnWrapper");
  const headline = document.getElementById("headline");
  const bottomWrapper = document.getElementById("bottomWrapper");
  isMobile
    ? setupMobileUI(mobileBtnWrapper, headline, bottomWrapper)
    : setupDesktopUI(mobileBtnWrapper, headline, bottomWrapper);
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
  if (isMobile && isPortrait) {
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
  if (gameHasStarted) {
    updateUIVisibility(isMobile);
    adjustCanvasForMobile();
  }
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
  gameHasStarted = true;
  setTimeout(() => {
    adjustCanvasForMobile();
    checkOrientation();
  }, 100);
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
  gameHasStarted = true;
  setTimeout(() => {
    adjustCanvasForMobile();
    checkOrientation();
  }, 100);
}

/**
 * Sets fullscreen CSS properties on an element with important priority.
 *
 * @param {HTMLElement} element - Element to apply styles to
 */
function setFullscreenStyles(element) {
  element.style.setProperty("position", "fixed", "important");
  element.style.setProperty("top", "0", "important");
  element.style.setProperty("left", "0", "important");
  element.style.setProperty("width", "100vw", "important");
  element.style.setProperty("height", "100vh", "important");
  element.style.setProperty("max-width", "none", "important");
  element.style.setProperty("max-height", "none", "important");
}

/**
 * Sets canvas-specific fullscreen styles.
 *
 * @param {HTMLElement} canvas - Canvas element
 */
function setCanvasFullscreenStyles(canvas) {
  canvas.style.display = "block";
  canvas.style.setProperty("z-index", "1", "important");
  canvas.style.setProperty("border", "none", "important");
  canvas.style.setProperty("border-radius", "0", "important");
  canvas.style.setProperty("box-shadow", "none", "important");
}

/**
 * Applies fullscreen styles to canvas and wrapper elements.
 *
 * @param {HTMLElement} canvas - Canvas element to make fullscreen
 */
function applyFullScreenCanvasStyles(canvas) {
  setCanvasFullscreenStyles(canvas);
  setFullscreenStyles(canvas);
  const gameWrapper = canvas.closest(".gameWrapper");
  if (gameWrapper) {
    setFullscreenStyles(gameWrapper);
  }
}

/**
 * Removes fullscreen CSS class from UI elements.
 *
 * @param {HTMLElement} canvas - Canvas element
 */
function removeFullScreenCanvasStyles(canvas) {
  canvas.classList.remove("fullscreen");
  const gameWrapper = canvas.closest(".gameWrapper");
  if (gameWrapper) {
    gameWrapper.classList.remove("fullscreen");
  }
  const mobileBtnWrapper = document.getElementById("mobileBtnWrapper");
  if (mobileBtnWrapper) {
    mobileBtnWrapper.classList.remove("fullscreen");
  }
}

/**
 * Initiates orientation check and starts game based on device type
 *
 */
function checkOrientationAndStartGame() {
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
 * Checks if device has a small screen resolution that needs full-screen canvas.
 *
 * @returns {boolean} True if screen width <= 932px or height <= 430px
 */
function hasSmallScreenResolution() {
  return window.innerWidth <= 932 || window.innerHeight <= 430;
}

/**
 * Calculates canvas dimensions for landscape mode
 *
 * @returns {Object} Object with width and height properties
 */
function calculateLandscapeDimensions() {
  const isMobile = isMobileDevice();
  const hasSmallScreen = hasSmallScreenResolution();
  if (isMobile && hasSmallScreen) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const availableHeight = window.innerHeight - 120;
  const newHeight = Math.max(320, Math.min(480, availableHeight));
  const newWidth = (newHeight * 720) / 480;
  return {
    width: Math.min(newWidth, window.innerWidth),
    height: (Math.min(newWidth, window.innerWidth) * 480) / 720,
  };
}

/**
 * Sets canvas dimensions based on calculated values
 *
 * @param {HTMLElement} canvas - Canvas element
 * @param {Object} dimensions - Width and height values
 */
function setCanvasDimensions(canvas, dimensions) {
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
}

/**
 * Triggers world canvas resize if available
 *
 */
function triggerWorldResize() {
  if (window.world && typeof window.world.handleCanvasResize === "function") {
    window.world.handleCanvasResize();
  }
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
    if (isLandscape) {
      const dimensions = calculateLandscapeDimensions();
      setCanvasDimensions(canvas, dimensions);
      if (hasSmallScreenResolution()) {
        applyFullScreenCanvasStyles(canvas);
      } else {
        removeFullScreenCanvasStyles(canvas);
      }
    }
  } else {
    canvas.width = 720;
    canvas.height = 480;
    removeFullScreenCanvasStyles(canvas);
  }
}

/**
 * Removes full-screen styles from canvas.
 *
 * @param {HTMLElement} canvas - Canvas element
 */
function removeFullScreenCanvasStyles(canvas) {
  canvas.style.position = "";
  canvas.style.top = "";
  canvas.style.left = "";
  canvas.style.width = "";
  canvas.style.height = "";
  canvas.style.zIndex = "";
  canvas.style.objectFit = "";
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
      if (event.cancelable) {
        event.preventDefault();
      }
      if (typeof keyboard !== "undefined") keyboard[action] = true;
      element.style.opacity = "0.7";
    },
    touchEnd: (event, element) => {
      if (event.cancelable) {
        event.preventDefault();
      }
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
    capture: true,
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

window.addEventListener("orientationchange", () => {
  setTimeout(checkOrientation, 300);
});

window.addEventListener("resize", () => {
  setTimeout(checkOrientation, 300);
});

document.addEventListener("DOMContentLoaded", () => {
  checkOrientation();
});

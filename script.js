// Überprüfen, ob das Gerät Touch-Funktionen hat
const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
const screenHeight = window.innerHeight;


function init() {
  if (isTouchDevice) touchSettings();
  initGame();
}

function touchSettings() {
  // for later options
}

function setProgressWidth(perc) {
  return document.getElementById('progress').style.width = perc + '%';
}

/**
 * Hide all butenes
 */
function hideButArea() {
  document.getElementById('hiddenBtn').classList.add('d-none');
}

/**
 * Make the "Try Again" button visible.
 */
function tryAgain() {
  document.getElementById('hiddenBtn').classList.remove('d-none');
}
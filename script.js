// Überprüfen, ob das Gerät Touch-Funktionen hat
const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;


function init() {
  if (isTouchDevice) touchSettings();
  initGame();
}

function touchSettings() {
  // for later options
}
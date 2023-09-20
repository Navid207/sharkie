
let canvas;
let world;
let keyboard = new Keyboard;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 32:
            keyboard.SPACE = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 39:
            keyboard.RIGHT = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 66:
            keyboard.B = true;
            break;
    };
});
window.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 32:
            keyboard.SPACE = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 39:
            keyboard.RIGHT = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 66:
            keyboard.B = false;
            break;
    };
});


let canvas;
let world;
let keyboard = new Keyboard;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    buttonEwentListner();
}

function buttonEwentListner(){
    document.getElementById('move-left').addEventListener('touchstart',e=>{
        keyboard.LEFT = true;
    });
    document.getElementById('move-left').addEventListener('touchend',e=>{
        keyboard.LEFT = false;
    });
    document.getElementById('move-up').addEventListener('touchstart',e=>{
        keyboard.UP = true;
    });
    document.getElementById('move-up').addEventListener('touchend',e=>{
        keyboard.UP = false;
    });
    document.getElementById('move-right').addEventListener('touchstart',e=>{
        keyboard.RIGHT = true;
    });
    document.getElementById('move-right').addEventListener('touchend',e=>{
        keyboard.RIGHT = false;
    });
    document.getElementById('move-down').addEventListener('touchstart',e=>{
        keyboard.DOWN = true;
    });
    document.getElementById('move-down').addEventListener('touchend',e=>{
        keyboard.DOWN = false;
    });

    document.getElementById('attack-fin').addEventListener('touchstart',e=>{
        keyboard.SPACE = true;
    });
    document.getElementById('attack-fin').addEventListener('touchend',e=>{
        keyboard.SPACE = false;
    });
    document.getElementById('attack-bubble').addEventListener('touchstart',e=>{
        keyboard.B = true;
    });
    document.getElementById('attack-bubble').addEventListener('touchend',e=>{
        keyboard.B = false;
    });
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

function openFullscreen() {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
        canvas.msRequestFullscreen();
    }
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++){ 
        window.clearInterval(i);
        clearTimeout(i);
    }
  }

function startGame() {
    clearAllIntervals();
    world = new World(canvas, keyboard);
    world.level=initLevel();
    world.stopGame = false;
    world.gameStatus.setGameState(0);
    document.getElementById('butTryAgain').classList.add('d-none');
}
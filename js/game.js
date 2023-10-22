let canvas;
let world;
let keyboard = new Keyboard;
let volume = 1;
let bgAudio = false;


let butVolumeOff = /*html*/`
                    <svg id="volumeOff" onclick="showSoundSettings()" xmlns="http://www.w3.org/2000/svg" height="24"
                    viewBox="0 -960 960 960" width="24">
                    <path
                        d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
                </svg>
`
let butVolumeHigh = /*html*/`
                    <svg id="volumeHigh" onclick="showSoundSettings()" xmlns="http://www.w3.org/2000/svg" height="24"
                    viewBox="0 -960 960 960" width="24">
                    <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
                    </svg>
`
let butVolumeLow = /*html*/`
                    <svg id="volumeLow" onclick="showSoundSettings()" xmlns="http://www.w3.org/2000/svg" height="24"
                    viewBox="0 -960 960 960" width="24">
                    <path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z"/>
                    </svg>
`

/**
 * Initialize the game by setting up the canvas, creating a game world, and adding event listeners.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, volume);
    buttonEwentListner();
}

/**
 * Set up event listeners for move and attack buttons.
 */
function buttonEwentListner() {
    moveBtn();
    attackBtn();
}
/**
 * Set up touch event listeners for buttons associated with movement.
 * These listeners update the keyboard state based on touchstart and touchend events.
 */
function moveBtn() {
    document.getElementById('move-left').addEventListener('touchstart', e => keyboard.LEFT = true);
    document.getElementById('move-left').addEventListener('touchend', e => keyboard.LEFT = false);
    document.getElementById('move-up').addEventListener('touchstart', e => keyboard.UP = true);
    document.getElementById('move-up').addEventListener('touchend', e => keyboard.UP = false);
    document.getElementById('move-right').addEventListener('touchstart', e => keyboard.RIGHT = true);
    document.getElementById('move-right').addEventListener('touchend', e => keyboard.RIGHT = false);
    document.getElementById('move-down').addEventListener('touchstart', e => keyboard.DOWN = true);
    document.getElementById('move-down').addEventListener('touchend', e => keyboard.DOWN = false);
}
/**
 * Set up touch event listeners for buttons associated with attack actions.
 * These listeners update the keyboard state based on touchstart and touchend events.
 */
function attackBtn() {
    document.getElementById('attack-fin').addEventListener('touchstart', e => keyboard.SPACE = true);
    document.getElementById('attack-fin').addEventListener('touchend', e => keyboard.SPACE = false);
    document.getElementById('attack-bubble').addEventListener('touchstart', e => keyboard.B = true);
    document.getElementById('attack-bubble').addEventListener('touchend', e => keyboard.B = false);
}
/**
 * Event listener for keydown on the keyboard.
 */
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
/**
 * Event listener for keyup on the keyboard
 */
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

/**
 * Function to open fullscreen mode for the 'main' element.
 */
function openFullscreen() {
    main = document.getElementById('main');
    if (main.requestFullscreen) main.requestFullscreen();
    else if (main.webkitRequestFullscreen) main.webkitRequestFullscreen();  /* Safari */
    else if (main.msRequestFullscreen) main.msRequestFullscreen();          /* IE11 */
    document.getElementById('fullscreen').setAttribute('onclick', 'closeFullscreen()');
}
/**
 * Function to exit fullscreen mode for the 'main' element.
 */
function closeFullscreen() {
    document.getElementById('fullscreen').setAttribute('onclick', 'openFullscreen()');
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}
/**
 * Function to clear all timers for intervals or timeouts
 */
function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
        clearTimeout(i);
    }
}

/**
 * Function to start a new game.
 * Clears all intervals, initializes a new World, sets the game level to Level 1,
 * resets game state, and hides certain buttons.
 */
function startGame() {
    clearAllIntervals();
    world = new World(canvas, keyboard, volume);
    world.level = initLevel1();
    world.stopGame = false;
    world.gameStatus.setGameState(0);
    document.getElementById('butStartGame').classList.add('d-none');
    document.getElementById('butTryAgain').classList.add('d-none');
}

/**
 * Function to display the sound settings in the document.
 */
function showSoundSettings() {
    document.getElementById('volumeSetting').classList.remove('d-none');
}
/**
 * Function to turn off the sound in the game.
 */
function soundOff() {
    world.muteAllObjects();
    document.getElementById('volume').innerHTML = butVolumeOff;
    document.getElementById('volumeSetting').classList.add('d-none');
    volume = 0;
}
/**
 * Function to set the volume to a low level in the game.
 */
function soundLow() {
    world.soundOn(0.25);
    document.getElementById('volume').innerHTML = butVolumeLow;
    document.getElementById('volumeSetting').classList.add('d-none');
    volume = 1;
}
/**
 * Function to set the volume to a high level in the game.
 */
function soundHigh() {
    world.soundOn(0.8);
    document.getElementById('volume').innerHTML = butVolumeHigh;
    document.getElementById('volumeSetting').classList.add('d-none');
    volume = 2;
}
/**
 * Function to open the introduction element.
 */
function openInfo() {
    let info = document.getElementById('introduction');
    info.classList.remove('d-none');
    info.classList.add('slide-in');
}
/**
 * Function to close the introduction element.
 */
function closeInfo() {
    let info = document.getElementById('introduction');
    info.classList.remove('slide-in');
    info.classList.add('slide-out');
    setTimeout(() => removeSlideOut(info), 500)
}
function removeSlideOut(info) {
    info.classList.remove('slide-out');
    info.classList.add('d-none');
}

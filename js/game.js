let canvas;
let world;
let keyboard;

/** 
 * This variable is true, if the used device is a mobile device, and it is false, if not.
*/
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/**
 * This function initiates the canvas and the world in it
 */
function init() {
    checkIfMobile();
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-button').style.display = "flex";
    document.getElementById('restart-button').style.display = "none";
    if (isMobileDevice) {
        runMobileEventListeners();
    }
}

/**
 * This function resets all variables and intervals and initiates the canvas an the world in it again, 
 * when the 'Back to Menu' button is pressed
 */
function reload() {
    world.animationFrame = 0;
    canvas = 0;
    world = 0;
    keyboard = 0;
    init();
}

/**
 * This function needs an elements Id an sets its css style attribute "display" to "none", 
 * so that the elemnt is not on the screen
 * 
 * @param {string} elementId 
 */
function hide(elementId) {
    document.getElementById(elementId).style.display = "none";
}

/**
 * This function needs an elements Id an sets its css style attribute "display" to "flex", 
 * so that the elemnt is shown on the screen
 * 
 * @param {string} elementId 
 */
function show(elementId) {
    document.getElementById(elementId).style.display = "flex";
}

/**
 * This function cheks the window for pressed buttons (Arrow Left, Right, Up; Space and Enter) 
 * on the keyboard an sets their values in the JSON "keyboard" to "true" for the time they are pressed 
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    };
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    };
    if (event.keyCode == 38) {
        keyboard.UP = true;
    };
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    };
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    };
    if (event.keyCode == 13) {
        keyboard.ENTER = true;
    };
});

/**
 * This function cheks the window for released buttons (Arrow Left, Right, Up; Space and Enter) 
 * on the keyboard an sets their values in the JSON "keyboard" to "false" for the time they are pressed 
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    };
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    };
    if (event.keyCode == 38) {
        keyboard.UP = false;
    };
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    };
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    };
    if (event.keyCode == 13) {
        keyboard.ENTER = false;
    };
});

/**
 * This function checks the responsive control buttons for their status (touched or not)
 * an sets their analogous values in the JSON "keyboard" to "true" or "false" for the time they are touched 
 */
function runMobileEventListeners() {
    let buttonLeft = document.getElementById('button-left');
    buttonLeft.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    buttonLeft.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    let buttonRight = document.getElementById('button-right');
    buttonRight.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    buttonRight.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    let buttonJump = document.getElementById('button-jump');
    buttonJump.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.UP = true;
    });
    buttonJump.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.UP = false;
    });

    let buttonBottle = document.getElementById('button-bottle');
    buttonBottle.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });
    buttonBottle.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    /**
     *  Switches the Fullscreen Mode, if the Fullscreen button is pressed/touched 
     */
    let buttonFullscreen = document.getElementById('button-fullscreen');
    buttonFullscreen.addEventListener("click", (event) => {
        event.preventDefault();
        if (world) {
            world.switchFullscreen();
        }
    });

    /**
     * If the screen is turned to "landscape" mode, the document siwtches to fullscreen
     * when it is not in the fullscreen mode yet. If it is turned to "portrait" mode,
     * the document exits the fullscreen mode, when it is in fullscreen mode yet. 
     */
    document.addEventListener('orientationchange', () => {
        if ((window.orientation === 90 || window.orientation === -90) && !document.fullscreen) {
            let fullscreen = document.getElementById('fullscreen');
            world.enterFullscreen(fullscreen);
        }
        else if ((window.orientation === 0 || window.orientation === 180) && document.fullscreen) {
            world.exitFullscreen();
        }
    })
};

/**
 * This function hides the guide-box element and shows the responsive buttons, if the used device 
 * is a mobile device
 */
function checkIfMobile() {
    setInterval(() => {
        if (isMobileDevice) {
            show('responsive-box');
            show('button-fullscreen');
            hide('guide-box');
        }
    }, 1000 / 60);
}


let canvas;
let world;
let keyboard;
let isMuted = true;

/** 
 * This variable is true, if the used device is a mobile device, and it is false, if not.
*/
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/**
 * This function initiates the canvas and the world in it
 */
function init() {
    settingsForMobileDevice();
    setDefaultValues();
    if (isMobileDevice) {
        runMobileEventListeners();
    }
    if (!isMuted) {
        world.THEME_SONG.play();
        world.THEME_SONG.muted = false;
    }
}

/**
 * This function hides the guide-box element and shows the responsive buttons, if the used device 
 * is a mobile device
 */
function settingsForMobileDevice() {
    if (isMobileDevice) {
        show('dialog-box');
        setInterval(() => {
            show('responsive-box');
            show('button-fullscreen');
            hide('guide-box');
        }, 1000 / 60);
    }
}

/**
 * This functions sets some default variables and values 
 */
function setDefaultValues() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-button').style.display = "flex";
    document.getElementById('restart-button').style.display = "none";
}

/**
 * This function resets all variables and intervals and initiates the canvas an the world in it again, 
 * when the 'Back to Menu' button is pressed
 */
function reload() {
    world.THEME_SONG.src = '';
    world.animationFrame = [];
    canvas = [];
    world = [];
    keyboard = [];
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
 *  Switches the sound mode, if the sound button is pressed/touched 
 */
function switchMute() {
    if (!isMuted) {
        isMuted = true;
        muteAllAudio();
        document.getElementById('sound-logo').src = 'img/10_control_icons/sound-off.png';
        world.THEME_SONG.pause();
    }
    else if (isMuted) {
        isMuted = false;
        unmuteAllAudio();
        document.getElementById('sound-logo').src = 'img/10_control_icons/sound-on.png';
        world.THEME_SONG.play();
    }
};

function muteAllAudio() {
    world.THEME_SONG.muted = true;
    world.DYING_BIRD_SOUND.muted = true;
    world.FLYING_BOTTLE_SOUND.muted = true;
    world.SMASHING_BOTTLE_SOUND.muted = true;
    if (world.character) {
        world.character.WALKING_SOUND.muted = true;
        world.character.JUMPING_SOUND.muted = true;
        world.character.HURTING_SOUND.muted = true;
    }
}

function unmuteAllAudio() {
    world.THEME_SONG.muted = false;
    world.DYING_BIRD_SOUND.muted = false;
    world.FLYING_BOTTLE_SOUND.muted = false;
    world.SMASHING_BOTTLE_SOUND.muted = false;
    if (world.character) {
        world.character.WALKING_SOUND.muted = false;
        world.character.JUMPING_SOUND.muted = false;
        world.character.HURTING_SOUND.muted = false;
    }
}


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
    window.addEventListener('orientationchange', () => {
        if ((window.orientation === 90 || window.orientation === -90) && !document.fullscreen) {
            let fullscreen = document.getElementById('fullscreen');
            world.enterFullscreen(fullscreen);
        }
        else if ((window.orientation === 0 || window.orientation === 180) && document.fullscreen) {
            world.exitFullscreen();
        }
    })
};


let canvas;
let world;
let keyboard;
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

function reload() {
    world.animationFrame = 0;
    canvas = 0;
    world = 0;
    keyboard = 0;
    init();
}

function hide(elementId) {
    document.getElementById(elementId).style.display = "none";
}

function show(elementId) {
    document.getElementById(elementId).style.display = "flex";
}

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

/* 
    The following part does not work, because modern browsers prevent the fullscreen mode from beeing executed, 
    if its not executed by a direct input of the user! 
    

    let buttonFullscreen = document.getElementById('button-fullscreen');
    buttonFullscreen.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.ENTER = true;
    });
    buttonFullscreen.addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.ENTER = false;
    });

    document.addEventListener('orientationchange', () => {
        if (window.orientation === 90 || window.orientation === -90) {
            let fullscreen = document.getElementById('fullscreen');
            world.enterFullscreen(fullscreen);
            document.getElementById('button-fullscreen').style.display = 'none';
        }
        else {
            world.exitFullscreen();
            document.getElementById('button-fullscreen').style.display = 'flex';
        }
    }) 
*/
};



function checkIfMobile() {
    setInterval(() => {
        if (isMobileDevice) {
            document.getElementById('responsive-box').style.display = 'flex';
            document.getElementById('button-fullscreen').style.display = 'flex';
            document.getElementById('guide-box').style.display = 'none';
        }
    }, 1000 / 60);
}


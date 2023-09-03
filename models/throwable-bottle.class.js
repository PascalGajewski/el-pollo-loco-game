class ThrowableBottle extends MovableObject {
    keyboard;
    speed_x = 0;
    speed_y = 13.5;
    acceleration_y = 0.5;
    otherDirection;
    offsetX = 15; 
    offsetY = 20;
    offsetWidth = -30; 
    offsetHeight = -30;
    splashed = false;
    isCollided = false;
    IMAGES_ROTATING_BOTTLE = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASHING_BOTTLE = ['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    SMASHING_BOTTLE_SOUND = new Audio('audio/smashing-bottle.mp3');

    constructor(currentLocationX, currentLocationY, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImageCache(this.IMAGES_ROTATING_BOTTLE);
        this.loadImageCache(this.IMAGES_SPLASHING_BOTTLE);
        this.x = currentLocationX;
        this.y = currentLocationY;
        this.otherDirection = otherDirection;
        this.throw();
        this.SMASHING_BOTTLE_SOUND.muted = true;
    }

    throw() {
        let rotatingBottleInterval = setInterval(() => {
            this.animateMovement(this.IMAGES_ROTATING_BOTTLE);
        }, 100);
        this.applyGravity();
        let flyingBottleInterval = setInterval(() => {
            if (this.y < 350 && !this.isCollided) {
                if (!this.otherDirection) {
                    this.x += 10;
                }
                else {
                    this.x -= 10;
                }
            }
            else {
                clearInterval(this.gravityInterval);
                this.speed_y = 0;
                this.acceleration_y = 0;
                clearInterval(rotatingBottleInterval);
                clearInterval(flyingBottleInterval);
                this.SMASHING_BOTTLE_SOUND.play();
                setTimeout(() => {
                    this.splashed = true;
                }, 500);
                this.animateSplashingBottle();
            }
        }, 25);
    }

    animateSplashingBottle() {
        let i = 0;
        setInterval(() => {
            if (i < this.IMAGES_SPLASHING_BOTTLE.length) {
                this.img = this.imgCache[this.IMAGES_SPLASHING_BOTTLE[i]];
                i++;
            }
        }, 50);
    }
}


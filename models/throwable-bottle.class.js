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

    constructor(currentLocationX, currentLocationY, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImageCache(this.IMAGES_ROTATING_BOTTLE);
        this.loadImageCache(this.IMAGES_SPLASHING_BOTTLE);
        this.x = currentLocationX;
        this.y = currentLocationY;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /**
     * This function animates the whole bottle if it is constructed.
     * The rotation oft the flying bottle, the gravity, the movement on x-axis
     * and the collision is included.
     */
    throw() {
        let rotatingBottleInterval = setInterval(() => {
            this.animateMovement(this.IMAGES_ROTATING_BOTTLE);
        }, 100);
        this.applyGravity();
        let flyingBottleInterval = setInterval(() => {
            if (this.y < 350 && !this.isCollided) {
                this.bottleIsFlying();
            }
            else {
                this.bottleIsCollided(rotatingBottleInterval, flyingBottleInterval);
            }
        }, 25);
    }

    /**
     * This function moves the flying bottle to the left or right, depending on its
     * current thrown direction.
     */
    bottleIsFlying() {
        if (!this.otherDirection) {
            this.x += 10;
        }
        else {
            this.x -= 10;
        }
    }

    /**
     * This function stops all the movement of the bottle, if it is collided. 
     * Afterwards it animates the splashing of tabasco.
     * 
     * @param {Interval} rotatingBottleInterval - the interval for the bottles rotation.
     * @param {Interval} flyingBottleInterval - the interval for the bottles movement.
     */
    bottleIsCollided(rotatingBottleInterval, flyingBottleInterval) {
        this.isCollided = true;
        clearInterval(this.gravityInterval);
        clearInterval(rotatingBottleInterval);
        clearInterval(flyingBottleInterval);
        this.speed_y = 0;
        this.acceleration_y = 0;
        setTimeout(() => {
            this.splashed = true;
        }, 500);
        this.animateSplashingBottle();
    }

    /**
     * This function animates the splash of tabasco, if the bottle collided.
     */
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


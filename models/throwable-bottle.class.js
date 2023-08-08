class ThrowableBottle extends MovableObject {
    keyboard;
    speed_x = 0;
    speed_y = 13.5;
    acceleration_y = 0.5;
    otherDirection;
    IMAGES_ROTATING_BOTTLE = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(currentLocationX, currentLocationY, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImageCache(this.IMAGES_ROTATING_BOTTLE);
        this.x = currentLocationX;
        this.y = currentLocationY;
        this.otherDirection = otherDirection;
        this.throw();
    }

    throw() {
        this.applyGravity();
        setInterval(() => {
            if (!this.otherDirection) {
                this.x += 10;
            }
            else {
                this.x -= 10;
            }
        }, 25);
        setInterval(() => {
            this.animateMovement(this.IMAGES_ROTATING_BOTTLE);
        }, 100);
    }
}
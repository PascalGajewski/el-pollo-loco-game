class ThrowableBottle extends MovableObject {
    keyboard;
    speed_x = 0;
    speed_y = 12.5;
    acceleration_y = 0.5;
    otherDirection;

    constructor(currentLocationX, currentLocationY, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
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
    }
}
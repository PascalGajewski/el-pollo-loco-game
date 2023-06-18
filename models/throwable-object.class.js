class ThrowableObject extends MovableObject {
    keyboard;
    speed_x = 0;
    speed_y = 12.5;
    acceleration_y = 0.5;

    constructor(currentLocationX, currentLocationY) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = currentLocationX;
        this.y = currentLocationY;
        this.throw();
    }

    throw() {
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
    }
}
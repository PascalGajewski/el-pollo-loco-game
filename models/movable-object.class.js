class MovableObject extends DrawableObject {
    otherDirection = false;
    lifepoints = 100;
    lastHit = 0;
    gravityInterval;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    animateMovement(imageArray) {
        let i = this.currentImage % imageArray.length
        let path = imageArray[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight(speed) {
        setInterval(() => {
            if (!this.checkIfDead()) {
                this.x += speed;
            }
        }, 1000 / 60)
    }

    moveLeft(speed) {
        setInterval(() => {
            if (!this.checkIfDead()) {
                this.x -= speed;
            }
        }, 1000 / 60)
    }

    checkIfAboveGround() {
        if (this instanceof ThrowableBottle) {
            if (this.y < 350) {
                return true;
            }
        }
        else {
            return (this.y < this.ground_level);
        }
    }

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.checkIfAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration_y;
            }
        }, 1000 / 60);
    }

    getHit(damage) {
        this.lifepoints -= damage;
        if (this.lifepoints < 0) {
            this.lifepoints = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    checkIfDead() {
        return this.lifepoints == 0;
    }

    checkIfHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 0.25;
    }
            
    checkIfColliding(movableObject) {
        return (this.x + this.offsetX + this.width + this.offsetWidth) >= movableObject.x + movableObject.offsetX && 
                this.x + this.offsetX <= (movableObject.x + movableObject.offsetX + movableObject.width + movableObject.offsetWidth) &&
                (this.y + this.offsetY + this.height + this.offsetHeight) >= movableObject.y + movableObject.offsetY && 
                this.y + this.offsetY <= (movableObject.y + movableObject.offsetY + movableObject.height + movableObject.offsetHeight)
    }
}
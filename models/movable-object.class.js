class MovableObject extends DrawableObject {
    otherDirection = false;
    lifepoints = 100;
    lastHit = 0;
    gravityInterval;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    /**
     * This function loads each image of an array with image paths over and 
     * over again and sets the current image as the variable "img".
     * 
     * @param {Array} pathArray - an array with several image paths.
     */
    animateMovement(pathArray) {
        let i = this.currentImage % pathArray.length
        let path = pathArray[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * This function moves an object from class "MovableObject" to the right.
     * 
     * @param {Number} speed - the defined speed on the x-axis.
     */
    moveRight(speed) {
        setInterval(() => {
            if (!this.checkIfDead()) {
                this.x += speed;
            }
        }, 1000 / 60)
    }

    /**
    * This function moves an object from class "MovableObject" to the left.
    * 
    * @param {Number} speed - the defined speed on the x-axis.
    */
    moveLeft(speed) {
        setInterval(() => {
            if (!this.checkIfDead()) {
                this.x -= speed;
            }
        }, 1000 / 60)
    }

    /**
     * This function checks if the current object of class "MovableObject" is over the ground.
     * 
     * @returns Boolean
     */
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

    /**
     * This function simulates gravity to the current object. 
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.checkIfAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration_y;
            }
        }, 1000 / 60);
    }

    /**
     * This function decreases the lifepoints of the current object.
     * 
     * @param {Number} damage - the amount of damage that should hurt the current object.
     */
    getHit(damage) {
        this.lifepoints -= damage;
        if (this.lifepoints < 0) {
            this.lifepoints = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function checks, if the current object is dead (lifepoints = 0).
     * 
     * @returns Boolean
     */
    checkIfDead() {
        return this.lifepoints == 0;
    }

    /**
     * This function checks if the current object got hurt in the last 0.25 seconds.
     * In case it returns "true".
     * 
     * @returns Boolean
     */
    checkIfHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 0.25;
    }

    /**
     * This function checks if the current object from class "MovableObject" is collided 
     * with another object from class "MovableObject". In case it returns "true". 
     * 
     * @param {MovableObject} movableObject - an object from class "MovableObject".
     * @returns Boolean
     */
    checkIfColliding(movableObject) {
        return (this.x + this.offsetX + this.width + this.offsetWidth) >= movableObject.x + movableObject.offsetX &&
            this.x + this.offsetX <= (movableObject.x + movableObject.offsetX + movableObject.width + movableObject.offsetWidth) &&
            (this.y + this.offsetY + this.height + this.offsetHeight) >= movableObject.y + movableObject.offsetY &&
            this.y + this.offsetY <= (movableObject.y + movableObject.offsetY + movableObject.height + movableObject.offsetHeight)
    }
}
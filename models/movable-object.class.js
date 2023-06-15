class MovableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    currentImage = 0;
    otherDirection = false;
    lifepoints = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImageCache(pathArray) {
        pathArray.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    animateMovement(imageArray) {
        let i = this.currentImage % imageArray.length
        let path = imageArray[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight(speed) {
        setInterval(() => {
            this.x += speed;
        }, 1000 / 60)
    }

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60)
    }

    applyGravity() {
        setInterval(() => {
            if (this.checkIfAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration_y;
            }
        }, 1000 / 60);
    }
}
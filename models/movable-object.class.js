class MovableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    currentImage = 0;

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

    moveRight(speed) {
        setInterval(() => {
            this.x += speed;}, 1000/60)
    }

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;}, 1000/60)
    }
}
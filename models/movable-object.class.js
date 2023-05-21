class MovableObject {
    x = 0;
    y = 0;
    img;
    width = 100;
    height = 100; 

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}
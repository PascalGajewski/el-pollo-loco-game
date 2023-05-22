class World {
    backgroundObjects = level1.backgroundObjects;
    clouds = level1.clouds;
    enemies = level1.enemies;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawMovableObjectArrayOnCanvas(this.backgroundObjects);
        this.drawMovableObjectArrayOnCanvas(this.clouds);
        this.drawMovableObjectArrayOnCanvas(this.enemies);
        this.drawMovableObjectOnCanvas(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    drawMovableObjectOnCanvas(movableObject) {
            this.drawOnCanvas(movableObject);
    };
    

    drawMovableObjectArrayOnCanvas(movableObjectArray) {
        movableObjectArray.forEach(movableObject => {
            this.drawOnCanvas(movableObject);
        });
    }

    drawOnCanvas(movableObject) {
        this.checkReverse(movableObject);
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y,
            movableObject.width, movableObject.height);
        this.restoreReverse(movableObject);
    }

    checkReverse(movableObject) {
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1,1);
            movableObject.x = movableObject.x * -1;
        }
    }

    restoreReverse(movableObject) {
        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }

    setWorld() {
        this.character.world = this;
    }
}
class World {
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    clouds = new Cloud();
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMovableObjectArrayOnCanvas(this.backgroundObjects);
        this.drawMovableObjectOnCanvas(this.clouds);
        this.drawMovableObjectOnCanvas(this.character);
        this.drawMovableObjectArrayOnCanvas(this.enemies);

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
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y,
            movableObject.width, movableObject.height);
    }

    setWorld() {
        this.character.world = this;
    }
}
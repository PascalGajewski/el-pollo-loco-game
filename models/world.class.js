class World {
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    clouds = [new Cloud(),];
    character = [new Character(),];
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMovableObjectArrayOnCanvas(this.backgroundObjects);
        this.drawMovableObjectArrayOnCanvas(this.clouds);
        this.drawMovableObjectArrayOnCanvas(this.character);
        this.drawMovableObjectArrayOnCanvas(this.enemies);

        let self = this;
        requestAnimationFrame(function() {
            self.draw()});
    }

    drawMovableObjectArrayOnCanvas(movableObjectArray) {
        movableObjectArray.forEach(movableObject => {
            this.drawOnCanvas(movableObject);
        });
    }

    drawOnCanvas(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, 
            movableObject.width, movableObject.height);
    }
}
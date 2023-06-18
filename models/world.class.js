class World {
    canvas;
    ctx;
    level = level1;
    character = new Character(this.level.level_end_x);
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorldInCharacter();
        this.checkCollisions();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawAllMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawAllStaticObjects();
        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    drawAllStaticObjects() {
        this.drawObjectOnCanvas(this.statusbar);
    }

    drawAllMovableObjects() {
        this.drawObjectArrayOnCanvas(this.level.backgroundObjects);
        this.drawObjectArrayOnCanvas(this.level.clouds);
        this.drawObjectArrayOnCanvas(this.level.enemies);
        this.drawObjectOnCanvas(this.character);
    }

    drawObjectOnCanvas(Object) {
        this.drawOnCanvas(Object);
    }

    drawObjectArrayOnCanvas(ObjectArray) {
        ObjectArray.forEach(Object => {
            this.drawOnCanvas(Object);
        });
    }

    drawOnCanvas(Object) {
        this.checkReverse(Object);
        this.ctx.drawImage(Object.img, Object.x, Object.y,
            Object.width, Object.height);
        this.drawCollidingFrame(Object);
        this.restoreReverse(Object);
    }

    drawCollidingFrame(Object) {
        if (Object instanceof Character || Object instanceof Chicken || Object instanceof Endboss) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(Object.x, Object.y, Object.width, Object.height);
            this.ctx.stroke();
        }
    }

    checkReverse(Object) {
        if (Object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(Object.width, 0);
            this.ctx.scale(-1, 1);
            Object.x = Object.x * -1;
        }
    }

    restoreReverse(Object) {
        if (Object.otherDirection) {
            Object.x = Object.x * -1;
            this.ctx.restore();
        }
    }

    setWorldInCharacter() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.checkIfColliding(enemy)) {
                    this.character.getHit(0.25);
                    this.statusbar.setPercentage(this.character.lifepoints);
                    console.log(this.character.lifepoints);
                };
            });
        }, 1000 / 60);
    }
}
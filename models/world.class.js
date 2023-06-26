class World {
    canvas;
    ctx;
    keyboard;
    level = level1;
    character = new Character(this.level.level_end_x);
    camera_x = 0;
    healthbar = new StatusBar(`HEALTH`, 100, 20, -10);
    coinbar = new StatusBar(`COIN`, 0, 20, 20);
    bottlebar = new StatusBar(`BOTTLE`, 0, 20, 50);


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorldInCharacter();
        this.run();
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
        this.drawObjectOnCanvas(this.healthbar);
        this.drawObjectOnCanvas(this.coinbar);
        this.drawObjectOnCanvas(this.bottlebar);
    }

    drawAllMovableObjects() {
        this.drawObjectArrayOnCanvas(this.level.backgroundObjects);
        this.drawObjectArrayOnCanvas(this.level.clouds);
        this.drawObjectArrayOnCanvas(this.level.enemies);
        this.drawObjectArrayOnCanvas(this.level.coins);
        this.drawObjectArrayOnCanvas(this.level.bottles);
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
        try {
        this.ctx.drawImage(Object.img, Object.x, Object.y,
            Object.width, Object.height);
        } catch (e){
            console.log(this.img.src);
        }
        this.drawCollidingFrame(Object);
        this.restoreReverse(Object);
    }

    drawCollidingFrame(Object) {
        if (Object instanceof Chicken || Object instanceof Endboss || Object instanceof ThrowableObject) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'red';
            this.ctx.rect(Object.x, Object.y, Object.width, Object.height);
            this.ctx.stroke();
        }
        if (Object instanceof Coin) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(Object.x+35, Object.y+35, Object.width-70, Object.height-70);
            this.ctx.stroke();
        }
        if (Object instanceof Bottle) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(Object.x+25, Object.y+12, Object.width-50, Object.height-20);
            this.ctx.stroke();
        }
        if (Object instanceof Character) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(Object.x + 30, Object.y + 120, Object.width - 50, Object.height - 130);
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

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowObjects();
            this.checkDeath();
        }, 100);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.checkIfColliding(enemy)) {
                this.character.getHit(0.25);
                this.healthbar.setPercentage(this.character.lifepoints, this.healthbar.IMAGES_HEALTH);
                console.log(this.character.lifepoints);
            };
        });
    }

    checkDeath () {
        if(this.character.checkIfDead()) {
            let img = new DrawableObject();
            img.loadImage('img/9_intro_outro_screens/game_over/game over!.png');
            this.drawOnCanvas(img, 100, 100);
            this.clearAllIntervals();
        }
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 25, this.character.y + 100, this.character.otherDirection);
            this.level.bottles.push(bottle);
        }
    }
    
    clearAllIntervals() {
        for (let i = 0; i < 100; i++) {
            clearInterval(i);
        }
    }
}
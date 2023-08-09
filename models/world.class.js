class World {
    canvas;
    ctx;
    keyboard;
    level;
    character = new Character();
    camera_x = 0;
    healthbar = new StatusBar(`HEALTH`, 100, 20, -10);
    coinbar;
    bottlebar;
    flyingBottles = [];
    start_screen = new DrawableObject();
    end_screen = new DrawableObject();

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.drawStartMenu();
        this.setWorldInCharacter();
    }

    drawStartMenu() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.start_screen.loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
        this.start_screen.width = 720;
        this.start_screen.height = 480;
        this.drawObjectOnCanvas(this.start_screen);
        let self = this;
        requestAnimationFrame(function () {
            self.drawStartMenu()
        });
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
        if (Object instanceof Chicken || Object instanceof Endboss || Object instanceof ThrowableBottle) {
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
            this.ctx.rect(Object.x + 35, Object.y + 35, Object.width - 70, Object.height - 70);
            this.ctx.stroke();
        }
        if (Object instanceof Bottle) {
            if (Object.direction == 1) {
                this.ctx.beginPath();
                this.ctx.lineWidth = '3';
                this.ctx.strokeStyle = 'blue';
                this.ctx.rect(Object.x + 25, Object.y + 12, Object.width - 50, Object.height - 20);
                this.ctx.stroke();
            }
            else {
                this.ctx.beginPath();
                this.ctx.lineWidth = '3';
                this.ctx.strokeStyle = 'blue';
                this.ctx.rect(Object.x + 35, Object.y + 12, Object.width - 50, Object.height - 20);
                this.ctx.stroke();
            }
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

    startGame() {
        this.level = level1;
        this.coinbar = new StatusBar(`COIN`, ((this.character.coinStore / this.level.maxCoins) * 100), 20, 20);
        this.bottlebar = new StatusBar(`BOTTLE`, ((this.character.bottleStore / this.level.maxBottles) * 100), 20, 50);
        this.drawGame();
        this.runFeedbackFunctions();
    }

    drawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawAllMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawAllStaticObjects();
        let self = this;
        requestAnimationFrame(function () {
            self.drawGame()
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
        if (this.flyingBottles.length > 0) {
            this.drawObjectArrayOnCanvas(this.flyingBottles);
        }
    }

    runningFeedbackFunctions() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowObjects();
            this.checkGameOver();
        }, 100);
    }

    checkCollisions() {
        this.collisionWithEnemie();
        this.collisionWithCoin();
        this.collisionWithBottle();
    }

    collisionWithEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.checkIfColliding(enemy)) {
                this.character.getHit(0.25);
                this.healthbar.setPercentage(this.character.lifepoints, this.healthbar.IMAGES_HEALTH);
            };
        });
    }

    collisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.checkIfColliding(coin)) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.character.coinStore++;
                this.coinbar.setPercentage(((this.character.coinStore / this.level.maxCoins) * 100), this.coinbar.IMAGES_COIN);
            };
        });
    }

    collisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.checkIfColliding(bottle)) {
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.character.bottleStore++;
                this.bottlebar.setPercentage(((this.character.bottleStore / this.level.maxBottles) * 100), this.bottlebar.IMAGES_BOTTLE);
            };
        });
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottleStore > 0) {
            this.flyingBottles.push(new ThrowableBottle(this.character.x + 25, this.character.y + 100, this.character.otherDirection));
            if (this.character.bottleStore > 0) {
                this.character.bottleStore--;
                this.bottlebar.setPercentage(((this.character.bottleStore / this.level.maxBottles) * 100), this.bottlebar.IMAGES_BOTTLE);
            }
        }
    }

    checkGameOver() {
        if (this.character.checkIfDead()) {
            this.drawGameOver();
            show('restart-button');
        }
    }

    drawGameOver() {
        this.end_screen.loadImage("img/9_intro_outro_screens/game_over/game over!.png");
        this.end_screen.width = 720;
        this.end_screen.height = 480;
        this.drawObjectOnCanvas(this.end_screen);
        let self = this;
        requestAnimationFrame(function () {
            self.drawGameOver()
        });
        this.clearAllIntervals();
    }

    clearAllIntervals() {
        for (let i = 0; i < 100; i++) {
            clearInterval(i);
        }
    }
}
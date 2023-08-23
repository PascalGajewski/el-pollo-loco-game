class World {
    canvas;
    ctx;
    keyboard;
    level;
    character;
    camera_x = 0;
    characterHealthbar = new StatusBar(`HEALTH`, 100, 20, -10);
    endbossHealthbar = new StatusBar(`HEALTH_ENDBOSS`, 100, 500, -10);
    coinbar;
    bottlebar;
    flyingBottles = [];
    start_screen = new DrawableObject();
    end_screen = new DrawableObject();
    collidingPaused = false;
    flyingPaused = false;
    throwingPaused = false;
    gameOver = false;
    animationFrame;
    isFullscreen = false;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.drawStartMenu();
        this.checkFullscreen();
    }

    drawStartMenu() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.start_screen.loadImage("img/9_intro_outro_screens/start/startscreen_1.png");
        this.start_screen.width = 720;
        this.start_screen.height = 480;
        this.drawObjectOnCanvas(this.start_screen);
        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
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
        if (Object instanceof Chicken || Object instanceof ThrowableBottle || Object instanceof Endboss || Object instanceof Coin || Object instanceof Bottle || Object instanceof Character) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'red';
            this.ctx.rect(Object.x + Object.offsetX, Object.y + Object.offsetY, Object.width + Object.offsetWidth, Object.height + Object.offsetHeight);
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
        this.character = new Character();
        this.coinbar = new StatusBar(`COIN`, ((this.character.coinStore / this.level.maxCoins) * 100), 20, 20);
        this.bottlebar = new StatusBar(`BOTTLE`, ((this.character.bottleStore / this.level.maxBottles) * 100), 20, 50);
        this.setWorldInCharacter();
        this.drawGame();
        this.runningFeedbackFunctions();
    }

    drawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawAllMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawAllStaticObjects();
        cancelAnimationFrame(this.animationFrame);
        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
            self.drawGame()
        });
    }

    drawAllStaticObjects() {
        this.drawObjectOnCanvas(this.characterHealthbar);
        this.drawObjectOnCanvas(this.coinbar);
        this.drawObjectOnCanvas(this.bottlebar);
        if (this.character.reachedEndboss) {
            this.drawObjectOnCanvas(this.endbossHealthbar);
        }
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
            this.checkThrowObjects();
            this.checkGameOver();
        }, 1000 / 60);
    }

    checkCollisions() {
        if (!this.collidingPaused) {
            this.collisionWithEnemy();
        }
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.collisionFlyingBottles();
    }

    collisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.killed) {
                this.characterGetsHurt(enemy);
                this.enemyGetsHurt(enemy);
            }
        });
    }

    characterGetsHurt(enemy) {
        if (this.character.checkIfColliding(enemy) && this.character.y > 80 && !enemy.checkIfDead()) {
            this.character.getHit(0.25);
            this.characterHealthbar.setPercentage(this.character.lifepoints, this.characterHealthbar.IMAGES_HEALTH);
        };
    }

    enemyGetsHurt(enemy) {
        if (this.character.checkIfColliding(enemy) && this.character.y <= 80 && enemy instanceof Chicken && this.character.speed_y < 0 && !this.collidingPaused) {
            this.collidingPaused = true;
            enemy.getHit(100);
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                this.collidingPaused = false;
            }, 1000);
        }
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

    collisionFlyingBottles() {
        this.flyingBottles.forEach(thrownBottle => {
            this.level.enemies.forEach(enemy => {
                if (thrownBottle.checkIfColliding(enemy) && enemy instanceof Chicken) {
                    thrownBottle.isCollided = true;
                    if (!this.flyingPaused) {
                        this.flyingPaused = true;
                        enemy.getHit(100);
                        setTimeout(() => {
                            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                            this.flyingPaused = false;
                        }, 1000);
                    }
                }
                if (thrownBottle.checkIfColliding(enemy) && enemy instanceof Endboss) {
                    thrownBottle.isCollided = true;
                    if (!this.flyingPaused) {
                        this.flyingPaused = true;
                        enemy.getHit(20);
                        this.endbossHealthbar.setPercentage(enemy.lifepoints, this.endbossHealthbar.IMAGES_HEALTH_ENDBOSS);
                        setTimeout(() => {
                            this.flyingPaused = false;
                        }, 1000);
                    }
                }
                if (enemy instanceof Endboss && enemy.killed && !this.gameOver) {
                    setTimeout(() => {
                        this.drawGameOver();
                        show('restart-button');
                    }, 1500);
                }
            });
        })
    }

    checkThrowObjects() {
        this.generateThrownBottle();
        this.checkIfDeleteThrownBottle();
    }

    generateThrownBottle() {
        if (this.keyboard.SPACE && this.character.bottleStore > 0 && !this.throwingPaused) {
            this.throwingPaused = true;
            this.flyingBottles.push(new ThrowableBottle(this.character.x + 25, this.character.y + 100, this.character.otherDirection));
            if (this.character.bottleStore > 0) {
                this.character.bottleStore--;
                this.bottlebar.setPercentage(((this.character.bottleStore / this.level.maxBottles) * 100), this.bottlebar.IMAGES_BOTTLE);
            }
            setTimeout(() => {
                this.throwingPaused = false;
            }, 250);
        }
    }

    checkIfDeleteThrownBottle() {
        this.flyingBottles.forEach(flyingBottle => {
            if (flyingBottle.splashed) {
                this.flyingBottles.splice(this.flyingBottles.indexOf(flyingBottle), 1);
            }
        });
    }

    checkGameOver() {
        if (this.character.checkIfDead() && !this.gameOver) {
            this.drawGameOver();
            show('restart-button');
        }
    }

    drawGameOver() {
        this.gameOver = true;
        this.end_screen.loadImage("img/9_intro_outro_screens/game_over/game over!.png");
        this.end_screen.width = 720;
        this.end_screen.height = 480;
        this.drawObjectOnCanvas(this.end_screen);
        cancelAnimationFrame(this.animationFrame);
        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
            self.drawGameOver()
        });
        setTimeout(() => {
            this.clearAllIntervals();
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = 0;
        }, 25);
    }

    clearAllIntervals() {
        for (let i = 0; i < 1000; i++) {
            clearInterval(i);
        }
    }

    checkFullscreen() {
        setInterval(() => {
            if (this.keyboard.ENTER && !this.isFullscreen) {
                let fullscreen = document.getElementById('fullscreen');
                this.enterFullscreen(fullscreen);
            }
            else if (this.keyboard.ENTER && this.isFullscreen) {
                this.exitFullscreen();
            }
        }, 100);
    }

    enterFullscreen(element) {
        this.isFullscreen = true;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari und Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // Internet Explorer
            element.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        this.isFullscreen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari und Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // Internet Explorer
            document.msExitFullscreen();
        }
    }
}
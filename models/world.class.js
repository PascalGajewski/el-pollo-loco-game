class World {
    canvas;
    ctx
    keyboard;
    level;
    character;
    camera_x = 0;
    characterHealthbar = new StatusBar(`HEALTH`, 100, 20, -10);
    endbossHealthbar = new StatusBar(`HEALTH_ENDBOSS`, 100, 450, -10);
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
    lastCharacterMove = [];
    THEME_SONG = new Audio('audio/theme-song.mp3');
    DYING_BIRD_SOUND = new Audio('audio/bird-dying.mp3');
    SMASHING_BOTTLE_SOUND = new Audio('audio/smashing-bottle.mp3');
    FLYING_BOTTLE_SOUND = new Audio('audio/flying-bottle.mp3');
    PICK_COIN_SOUND = new Audio('audio/pick-coin.mp3');
    PICK_BOTTLE_SOUND = new Audio('audio/pick-bottle.mp3');

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.drawStartMenu();
        this.initiateSoundSettings();
    }

    /**
     * This function clears the canvas and draws the start screen on it. 
     */
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

    /**
     * This function draws ONE object from the class "DrawableObject" on the canvas by executing the 
     * function "drawOnCanvas".
     * 
     * @param {DrawableObject} drawableObject - this is an object from the class "DrawableObject" 
     * or an object from a class, that extends the "DrawableObject" class. 
     */
    drawObjectOnCanvas(drawableObject) {
        this.drawOnCanvas(drawableObject);
    }

    /**
     * This function draws ALL objects from an array that is full of objects from the class "DrawableObject"
     * by executing the function "drawOnCanvas" for every object in the array.
     * 
     * @param {ObjectArray} drawableObjectArray - this is an array of objects from the class "DrawableObject". 
     */
    drawObjectArrayOnCanvas(drawableObjectArray) {
        drawableObjectArray.forEach(Object => {
            this.drawOnCanvas(Object);
        });
    }

    /**
     * This function checks the orientation of an Object from the class "DrawableObject" and draws it on the canvas.
     * 
     * @param {DrawableObject} drawableObject - this is an object from the class "DrawableObject" 
     * or an object from a class, that extends the "DrawableObject" class.
     */
    drawOnCanvas(drawableObject) {
        drawableObject
        this.checkReverse(drawableObject);
        this.ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y,
            drawableObject.width, drawableObject.height);
        this.restoreReverse(drawableObject);
    }

    /**
     * This function checks the orientation of a "DrawableObject" by checking the variable "otherDirection".
     * If the value is true, the function turns the drawing direction into the other direction (on the x-axis) 
     * before it is going to be drawn on the canvas.
     * 
     * @param {DrawableObject} drawableObject - this is an object from the class "DrawableObject" 
     * or an object from a class, that extends the "DrawableObject" class. 
     */
    checkReverse(drawableObject) {
        if (drawableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(drawableObject.width, 0);
            this.ctx.scale(-1, 1);
            drawableObject.x = drawableObject.x * -1;
        }
    }

    /**
     * This function changes the drawing direction into the saved direction, before the last "DrawableObject"
     * with the value "otherDirection = true" was drawn on the canvas.
     * 
     * @param {DrawableObject} drawableObject - this is an object from the class "DrawableObject" 
     * or an object from a class, that extends the "DrawableObject" class. 
     */
    restoreReverse(drawableObject) {
        if (drawableObject.otherDirection) {
            drawableObject.x = drawableObject.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * This function initiates all the sound settings from the sounds in the class "World" to a default value.
     */
    initiateSoundSettings() {
        this.THEME_SONG.loop = true;
        this.THEME_SONG.volume = 0.35;
        this.FLYING_BOTTLE_SOUND.volume = 0.25;
        this.DYING_BIRD_SOUND.volume = 0.25;
        this.PICK_BOTTLE_SOUND.volume = 0.5;
        this.SMASHING_BOTTLE_SOUND.volume = 0.35;
    }

    /**
     * This function is executed when the game is started. It sets some variables and objects,
     * turns them over to the object from the class "Character", draws the whole game on the canvas
     * and starts running the feedback functions of the game. 
     */
    startGame() {
        this.level = level1;
        this.character = new Character();
        this.coinbar = new StatusBar(`COIN`, ((this.character.coinStore / this.level.maxCoins) * 100), 20, 30);
        this.bottlebar = new StatusBar(`BOTTLE`, ((this.character.bottleStore / this.level.maxBottles) * 100), 20, 70);
        this.setWorldInCharacter();
        this.drawGame();
        this.runningFeedbackFunctions();
    }

    /**
     * This function turns over all the variables and objects from the object with the class "World"
     * to the object with the class "Character"
     */
    setWorldInCharacter() {
        this.character.world = this;
    }

    /**
     * This function draws all objects (movable and static) on the canvas after clearing it. It also
     * resets the requestAnimationFrame.
     */
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

    /**
     * This functions draws all the drawable objects on the canvas, that are NOT movable.
     */
    drawAllStaticObjects() {
        this.drawObjectOnCanvas(this.characterHealthbar);
        this.drawObjectOnCanvas(this.coinbar);
        this.drawObjectOnCanvas(this.bottlebar);
        if (this.character.reachedEndboss) {
            this.drawObjectOnCanvas(this.endbossHealthbar);
        }
    }

    /**
     * This functions draws all the drawable objects on the canvas, that are movable.
     */
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

    /**
     * This function starts to run all functions that are checking things in the background of the game 
     * and that are giving feedback to several elements.
     */
    runningFeedbackFunctions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkGameOver();
            this.checkCharacterMovement();
        }, 1000 / 60);
    }

    /**
     * This function checks all kinds of collisions in the game.
     */
    checkCollisions() {
        if (!this.collidingPaused) {
            this.collisionWithEnemy();
        }
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.collisionFlyingBottles();
    }

    /**
     * This function checks all collisions between the character and the enemies (chickens and endboss).
     */
    collisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.killed) {
                this.characterGetsHurt(enemy);
                this.enemyGetsHurt(enemy);
            }
        });
    }

    /**
     * This function hurts the character, if it is colliding with an enemy, and the character has not
     * jumped onto the enemy.
     * 
     * @param {MovableObject} enemy - an object from the class "Chicken" or "Endboss". 
     */
    characterGetsHurt(enemy) {
        if (this.character.checkIfColliding(enemy) && this.character.y > 80 && !enemy.checkIfDead()) {
            this.character.getHit(0.25);
            this.characterHealthbar.setPercentage(this.character.lifepoints, this.characterHealthbar.IMAGES_HEALTH);
        };
    }

    /**
     * This function hurts/kills an enemy object if it is from the class "Chicken" and the character jumps on it.
     * 
     * @param {MovableObject} enemy - an object from the class "Chicken" or "Endboss". 
     */
    enemyGetsHurt(enemy) {
        if (this.character.checkIfColliding(enemy) && this.character.y <= 80 && enemy instanceof Chicken && this.character.speed_y < 0 && !this.collidingPaused) {
            this.collidingPaused = true;
            this.DYING_BIRD_SOUND.play();
            enemy.getHit(100);
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                this.collidingPaused = false;
            }, 100);
        }
    }

    /**
     * This function checks if the character collected an object from the class "Coin"
     * and increases the coin storage of the character. The coin is also deleted from the canvas.
     */
    collisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.checkIfColliding(coin)) {
                this.PICK_COIN_SOUND.currentTime = 0;
                this.PICK_COIN_SOUND.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.character.coinStore++;
                this.coinbar.setPercentage(((this.character.coinStore / this.level.maxCoins) * 100), this.coinbar.IMAGES_COIN);
            };
        });
    }

    /**
     * This function checks if the character collected an object from the class "Bottle"
     * and increases the bottle storage of the character. The bottle is also deleted from the canvas.
     */
    collisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.checkIfColliding(bottle)) {
                this.PICK_BOTTLE_SOUND.currentTime = 0;
                this.PICK_BOTTLE_SOUND.play();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.character.bottleStore++;
                this.bottlebar.setPercentage(((this.character.bottleStore / this.level.maxBottles) * 100), this.bottlebar.IMAGES_BOTTLE);
            };
        });
    }

    /**
     * This function checks all collisions between a thrown bottle and the enemies. It also checks
     * if a thrown bottle killed the endboss and in case it ends the game.
     */
    collisionFlyingBottles() {
        this.flyingBottles.forEach(thrownBottle => {
            this.level.enemies.forEach(enemy => {
                this.bottleCollidsWithChicken(thrownBottle, enemy);
                this.bottleCollidsWithEndboss(thrownBottle, enemy);
                this.checkIfBottleKilledEndboss(enemy);
            });
        })
    }

    /**
     * This function checks the collisions between thrown bottles and objects from class "Chicken".
     * If they are colliding, the chicken gets hurt/killed and it is deleted from canvas and the enemies
     * array. The dying bird sound is also played ones.
     * 
     * @param {ThrowableBottle} thrownBottle - an object from the class "ThrowableBottle".
     * @param {MovableObject} enemy - an object from the class "Chicken" or "Endboss".  
     */
    bottleCollidsWithChicken(thrownBottle, enemy) {
        if (thrownBottle.checkIfColliding(enemy) && enemy instanceof Chicken) {
            thrownBottle.isCollided = true;
            if (!this.flyingPaused) {
                this.flyingPaused = true;
                enemy.getHit(100);
                this.DYING_BIRD_SOUND.play();
                setTimeout(() => {
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    this.flyingPaused = false;
                }, 1000);
            }
        }
    }

    /**
     * This function checks the collisions between thrown bottles and objects from class "Endboss".
     * If they are colliding, the endboss gets hurt and the endbosses healthbar is refreshed.
     * 
     * @param {ThrowableBottle} thrownBottle - an object from the class "ThrowableBottle".
     * @param {MovableObject} enemy - an object from the class "Chicken" or "Endboss".  
     */
    bottleCollidsWithEndboss(thrownBottle, enemy) {
        if (thrownBottle.checkIfColliding(enemy) && enemy instanceof Endboss) {
            thrownBottle.isCollided = true;
            if (!this.flyingPaused) {
                this.flyingPaused = true;
                enemy.getHit(20);
                this.DYING_BIRD_SOUND.play();
                this.endbossHealthbar.setPercentage(enemy.lifepoints, this.endbossHealthbar.IMAGES_HEALTH_ENDBOSS);
                setTimeout(() => {
                    this.flyingPaused = false;
                }, 1000);
            }
        }
    }

    /**
     * This function checks if the endboss is killed. In case it draws the end-screen and shows 
     * the restart button. The dying bird sound is also played ones.
     * 
     * @param {MovableObject} enemy - an object from the class "Chicken" or "Endboss".  
     */
    checkIfBottleKilledEndboss(enemy) {
        if (enemy instanceof Endboss && enemy.killed) {
            setTimeout(() => {
                this.drawGameOver();
                show('restart-button');
            }, 500);
        }
    }

    /**
     * This function checks if a bottle is thrown. It generates and deletes the thrown bottles.
     */
    checkThrowObjects() {
        this.generateThrownBottle();
        this.checkIfDeleteThrownBottle();
    }

    /**
     * This function generates an object from the class "ThrowableObject" if the SPACE button is triggered
     * and there are bottles in the characters bottle storage. A throwing sound is played characters bottle 
     * storage and healtbar is refreshed.
     */
    generateThrownBottle() {
        if (this.keyboard.SPACE && this.character.bottleStore > 0 && !this.throwingPaused) {
            this.throwingPaused = true;
            this.FLYING_BOTTLE_SOUND.currentTime = 0;
            this.FLYING_BOTTLE_SOUND.play();
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

    /**
     * This function checks if the thrown bottle is colliding with an enemy or the ground. In case it 
     * play a smashing bottle sound and deletes the smashed bottle afterwards.
     */
    checkIfDeleteThrownBottle() {
        this.flyingBottles.forEach(flyingBottle => {
            if (flyingBottle.isCollided) {
                this.SMASHING_BOTTLE_SOUND.play();
            }
            if (flyingBottle.splashed) {
                this.flyingBottles.splice(this.flyingBottles.indexOf(flyingBottle), 1);
            }
        });
    }

    /**
     * This function checks if the game is over, because of the dead of the character. In case it 
     * ends the game and shows the restart button.
     */
    checkGameOver() {
        if (this.character.checkIfDead() && !this.gameOver) {
            this.drawGameOver();
            show('restart-button');
        }
    }

    /**
     * This function draws the end screen on the canvas and resets the requestAnimationFrame. 
     * It also clears all the running intervals in the game.
     */
    drawGameOver() {
        this.gameOver = true;
        this.drawEndScreen();
        setTimeout(() => {
            this.clearAllIntervals();
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = 0;
        }, 50);
    }

    /**
     * This function draws the end screen on the canvas.
     */
    drawEndScreen() {
        this.end_screen.loadImage("img/9_intro_outro_screens/game_over/game over!.png");
        this.end_screen.width = 720;
        this.end_screen.height = 480;
        this.drawObjectOnCanvas(this.end_screen);
        cancelAnimationFrame(this.animationFrame);
        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
            self.drawGameOver()
        });
    }
    
    /**
     * This function clears the intervals with the ids 1-1000 (all intervals in the game).
     */
    clearAllIntervals() {
        for (let i = 0; i < 1000; i++) {
            clearInterval(i);
        }
    }

    /**
     * This function checks the last movement of the character. It fills the "lastCharacterMove" array since the 
     * moment, the character does not move anymore. The first value in the arry is later used to calculate the 
     * time the character has not moved. If the character moves again, the array "lastCharacterMove" is blanked.
     */
    checkCharacterMovement() {
        if (!this.keyboard.LEFT && !this.keyboard.UP && !this.keyboard.RIGHT && !this.keyboard.SPACE && !this.keyboard.ENTER) {
            this.lastCharacterMove.push(new Date().getTime());
        }
        else {
            this.lastCharacterMove = [];
        }
    }
}
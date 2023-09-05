class Endboss extends MovableObject {
    x = 719 * 5;
    y = 160;
    width = 260;
    height = 280;
    offsetX = 30;
    offsetY = 80;
    offsetWidth = -60;
    offsetHeight = -90;
    killed = false;
    randomMove = 1;
    randomDirection = 1;
    movingPaused = false;
    IMAGES_WALKING = ['img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = ['img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = ['img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    movingInterval;
    animationInterval;
    index = 0;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadAllImageCaches();
        this.animate();
    }

    /**
     * This function loads all the image caches.
     */
    loadAllImageCaches() {
        this.loadImageCache(this.IMAGES_WALKING);
        this.loadImageCache(this.IMAGES_ALERT);
        this.loadImageCache(this.IMAGES_ATTACK);
        this.loadImageCache(this.IMAGES_HURT);
        this.loadImageCache(this.IMAGES_DEAD);
    }

    /**
     * This function animates all the endbosses movements, depending on if its alive or not. 
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (!this.checkIfDead() && world.character.reachedEndboss) {
                this.endbossAlive();
            }
            else if (this.checkIfDead()) {
                this.endbossKilled();
            }
        }, 150);
    }

    /**
     * This function animates the moves while the endboss is alive.
     */
    endbossAlive() {
        if (this.index < 10) {
            this.animateMovement(this.IMAGES_ALERT);
            this.index++;
        }
        else if (this.checkIfHurt()) {
            clearInterval(this.movingInterval);
            this.animateMovement(this.IMAGES_HURT);
        }
        else if (this.randomMove == 1 && !this.movingPaused) {
            this.endbossAttack();
        }
        else if (this.randomMove == 2 && !this.movingPaused) {
            this.endbossWalk();
        }
    }

    /**
     * This function animates the attacking move of the endboss into a random direction.
     */
    endbossAttack() {
        this.movingPaused = true;
        this.movingInterval = setInterval(() => {
            this.animateMovement(this.IMAGES_ATTACK);
        }, 100);
        setTimeout(() => {
            clearInterval(this.movingInterval);
            this.randomiseMovement();
            this.movingPaused = false;
        }, 1000);
    }

    /**
     * This function triggers the Walking functions for the endboss.
     */
    endbossWalk() {
        this.movingPaused = true;
        this.endbossWalkingLeft();
        this.endbossWalkingRight();
        this.resetEndbossMoves();
    }

    /**
     * This function lets the endboss walk to the left, if it is possible.
     * If the endboss is moving to far to the left and leaving the endboss 
     * area, it turns around and moves into the other direction.
     */
    endbossWalkingLeft() {
        if (this.randomDirection == 1 && this.x > 3000) {
            this.otherDirection = false;
            this.movingInterval = setInterval(() => {
                if (this.x > 3000) {
                    this.animateMovement(this.IMAGES_WALKING);
                    this.x -= 15;
                }
                else {
                    this.otherDirection = true;
                    this.animateMovement(this.IMAGES_WALKING);
                    this.x += 15;
                }
            }, 100);
        }
    }

    /**
     * This function lets the endboss walk to the right, if it is possible.
     * If the endboss is moving to far to the right and leaving the endboss 
     * area, it turns around and moves into the other direction.
     */
    endbossWalkingRight() {
        if (this.randomDirection == 2 && this.x < 3640) {
            this.otherDirection = true;
            this.movingInterval = setInterval(() => {
                if (this.x < 3640) {
                    this.animateMovement(this.IMAGES_WALKING);
                    this.x += 15;
                }
                else {
                    this.otherDirection = false;
                    this.animateMovement(this.IMAGES_WALKING);
                    this.x -= 15;
                }
            }, 100);
        }
    }

    /**
     * This function resets the last movement of the endboss and resets the kind 
     * of Movement and the Movement Direction randomly.
     */
    resetEndbossMoves() {
        setTimeout(() => {
            clearInterval(this.movingInterval);
            this.randomiseMovement();
            this.randomiseDirection();
            this.movingPaused = false;
        }, 1500);
    }

    /**
     * This function sets a random value (1 or 2) to the variable "randomMove".
     */
    randomiseMovement() {
        this.randomMove = Math.floor(Math.random() * 2) + 1;
    }

    /**
     * This function sets a random value (1 or 2) to the variable "randomDirection".
     */
    randomiseDirection() {
        this.randomDirection = Math.floor(Math.random() * 2) + 1;
    }

    /**
     * This function animates the endbosses moves when its dead.
     */
    endbossKilled() {
        clearInterval(this.movingInterval);
        clearInterval(this.animationInterval);
        this.killed = true;
        this.animateOnlyOneImageArray(this.IMAGES_DEAD);
    }

    /**
     * This function checks, if the endboss got hurt in the last second. In Case it returns "true".
     * 
     * @returns Boolean
     */
    checkIfHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 1;
    }

    /**
     * This function loads the images from the given path array into the variabe "img" one by one, 
     * but only one time for the whole array.
     * 
     * @param {Array} pathArray - an array of the paths of images sources.
     */
    animateOnlyOneImageArray(pathArray) {
        let i = 0;
        setInterval(() => {
            if (i < pathArray.length) {
                this.img = this.imgCache[pathArray[i]];
                i++;
            }
        }, 100);
    }
}
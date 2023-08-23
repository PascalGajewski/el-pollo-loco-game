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

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadAllImageCaches();
        this.animate();
    }

    loadAllImageCaches() {
        this.loadImageCache(this.IMAGES_WALKING);
        this.loadImageCache(this.IMAGES_ALERT);
        this.loadImageCache(this.IMAGES_ATTACK);
        this.loadImageCache(this.IMAGES_HURT);
        this.loadImageCache(this.IMAGES_DEAD);
    }

    animate() {
        let i = 0;
        let movingInterval;
        let animationInterval = setInterval(() => {
            if (!this.checkIfDead() && world.character.reachedEndboss) {
                if (i < 10) {
                    this.animateMovement(this.IMAGES_ALERT);
                    i++;
                }
                else if (this.checkIfHurt()) {
                    clearInterval(movingInterval);
                    this.animateMovement(this.IMAGES_HURT);
                }
                else if (this.randomMove == 1 && !this.movingPaused) {
                    this.movingPaused = true;
                    movingInterval = setInterval(() => {
                        this.animateMovement(this.IMAGES_ATTACK);
                    }, 100);
                    setTimeout(() => {
                        clearInterval(movingInterval);
                        this.randomiseMovement();
                        this.movingPaused = false;
                    }, 1000);
                }
                else if (this.randomMove == 2 && !this.movingPaused) {
                    this.movingPaused = true;
                    if (this.randomDirection == 1 && this.x > 3000) {
                        this.otherDirection = false;
                        movingInterval = setInterval(() => {
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
                    if (this.randomDirection == 2 && this.x < 3640) {
                        this.otherDirection = true;
                        movingInterval = setInterval(() => {
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
                    setTimeout(() => {
                        clearInterval(movingInterval);
                        this.randomiseMovement();
                        this.randomiseDirection();
                        this.movingPaused = false;
                    }, 1500);
                }
            }
            else if (this.checkIfDead()) {
                clearInterval(animationInterval);
                this.killed = true;
                this.animateOnlyOneImageArray(this.IMAGES_DEAD);
            }
        }, 150);
    }

    randomiseMovement() {
        this.randomMove = Math.floor(Math.random() * 2) + 1;
        console.log('MOVE', this.randomMove);
    }

    randomiseDirection() {
        this.randomDirection = Math.floor(Math.random() * 2) + 1;
        console.log('Direction', this.randomDirection);
    }

    checkIfHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 1;
    }

    animateOnlyOneImageArray(ImageArray) {
        let i = 0;
        setInterval(() => {
            if (i < ImageArray.length) {
                this.img = this.imgCache[ImageArray[i]];
                i++;
            }
        }, 100);
    }
}
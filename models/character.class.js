class Character extends MovableObject {
    world;
    ground_level = 130;
    x = 100;
    y = this.ground_level;
    width = 120;
    height = 300;
    coinStore = 0;
    bottleStore = 0;
    offsetX = 30;
    offsetY = 130;
    offsetWidth = -60;
    offsetHeight = -145;
    IMAGES_WALKING = ['img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = ['img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'

    ];
    IMAGES_DEAD = ['img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = ['img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEP = ['img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    WALKING_SOUND = new Audio('audio/walk.mp3');
    speed_x = 7.5;
    speed_y = 0;
    acceleration_y = 0.5;
    paralysed = false;
    reachedEndboss = false;

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
        this.loadCompleteImageCache();
        this.applyGravity();
        this.animate();
        this.WALKING_SOUND.playbackRate = 2.5;
    }

    animate() {
        this.animateMoves();
        this.movingLeft();
        this.movingRight();
        this.movingUp();
    }

    loadCompleteImageCache() {
        this.loadImageCache(this.IMAGES_WALKING);
        this.loadImageCache(this.IMAGES_JUMPING);
        this.loadImageCache(this.IMAGES_HURT);
        this.loadImageCache(this.IMAGES_DEAD);
        this.loadImageCache(this.IMAGES_IDLE);
        this.loadImageCache(this.IMAGES_SLEEP);
    }

    movingLeft() {
        setInterval(() => {
            if (!this.reachedEndboss) {
                if (this.world.keyboard.LEFT && this.x > 0 && !this.paralysed) {
                    this.otherDirection = true;
                    this.x -= this.speed_x;
                }
                this.world.camera_x = -this.x + 100;
            }
            else {
                if (this.world.keyboard.LEFT && this.x > 2800 && !this.paralysed) {
                    this.otherDirection = true;
                    this.x -= this.speed_x;
                }
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    movingRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < (this.world.level.level_end_x - 680) && !this.paralysed) {
                this.otherDirection = false;
                this.x += this.speed_x;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    movingUp() {
        setInterval(() => {
            if (this.world.keyboard.UP && !this.checkIfAboveGround() && !this.checkIfHurt()) {
                this.speed_y = 14;
            }
        }, 1000 / 60);
    }

    animateMoves() {
        setInterval(() => {
            this.WALKING_SOUND.pause();
            this.checkReachedEndboss();
            if (this.checkIfDead()) {
                this.animateMovement(this.IMAGES_DEAD);
            }
            else if (this.checkIfHurt()) {
                this.animateMovement(this.IMAGES_HURT);
                this.animateParalisation();
            }
            else if (this.checkIfAboveGround()) {
                this.animateMovement(this.IMAGES_JUMPING);
            }
            else if (this.checkIfSleeping()) {
                this.animateMovement(this.IMAGES_SLEEP);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateMovement(this.IMAGES_WALKING);
                this.WALKING_SOUND.play();
            }
            else {
                this.animateMovement(this.IMAGES_IDLE);
            }
        }, 75);
}

checkReachedEndboss() {
    if (this.x > 3200) {
        this.reachedEndboss = true;
    }
};

animateParalisation() {
    this.paralysed = true;
    setTimeout(() => {
        this.paralysed = false;
    }, 50);
}

checkIfSleeping(){
    if(this.world.lastCharacterMove){
    let timePassed = (new Date().getTime() - this.world.lastCharacterMove[0]) / 1000;
    return timePassed > 3
    }
    else {
        return false;
    }
}
}
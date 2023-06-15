class Character extends MovableObject {
    world;
    level_end_x;
    ground_level = 130;
    x = 100;
    y = this.ground_level;
    width = 120;
    height = 300;
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
    WALKING_SOUND = new Audio('audio/walk.mp3');
    speed_x = 7.5;
    speed_y = 0;
    acceleration_y = 0.5;

    constructor(level_end_x) {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
        this.loadImageCache(this.IMAGES_WALKING);
        this.loadImageCache(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
        this.level_end_x = level_end_x;
        this.WALKING_SOUND.playbackRate = 2.5;
    }

    animate() {
        this.animateMoves();
        this.movingLeft();
        this.movingRight();
        this.movingUp();
    }

    movingLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.x -= this.speed_x;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    movingRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < (this.level_end_x - 680)) {
                this.otherDirection = false;
                this.x += this.speed_x;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    movingUp() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.checkIfAboveGround()) {
                this.speed_y = 14;
            }
        }, 1000 / 60);
    }

    animateMoves() {
        setInterval(() => {
            this.WALKING_SOUND.pause();
            if (this.checkIfAboveGround()) {
                this.animateMovement(this.IMAGES_JUMPING);
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.WALKING_SOUND.play();
                    this.animateMovement(this.IMAGES_WALKING);
                }
                else {
                    this.loadImage('img/2_character_pepe/3_jump/J-31.png');
                }
            }
        }, 75);
    }

    checkIfAboveGround() {
        return (this.y < this.ground_level);
    }
    
    checkIfColliding(movableObject) {
        return (this.x + this.width) >= movableObject.x && this.x <= (movableObject.x + movableObject.width) &&
            (this.y + this.height) >= movableObject.y &&
            (this.y) <= (movableObject.y + movableObject.height)
    }
}
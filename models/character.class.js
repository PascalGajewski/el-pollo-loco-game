class Character extends MovableObject {
    world;
    level_end_x;
    ground_level = 130;
    x = 100;
    y = 30;
    width = 120;
    height = 300;
    IMAGES_WALKING = ['img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'];
    WALKING_SOUND = new Audio('audio/walk.mp3');
    speed_x = 7.5;
    speed_y = 0;
    acceleration_y = 0.5;

    constructor(level_end_x) {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImageCache(this.IMAGES_WALKING);
        this.applyGravity();
        this.animate();
        this.level_end_x = level_end_x;
    }

    animate() {
        this.animateWalking()
        this.movingLeft();
        this.movingRight();
    }

    movingLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.x -= this.speed_x;
                this.WALKING_SOUND.pause();
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

    animateWalking() {
        setInterval(() => {
            this.WALKING_SOUND.pause();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.WALKING_SOUND.play();
                this.walkAnimation();
            }
        }, 75);
    }

    walkAnimation() {
        let i = this.currentImage % this.IMAGES_WALKING.length
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.checkIfAboveGround()) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration_y;
            }
        }, 1000 / 60);
    }

    checkIfAboveGround() {
        return this.y < this.ground_level;
    }
}
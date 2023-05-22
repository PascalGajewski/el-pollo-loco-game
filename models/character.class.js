class Character extends MovableObject {
    world;
    level_end_x;
    x = 100;
    y = 130;
    width = 120;
    height = 300;
    IMAGES_WALKING = ['img/2_character_pepe/2_walk/W-21.png',
                      'img/2_character_pepe/2_walk/W-22.png',
                      'img/2_character_pepe/2_walk/W-23.png',
                      'img/2_character_pepe/2_walk/W-24.png',
                      'img/2_character_pepe/2_walk/W-25.png',
                      'img/2_character_pepe/2_walk/W-26.png'];
    speed = 7.5;

    constructor(level_end_x) {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImageCache(this.IMAGES_WALKING);
        this.animate();
        this.level_end_x = level_end_x;
        }

    animate() {
        this.movingLeft();
        this.movingRight();
    }

    movingLeft() {
        setInterval(() => {
            if(this.world.keyboard.LEFT && this.x > 0){
            this.otherDirection = true;
            this.x -= this.speed;}
            this.world.camera_x = -this.x + 100;
        }, 1000/60);
        setInterval(() => {
            if(this.world.keyboard.LEFT){
                this.animateWalking();}
        }, 75);
    }

    movingRight() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < (this.level_end_x - 100)){
                this.otherDirection = false;
            this.x += this.speed;}
            this.world.camera_x = -this.x + 100;
        }, 1000/60);
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
                this.animateWalking();}
        }, 75);
    }

    animateWalking() {
        let i = this.currentImage % this.IMAGES_WALKING.length
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    animateJump() {

    }
}
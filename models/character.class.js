class Character extends MovableObject {
    world;
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

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImageCache(this.IMAGES_WALKING);
        this.animate();
        }

    animate() {
        this.movingLeft();
        this.movingRight();
    }

    movingLeft() {
        setInterval(() => {
            if(this.world.keyboard.LEFT){
            this.otherDirection = true;
            this.x -= this.speed;}
            this.world.camera_x = -this.x;
        }, 1000/60);
        setInterval(() => {
            if(this.world.keyboard.LEFT){
                this.animateWalking();}
        }, 75);
    }

    movingRight() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
                this.otherDirection = false;
            this.x += this.speed;}
            this.world.camera_x = -this.x;
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
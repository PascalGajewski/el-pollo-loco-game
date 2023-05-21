class Character extends MovableObject {
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
    speed = 5;
    world;

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
            this.x -= this.speed;}
        }, 1000/60);
        setInterval(() => {
            if(this.world.keyboard.LEFT){
                this.animateWalking();}
        }, 80);
    }

    movingRight() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
            this.x += this.speed;}
        }, 1000/60);
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
                this.animateWalking();}
        }, 80);
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
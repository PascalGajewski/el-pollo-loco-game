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
    speed = 10;
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImageCache(this.IMAGES_WALKING);
        console.log('Trying to load world variable in character class', this.world);
        }

    animateWalkingRight() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length
            let path = this.IMAGES_WALKING[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 100);
    }

    animateJump() {

    }
}
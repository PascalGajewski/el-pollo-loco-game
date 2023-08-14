class Chicken extends MovableObject {
    y = 340;
    width = 60;
    height = 80;
    speed;
    killed = false;
    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * (719 * 4);
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImageCache(this.IMAGES_WALKING);
        this.animate();
        this.moveLeft(this.speed);
    }

    animate() {
        setInterval(() => {
            if (!this.checkIfDead()) {
                this.animateMovement(this.IMAGES_WALKING);
            }
            if (this.checkIfDead()) {
                this.killed = true;
                this.loadImage(this.IMAGE_DEAD);
            }
        }, 150);
    }
}
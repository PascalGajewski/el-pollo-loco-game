class Chicken extends MovableObject {
    y = 340;
    width = 60;
    height = 80;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = Math.random() * 500 + 200;
    }
}
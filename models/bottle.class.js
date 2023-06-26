class Bottle extends MovableObject {
    width = 80;
    height = 80;
    
    constructor() {
        super();
        this.x = 400 + Math.random() * (719 * 4);
        this.y = 350;
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
    }
}
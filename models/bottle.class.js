class Bottle extends MovableObject {
    width = 80;
    height = 80;
    offsetY = 12;
    offsetWidth = -50;
    offsetHeight = -20;
    direction;
    IMAGES_BOTTLE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super();
        this.randomiseBottleImage();
        this.x = 400 + this.calculateDistanceX();
        this.y = 350;
        this.calculateOffsetX();
    }

    /**
     * This function sets a left or right bottle randomly.
     */
    randomiseBottleImage() {
        let x = Math.random();
        if (x < 0.5) {
            this.direction = 0;
            this.loadImage(this.IMAGES_BOTTLE[0])
        }
        else {
            this.direction = 1;
            this.loadImage(this.IMAGES_BOTTLE[1])
        }

    }

    /**
     * This function calculates a random place for the bottle on the x-axis.
     * 
     * @returns Number
     */
    calculateDistanceX() {
        let x = Math.floor((Math.random() * 25) + 1);
        return x * ((719 * 4) / 25)
    }

    /**
     * This functions corrects the bottles offsetX, depending on its direction. 
     */
    calculateOffsetX() {
        if (this.direction == 1) {
            this.offsetX = 25;
        }
        else {
            this.offsetX = 35;
        }
    }
}
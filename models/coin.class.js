class Coin extends MovableObject {
    width = 100;
    height = 100;
    offsetX = 35; 
    offsetY = 35;
    offsetWidth = -70; 
    offsetHeight = -70;
    IMAGES_COIN = ['img/8_coin/coin_1.png',
                    'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 400 + this.calculateDistanceX();
        this.y = 320 - this.calculateDistanceY();
        this.loadImageCache(this.IMAGES_COIN);
        this.setCoin();
    }

    calculateDistanceX() {
        let x = Math.floor((Math.random() * 50) + 1);
        return x * ((719 * 4)/50)
    }

    calculateDistanceY() {
        let x = Math.random();
        if (x < 0.3333) {
            return 50
        };
        if (x > 0.3333 && x < 0.6666) {
            return 150
        };
        if (x > 0.6666) {
            return 250
        };
    }

    setCoin() {
        setInterval(() => {
            this.animateMovement(this.IMAGES_COIN);
        }, 500);
    }
}
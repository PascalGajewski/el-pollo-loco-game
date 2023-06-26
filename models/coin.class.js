class Coin extends MovableObject {
    width = 100;
    height = 100;
    IMAGES_COIN = ['img/8_coin/coin_1.png',
                    'img/8_coin/coin_2.png',
                    'img/8_coin/coin_1.png',
                    'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * (719 * 2);
        this.y = 320 - Math.random() * 200;
        this.loadImageCache(this.IMAGES_COIN)
        this.setCoin();
    }

    setCoin() {
        setInterval(() => {
            this.animateMovement(this.IMAGES_COIN);
        }, 500);
    }
}
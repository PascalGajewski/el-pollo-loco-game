class Coin extends MovableObject {
    IMAGES_COIN = ['img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImageCache(this.IMAGES_COIN)
        this.setCoin();
    }

    setCoin() {
        
    }
}
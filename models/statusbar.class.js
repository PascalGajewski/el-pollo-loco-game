class StatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    percentage = 100;
    height = 50;
    width = 200;

    constructor(bar, percentage, positionx, positiony) {
        super();
        this.percentage = percentage;
        this.x = positionx;
        this.y = positiony;
        if (bar == 'HEALTH') {
            this.loadImageCache(this.IMAGES_HEALTH);
            this.setPercentage(this.percentage, this.IMAGES_HEALTH);
        }
        if (bar == 'COIN') {
            this.loadImageCache(this.IMAGES_COIN);
            this.setPercentage(this.percentage, this.IMAGES_COIN);
        }
        if (bar == 'BOTTLE') {
            this.loadImageCache(this.IMAGES_BOTTLE);
            this.setPercentage(this.percentage, this.IMAGES_BOTTLE);
        }
    }

    setPercentage(percentage, bar) {
        this.percentage = percentage;
        let path = bar[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.percentage > 80) {
            return 5;
        }
        else if (this.percentage > 60) {
            return 4;
        }
        else if (this.percentage > 40) {
            return 3;
        }
        else if (this.percentage > 20) {
            return 2;
        }
        else if (this.percentage > 0) {
            return 1;
        }
        else if (this.percentage == 0) {
            return 0;
        }
    }
}
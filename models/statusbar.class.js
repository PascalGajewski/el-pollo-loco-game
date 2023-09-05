class StatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_HEALTH_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
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
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    percentage;
    height = 50;
    width = 200;

    constructor(bar, percentage, positionx, positiony) {
        super();
        this.percentage = percentage;
        this.x = positionx;
        this.y = positiony;
        this.loadImageCache(this[`IMAGES_${bar}`]);
        this.setPercentage(this.percentage, this[`IMAGES_${bar}`]);
    }

    /**
     * This function loads the current status bar image, depending on its current percentage.
     * 
     * @param {Number} percentage - value of the current status bar percentage.
     * @param {String} bar - string with the kind of status bar (HEALTH, COIN, BOTTLE).
     */
    setPercentage(percentage, bar) {
        this.percentage = percentage;
        let path = bar[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * This function returns a value (1-5), depending the current percentage of the status bar.  
     * 
     * @returns Number
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        if (this.percentage >= 75 && this.percentage < 100) {
            return 4;
        }
        if (this.percentage >= 50 && this.percentage < 75) {
            return 3;
        }
        if (this.percentage >= 25 && this.percentage < 50) {
            return 2;
        }
        if (this.percentage > 0 && this.percentage < 25) {
            return 1;
        }
        if (this.percentage == 0) {
            return 0;
        }
    }
}
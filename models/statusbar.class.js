class StatusBar extends DrawableObject {
    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    percentage = 100;

    constructor() {
        super().loadImageCache(this.IMAGES_HEALTH_BAR);
        this.x = 20;
        this.y = -10;
        this.height = 50;
        this.width = 200;
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
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
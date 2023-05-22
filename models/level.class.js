class Level {
    backgroundObjects;
    clouds;
    enemies;
    level_end_x;

    constructor(backgroundObjects, clouds, enemies) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.level_end_x = ((backgroundObjects.length - 4) / 4) * 719;
    }
}
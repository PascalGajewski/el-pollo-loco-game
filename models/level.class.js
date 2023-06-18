class Level {
    backgroundObjects;
    clouds;
    enemies;
    throwableObjects;
    level_end_x;

    constructor(backgroundObjects, clouds, enemies, throwableObjects) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.throwableObjects = throwableObjects;
        this.level_end_x = ((backgroundObjects.length - 4) / 4) * 719;
    }
}
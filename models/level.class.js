class Level {
    backgroundObjects;
    clouds;
    enemies;
    coins;
    bottles;
    level_end_x;
    maxCoins;
    maxBottles;

    constructor(backgroundObjects, clouds, enemies, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.level_end_x = ((backgroundObjects.length - 4) / 4) * 719;
        this.maxCoins = coins.length;
        this.maxBottles = bottles.length;
    }
}
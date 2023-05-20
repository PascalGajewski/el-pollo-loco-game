class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }
    
    draw() {
        this.drawCharacter();
        this.drawEnemies();

        let self = this;
        requestAnimationFrame(function() {
            self.draw()});
    }

    drawCharacter(){
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, 
                            this.character.width, this.character.height);
        }

    drawEnemies() {
        let distanceCounter = 100;
        for (let index = 0; index < this.enemies.length; index++) {
            distanceCounter = distanceCounter + 100;
            const enemie = this.enemies[index];
            this.ctx.drawImage(enemie.img, enemie.x + distanceCounter, enemie.y, 
                enemie.width, enemie.height);
        }
    }
}
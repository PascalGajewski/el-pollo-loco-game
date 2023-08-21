class Endboss extends MovableObject {
    x = 719 * 5;
    y = 160;
    width = 260;
    height = 280;
    offsetX = 30; 
    offsetY = 40;
    offsetWidth = -60; 
    offsetHeight = -50;
    speed = 0;
    killed = false;
    IMAGES_WALKING = ['img/4_enemie_boss_chicken/1_attack/G1.png',
        'img/4_enemie_boss_chicken/1_attack/G2.png',
        'img/4_enemie_boss_chicken/1_attack/G3.png',
        'img/4_enemie_boss_chicken/1_attack/G4.png',
    ];
    IMAGES_ATTACK = ['img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/3_attack/G13.png');
        this.loadImageCache(this.IMAGES_ATTACK);
        this.loadImageCache(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        let animationInterval = setInterval(() => {
            if (!this.checkIfDead()) {
                this.animateMovement(this.IMAGES_ATTACK);
            }
            if (this.checkIfDead()) {
                clearInterval(animationInterval);
                this.killed = true;
                this.animateDying();
            }
        }, 150);
    }

    animateDying() {
        let i = 0;
        setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imgCache[this.IMAGES_DEAD[i]];
                i++;
            }
        }, 100);
    }
}
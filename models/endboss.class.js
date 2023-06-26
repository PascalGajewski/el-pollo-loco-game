class Endboss extends MovableObject {
    x = 719 * 5;
    y = 160;
    width = 260;
    height = 280;
    speed = 0;
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

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/3_attack/G13.png');
        this.loadImageCache(this.IMAGES_ATTACK);
        this.animateAttack();
    }

    animateAttack() {
        setInterval(() => {
            this.animateMovement(this.IMAGES_ATTACK)
        }, 150);
    }
}
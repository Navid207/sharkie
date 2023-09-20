class Jally extends MovableObject {
    height = 80;
    width = 80;
    x = 300 + Math.random() * 400;
    y = 0 + Math.random() * (480 - this.height);
    speed = Math.random() * 0.5;
    direction = 1;
    damageTyp = 2;
    damageSatae = 0;
    attackTime = Math.random() * 5000;


    IMAGES = {
        YELLOW: [
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 1.png',
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 2.png',
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 3.png',
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 4.png',
        ],
        ATTACK: [
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 1.png',
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 2.png',
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 3.png',
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 4.png',
        ]

    }

    constructor() {
        super().loadImage(this.IMAGES.YELLOW[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.swimUpDown();
    }

    animate() {
        setInterval(()=>{
            if (this.onCollisionCourse){
                this.onCollisionCourse = false;
                
            }else{this.onCollisionCourse = true;this.damageSatae = 0;}
        },this.attackTime)
         setInterval(() => {
            if (!this.onCollisionCourse) {
                this.changeImg(this.IMAGES.YELLOW);
            } else {
                this.changeImg(this.IMAGES.ATTACK);
                // setTimeout(() => {
                //     this.damageSatae = 0;
                // }, 1000)
            }
        }, 200 - (200 * this.speed));
    }

    swimUpDown() {
        setInterval(() => {
            [this.direction > 0 ? this.moveUp() : this.moveDown()];
            this.direction = (this.y <= 0) ? -1 : (this.y >= 400) ? 1 : this.direction; // Verkürzte schreibweise bedingte (ternäre) Operator 
        })
    }




}
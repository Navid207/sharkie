class Puffer extends MovableObject {
    height = 50;
    width = 50;
    x = 300 + Math.random() * 400;
    y = 0 + Math.random() * (480 - this.height);
    speed = Math.random() * 0.5;
    damageTyp = 1;
    damageSatae = 0;
    onCollisionCourse = false;
    attackTime = Math.random() * 10000;

    IMAGES = {
        SWIM: [
            'img/2_Enemy/1_Puffer/1.Swim/1.swim1.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim2.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim3.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim4.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim5.png'
        ],
        TRANSFORM: [
            'img/2_Enemy/1_Puffer/2.transition/1.transition1.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition2.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition3.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition4.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition5.png',
        ],
        ATTACK: [
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim1.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim2.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim3.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim4.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim5.png',
        ],
        DEAD: [
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead1.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead2.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png'
        ]


    }

    constructor() {
        super().loadImage('img/2_Enemy/1_Puffer/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.swimLeft();
    }

    animate() {
        setInterval(() => {
            if (this.activState != this.oldState) {
                this.oldState = this.activState;
                this.actImage = 0;
            }


            setTimeout(() => {
                if (!this.onCollisionCourse && this.HP>0) {
                    this.onCollisionCourse = true;
                } else { return }
            }, this.attackTime)

            if (this.isDead()) {
                this.activState = 100;
                this.speed = 0;
                this.onCollisionCourse = false;
                if (this.actImage <= 3 || this.oldState != 100 ) {
                    this.changeImg(this.IMAGES.DEAD);
                }
                return
            }

            if ((this.onCollisionCourse && this.actImage == 4) || this.activState == 2) {
                this.changeImg(this.IMAGES.ATTACK);
                this.activState = 2;
                if (this.speed < 2) {
                    this.speed = this.speed + this.speed;
                }
                return
            }
            if (!this.onCollisionCourse) {
                this.changeImg(this.IMAGES.SWIM);
                this.activState = 1;
            } else {
                this.changeImg(this.IMAGES.TRANSFORM);
                this.activState = 2;
            }
        }, 200 - (200 * this.speed));
    }

    swimLeft() {
        setInterval(() => {
            if (this.activState <= 2) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }




}
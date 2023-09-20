class Character extends MovableObject {
    height = 245;
    width = 200;
    speed = 2;
    damageSatae = 0;

    collOffset = {
        x: 40,
        y: 115,
        width: -75,
        height: -165
    }


    IMAGES = {
        IDLE: [
            'img/1_Sharkie/IDLE/1.png',
            'img/1_Sharkie/IDLE/2.png',
            'img/1_Sharkie/IDLE/3.png',
            'img/1_Sharkie/IDLE/4.png',
            'img/1_Sharkie/IDLE/5.png',
            'img/1_Sharkie/IDLE/6.png',
            'img/1_Sharkie/IDLE/7.png',
            'img/1_Sharkie/IDLE/8.png',
            'img/1_Sharkie/IDLE/9.png',
            'img/1_Sharkie/IDLE/10.png',
            'img/1_Sharkie/IDLE/11.png',
            'img/1_Sharkie/IDLE/12.png',
            'img/1_Sharkie/IDLE/13.png',
            'img/1_Sharkie/IDLE/14.png',
            'img/1_Sharkie/IDLE/15.png',
            'img/1_Sharkie/IDLE/16.png',
            'img/1_Sharkie/IDLE/17.png',
            'img/1_Sharkie/IDLE/18.png'
        ],
        LONG_IDLE: [
            'img/1_Sharkie/Long_IDLE/I1.png',
            'img/1_Sharkie/Long_IDLE/I1.png',
            'img/1_Sharkie/Long_IDLE/I2.png',
            'img/1_Sharkie/Long_IDLE/I2.png',
            'img/1_Sharkie/Long_IDLE/I3.png',
            'img/1_Sharkie/Long_IDLE/I3.png',
            'img/1_Sharkie/Long_IDLE/I4.png',
            'img/1_Sharkie/Long_IDLE/I4.png',
            'img/1_Sharkie/Long_IDLE/I5.png',
            'img/1_Sharkie/Long_IDLE/I5.png',
            'img/1_Sharkie/Long_IDLE/I6.png',
            'img/1_Sharkie/Long_IDLE/I6.png',
            'img/1_Sharkie/Long_IDLE/I7.png',
            'img/1_Sharkie/Long_IDLE/I7.png',
        ],
        FALLING_TO_SLEEP: [
            'img/1_Sharkie/Long_IDLE/I8.png',
            'img/1_Sharkie/Long_IDLE/I8.png',
            'img/1_Sharkie/Long_IDLE/I9.png',
            'img/1_Sharkie/Long_IDLE/I9.png',
            'img/1_Sharkie/Long_IDLE/I10.png',
            'img/1_Sharkie/Long_IDLE/I10.png',
        ],
        SLEEPING: [
            'img/1_Sharkie/Long_IDLE/I11.png',
            'img/1_Sharkie/Long_IDLE/I11.png',
            'img/1_Sharkie/Long_IDLE/I12.png',
            'img/1_Sharkie/Long_IDLE/I12.png',
            'img/1_Sharkie/Long_IDLE/I13.png',
            'img/1_Sharkie/Long_IDLE/I13.png',
            'img/1_Sharkie/Long_IDLE/I14.png',
            'img/1_Sharkie/Long_IDLE/I14.png'
        ],
        SWIM: [
            'img/1_Sharkie/Swim/1.png',
            'img/1_Sharkie/Swim/2.png',
            'img/1_Sharkie/Swim/3.png',
            'img/1_Sharkie/Swim/4.png',
            'img/1_Sharkie/Swim/5.png',
            'img/1_Sharkie/Swim/6.png'
        ],
        FIN_SLAP: [
            'img/1_Sharkie/Attack/Fin slap/1.png',
            'img/1_Sharkie/Attack/Fin slap/2.png',
            'img/1_Sharkie/Attack/Fin slap/3.png',
            'img/1_Sharkie/Attack/Fin slap/4.png',
            'img/1_Sharkie/Attack/Fin slap/5.png',
            'img/1_Sharkie/Attack/Fin slap/6.png',
            'img/1_Sharkie/Attack/Fin slap/7.png',
            'img/1_Sharkie/Attack/Fin slap/8.png'
        ],
        BUBBLE_TRAP: [
            'img/1_Sharkie/Attack/Bubble trap/For Whale/1.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/2.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/3.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/4.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/5.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/6.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/7.png',
            'img/1_Sharkie/Attack/Bubble trap/For Whale/8.png'
        ],
        DAMAGE_POISON: [
            'img/1_Sharkie/Hurt/1.Poisoned/1.png',
            'img/1_Sharkie/Hurt/1.Poisoned/2.png',
            'img/1_Sharkie/Hurt/1.Poisoned/3.png',
            'img/1_Sharkie/Hurt/1.Poisoned/4.png',
            'img/1_Sharkie/Hurt/1.Poisoned/5.png',
        ],
        DAMAGE_ELECTRIC: [
            'img/1_Sharkie/Hurt/2.Electric shock/1.png',
            'img/1_Sharkie/Hurt/2.Electric shock/2.png',
            'img/1_Sharkie/Hurt/2.Electric shock/3.png',
        ],
        DEAD_POISON: [
            'img/1_Sharkie/dead/1.Poisoned/1.png',
            'img/1_Sharkie/dead/1.Poisoned/2.png',
            'img/1_Sharkie/dead/1.Poisoned/3.png',
            'img/1_Sharkie/dead/1.Poisoned/4.png',
            'img/1_Sharkie/dead/1.Poisoned/5.png',
            'img/1_Sharkie/dead/1.Poisoned/6.png',
            'img/1_Sharkie/dead/1.Poisoned/7.png',
            'img/1_Sharkie/dead/1.Poisoned/8.png',
            'img/1_Sharkie/dead/1.Poisoned/9.png',
            'img/1_Sharkie/dead/1.Poisoned/10.png',
            'img/1_Sharkie/dead/1.Poisoned/11.png',
            'img/1_Sharkie/dead/1.Poisoned/12.png',
        ],
        DEAD_ELECTRIC: [
            'img/1_Sharkie/dead/2.Electro_shock/1.png',
            'img/1_Sharkie/dead/2.Electro_shock/2.png',
            'img/1_Sharkie/dead/2.Electro_shock/3.png',
            'img/1_Sharkie/dead/2.Electro_shock/4.png',
            'img/1_Sharkie/dead/2.Electro_shock/5.png',
            'img/1_Sharkie/dead/2.Electro_shock/6.png',
            'img/1_Sharkie/dead/2.Electro_shock/7.png',
            'img/1_Sharkie/dead/2.Electro_shock/8.png',
            'img/1_Sharkie/dead/2.Electro_shock/9.png',
            'img/1_Sharkie/dead/2.Electro_shock/10.png',
        ]

    }


    constructor() {
        super().loadImage('img/1_Sharkie/IDLE/1.png');
        this.loadImages(this.IMAGES);
        this.move();
        this.animate()
    }

    move() {
        setInterval(() => {
            if (this.activState == 4 && this.keyboard.LEFT && (this.x > this.xMin) && !(this.x == 840)) {
                this.moveLeft();
                this.imgCahangeDirection = true;
            }
            if (this.activState == 4 && this.keyboard.RIGHT && (this.x < this.xMax)) {
                this.moveRight();
                this.imgCahangeDirection = false;
            }
            if (this.activState == 4 && this.keyboard.UP && (this.y > this.yMin)) {
                this.moveUp();
            }
            if (((this.activState == 4 && this.keyboard.DOWN) || this.activState == 2) && (this.y < this.yMax)) {
                this.moveDown();
            }

        }, 1000 / 60);
    }

    animate() {
        setInterval(() => {
            if (this.activState != this.oldState) {
                this.oldState = this.activState;
                this.actImage = 0;
                if (this.activState == 7) {
                    this.HP -= 20;
                    if (this.isDead()) {
                        this.activState = 100;
                    }
                }
                if (this.activState == 8) {
                    this.HP -= 40;
                    if (this.isDead()) {
                        this.activState = 101;
                    }
                }
            }
            if (this.activState == 5) {
                this.onCollisionCourse = true;
            }
            else {
                this.onCollisionCourse = false;
            }

            //console.log('aktiv state is ' + this.activState + ' old state is ' + this.oldState + ' HP=' + this.HP);

            switch (this.activState) {


                case 4:
                    this.changeImg(this.IMAGES.SWIM);
                    this.speed = 2;
                    break;
                case 5:
                    this.changeImg(this.IMAGES.FIN_SLAP);
                    break;
                case 6:
                    this.changeImg(this.IMAGES.BUBBLE_TRAP);
                    break;
                case 7:
                    this.changeImg(this.IMAGES.DAMAGE_POISON);
                    break;
                case 8:
                    this.changeImg(this.IMAGES.DAMAGE_ELECTRIC);
                    break;
                case 1:
                    this.changeImg(this.IMAGES.LONG_IDLE);
                    break;
                case 2:
                    this.changeImg(this.IMAGES.FALLING_TO_SLEEP);
                    this.speed = 0.5;
                    break;
                case 3:
                    this.changeImg(this.IMAGES.SLEEPING);
                    break;

                case 100:
                    if (this.actImage <= 11) {
                        this.changeImg(this.IMAGES.DEAD_POISON);
                    }
                    break;
                case 101:
                    if (this.actImage <= 9) {
                        this.changeImg(this.IMAGES.DEAD_ELECTRIC);
                    }
                    break;
                default:
                    this.changeImg(this.IMAGES.IDLE);
            }

        }, 100);
    }



}


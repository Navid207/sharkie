class Character extends MovableObject {
    height = 245;
    width = 200;
    speed = 2;
    damageSatae = 0;
    sounds = {
        bubble: new Audio('audio/Bubble.wav'),
        slap: new Audio('audio/FinSlap.wav'),
        hurt: new Audio('audio/Hurt_Sharki.wav'),
        electric: new Audio('audio/electric.wav'),
        gameOver: new Audio('audio/GameOver.wav')
    }

    collOffset = {
        x: 45,
        y: 120,
        width: -90,
        height: -175
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
            'img/1_Sharkie/Attack/FinSlap/1.png',
            'img/1_Sharkie/Attack/FinSlap/2.png',
            'img/1_Sharkie/Attack/FinSlap/3.png',
            'img/1_Sharkie/Attack/FinSlap/4.png',
            'img/1_Sharkie/Attack/FinSlap/5.png',
            'img/1_Sharkie/Attack/FinSlap/6.png',
            'img/1_Sharkie/Attack/FinSlap/7.png',
            'img/1_Sharkie/Attack/FinSlap/8.png',
        ],
        BUBBLE_TRAP: [
            'img/1_Sharkie/Attack/Bubble/1.png',
            'img/1_Sharkie/Attack/Bubble/2.png',
            'img/1_Sharkie/Attack/Bubble/3.png',
            'img/1_Sharkie/Attack/Bubble/4.png',
            'img/1_Sharkie/Attack/Bubble/5.png',
            'img/1_Sharkie/Attack/Bubble/6.png',
            'img/1_Sharkie/Attack/Bubble/7.png',
            'img/1_Sharkie/Attack/Bubble/8.png',
        ],
        DAMAGE_POISON: [
            'img/1_Sharkie/Hurt/Poisoned/1.png',
            'img/1_Sharkie/Hurt/Poisoned/2.png',
            'img/1_Sharkie/Hurt/Poisoned/3.png',
            'img/1_Sharkie/Hurt/Poisoned/4.png',
            'img/1_Sharkie/Hurt/Poisoned/5.png',
        ],
        DAMAGE_ELECTRIC: [
            'img/1_Sharkie/Hurt/ElectricShock/1.png',
            'img/1_Sharkie/Hurt/ElectricShock/2.png',
            'img/1_Sharkie/Hurt/ElectricShock/3.png',
        ],
        DEAD_POISON: [
            'img/1_Sharkie/Dead/Poisoned/1.png',
            'img/1_Sharkie/Dead/Poisoned/2.png',
            'img/1_Sharkie/Dead/Poisoned/3.png',
            'img/1_Sharkie/Dead/Poisoned/4.png',
            'img/1_Sharkie/Dead/Poisoned/5.png',
            'img/1_Sharkie/Dead/Poisoned/6.png',
            'img/1_Sharkie/Dead/Poisoned/7.png',
            'img/1_Sharkie/Dead/Poisoned/8.png',
            'img/1_Sharkie/Dead/Poisoned/9.png',
            'img/1_Sharkie/Dead/Poisoned/10.png',
            'img/1_Sharkie/Dead/Poisoned/11.png',
            'img/1_Sharkie/Dead/Poisoned/12.png',
        ],
        DEAD_ELECTRIC: [
            'img/1_Sharkie/Dead/ElectroShock/1.png',
            'img/1_Sharkie/Dead/ElectroShock/2.png',
            'img/1_Sharkie/Dead/ElectroShock/3.png',
            'img/1_Sharkie/Dead/ElectroShock/4.png',
            'img/1_Sharkie/Dead/ElectroShock/5.png',
            'img/1_Sharkie/Dead/ElectroShock/6.png',
            'img/1_Sharkie/Dead/ElectroShock/7.png',
            'img/1_Sharkie/Dead/ElectroShock/8.png',
            'img/1_Sharkie/Dead/ElectroShock/9.png',
            'img/1_Sharkie/Dead/ElectroShock/10.png',
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
            if (this.moveLeft()) {
                super.moveLeft();
                this.imgCahangeDirection = true;
            }
            if (this.moveRight()) {
                super.moveRight();
                this.imgCahangeDirection = false;
            }
            if (this.moveUp()) super.moveUp();

            if (this.moveDown()) super.moveDown();

        }, 1000 / 60);
    }
    moveLeft() {
        return this.activState == 4 && this.keyboard.LEFT && (this.x > this.xMin) && !(this.x == 840);
    }
    moveRight() {
        return this.activState == 4 && this.keyboard.RIGHT && (this.x < this.xMax);
    }
    moveUp() {
        return this.activState == 4 && this.keyboard.UP && (this.y > this.yMin);
    }
    moveDown() {
        return ((this.activState == 4 && this.keyboard.DOWN) || this.activState == 2) && (this.y < this.yMax);
    }


    animate() {
        setInterval(() => {
            if (this.activState != this.oldState) this.changeState();
            this.switchImg();
            this.playAudio();
        }, 100);
    }
    changeState() {
        this.oldState = this.activState;
        this.actImage = 0;
        if (this.activState == 7) this.poisonDamage();
        if (this.activState == 8) this.electricDamage();
    }
    poisonDamage() {
        this.HP -= 20;
        if (this.isDead()) this.activState = 100;
    }
    electricDamage() {
        this.HP -= 40;
        if (this.isDead()) this.activState = 101;
    }
    switchImg() {
        switch (this.activState) {
            case 4:
                super.changeImg(this.IMAGES.SWIM);
                this.speed = 2;
                break;
            case 5:
                super.changeImg(this.IMAGES.FIN_SLAP);
                break;
            case 6:
                super.changeImg(this.IMAGES.BUBBLE_TRAP);
                break;
            case 7:
                super.changeImg(this.IMAGES.DAMAGE_POISON);
                break;
            case 8:
                super.changeImg(this.IMAGES.DAMAGE_ELECTRIC);
                break;
            case 1:
                super.changeImg(this.IMAGES.LONG_IDLE);
                break;
            case 2:
                super.changeImg(this.IMAGES.FALLING_TO_SLEEP);
                this.speed = 0.5;
                break;
            case 3:
                super.changeImg(this.IMAGES.SLEEPING);
                break;

            case 100:
                if (this.actImage <= 11) {
                    super.changeImg(this.IMAGES.DEAD_POISON);
                }
                break;
            case 101:
                if (this.actImage <= 9) {
                    super.changeImg(this.IMAGES.DEAD_ELECTRIC);
                }
                break;
            default:
                super.changeImg(this.IMAGES.IDLE);
        }
    }


    playAudio() {
        if (this.audioSlap()) {
            this.sounds.slap.play();
            this.onCollisionCourse = true;
            return
        } else this.onCollisionCourse = false;

        if (this.audioBubble()) return this.sounds.bubble.play();

        if (this.audioHurt()) return this.sounds.hurt.play();

        if (this.audioDead()) return this.sounds.hurt.play();

        if (this.audioElectricShock()) return this.sounds.electric.play();

        if (this.audioElectricDead()) {
            return this.sounds.electric.play();
        } else this.sounds.electric.pause();
    }
    audioSlap() {
        return this.activState == 5 && this.oldState == 5 && this.actImage >= 5 && this.actImage <= 7
    }
    audioBubble() {
        return this.activState == 6 && this.oldState == 6 && this.actImage >= 5 && this.actImage <= 7
    }
    audioHurt() {
        return this.activState == 7 && this.oldState == 7 && this.actImage >= 0 && this.actImage <= 4
    }
    audioDead() {
        return this.activState == 100 && this.oldState == 100 && this.actImage >= 0 && this.actImage <= 4
    }
    audioElectricShock() {
        return this.activState == 8 && this.oldState == 8 && this.actImage >= 0 && this.actImage <= 3
    }
    audioElectricDead() {
        return this.activState == 101 && this.oldState == 101 && this.actImage >= 0 && this.actImage <= 5
    }
}


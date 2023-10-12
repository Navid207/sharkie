class Boss extends MovableObject {
    height = 400;
    width = 400;
    startPosX = 1200;
    startPosY = 0;
    targetPosX;
    targetPosY;
    showPos;
    damageTyp = 1;
    damageSatae = 0;
    attackTime = Math.random() * 5000 + 3000;
    onCollisionCourse = false;
    activState;
    speed = 10;
    sounds = {
        bite: new Audio('audio/bite.wav'),
        hurt: new Audio('audio/Hurt_Boss.wav'),
    }
    collOffset = {
        x: 20,
        y: 160,
        width: -45,
        height: -235
    }
    IMAGES = {
        COMMING: [
            'img/2_Enemy/3_Final/1.Introduce/1.png',
            'img/2_Enemy/3_Final/1.Introduce/2.png',
            'img/2_Enemy/3_Final/1.Introduce/3.png',
            'img/2_Enemy/3_Final/1.Introduce/4.png',
            'img/2_Enemy/3_Final/1.Introduce/5.png',
            'img/2_Enemy/3_Final/1.Introduce/6.png',
            'img/2_Enemy/3_Final/1.Introduce/7.png',
            'img/2_Enemy/3_Final/1.Introduce/8.png',
            'img/2_Enemy/3_Final/1.Introduce/9.png',
            'img/2_Enemy/3_Final/1.Introduce/10.png'
        ],
        SWIM: [
            'img/2_Enemy/3_Final/2.floating/1.png',
            'img/2_Enemy/3_Final/2.floating/2.png',
            'img/2_Enemy/3_Final/2.floating/3.png',
            'img/2_Enemy/3_Final/2.floating/4.png',
            'img/2_Enemy/3_Final/2.floating/5.png',
            'img/2_Enemy/3_Final/2.floating/6.png',
            'img/2_Enemy/3_Final/2.floating/7.png',
            'img/2_Enemy/3_Final/2.floating/8.png',
            'img/2_Enemy/3_Final/2.floating/9.png',
            'img/2_Enemy/3_Final/2.floating/10.png',
            'img/2_Enemy/3_Final/2.floating/11.png',
            'img/2_Enemy/3_Final/2.floating/12.png',
            'img/2_Enemy/3_Final/2.floating/13.png'
        ],
        ATTACK: [
            'img/2_Enemy/3_Final/Attack/1.png',
            'img/2_Enemy/3_Final/Attack/2.png',
            'img/2_Enemy/3_Final/Attack/3.png',
            'img/2_Enemy/3_Final/Attack/4.png',
            'img/2_Enemy/3_Final/Attack/5.png',
            'img/2_Enemy/3_Final/Attack/6.png'
        ],
        HURT: [
            'img/2_Enemy/3_Final/Hurt/1.png',
            'img/2_Enemy/3_Final/Hurt/2.png',
            'img/2_Enemy/3_Final/Hurt/3.png',
            'img/2_Enemy/3_Final/Hurt/4.png'
        ],
        DEAD: [
            'img/2_Enemy/3_Final/Dead/1.png',
            'img/2_Enemy/3_Final/Dead/2.png',
            'img/2_Enemy/3_Final/Dead/3.png',
            'img/2_Enemy/3_Final/Dead/4.png',
            'img/2_Enemy/3_Final/Dead/5.png',
            'img/2_Enemy/3_Final/Dead/6.png'
        ],
    }

    constructor(x, y) {
        super().loadImage(this.IMAGES.COMMING[0])
        this.x = this.startPosX;
        this.y = this.startPosY;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAudio();
            this.setNewState();
            if (this.activState > 0) this.attack();
            this.checkState();
            this.switchImg();
        }, 200);
    }

    checkState() {
        if (this.isCommig()) return this.stateComming();
        if (this.isDead()) return this.stateIsDead();
        if (this.hurt) return this.stateHurt();
        if (this.onCollisionCourse) return this.activState = 3;
        if (this.activState > 0) return this.stateSwimm();
    }
    isCommig() {
        return (this.showPos >= this.view_x & !this.activState) || this.activState == 1 && this.actImage < 10;
    }
    stateComming() {
        this.onCollisionCourse = true;
        this.activState = 1
    }
    stateIsDead() {
        this.hurt = false;
        this.onCollisionCourse = false;
        this.activState = 100
    }
    stateHurt() {
        if (this.oldState == 4 && this.actImage >= 3) this.hurt = false;
        this.activState = 4
    }
    stateSwimm() {
        this.activState = 2;
        this.move();
    }

    move() {
        this.moveVertical();
        this.moveHorizontal();
    }

    moveVertical() {
        if (this.yPosCenter() != this.targetPosY) {
            (this.yPosCenter() > this.targetPosY) ? this.moveUp() : this.moveDown();
        }
    }
    yPosCenter() {
        return this.y + this.collOffset.y + ((this.height + this.collOffset.height) / 2);
    }
    moveUp() {
        if (this.y > -160) super.moveUp()
    }
    moveDown() {
        if (this.y < 155) super.moveDown()
    }

    moveHorizontal() {
        if (this.xPosCenter() != this.targetPosX) {
            (this.xPosCenter() > this.targetPosX) ? this.moveLeft() : this.moveRight();
        }
    }
    xPosCenter() {
        return this.x + this.collOffset.x + ((this.width + this.collOffset.width) / 2);
    }
    moveRight() {
        this.imgCahangeDirection = true;
        if ((this.xPosCenter() + 150) < this.targetPosX) super.moveRight();
    }
    moveLeft() {
        this.imgCahangeDirection = false;
        if ((this.xPosCenter() - 150) > this.targetPosX) super.moveLeft();
    }


    attack() {
        if (this.oldState == 3 && this.actImage == 5) {
            this.onCollisionCourse = false;
            this.setAttackDelay();
        }
    }

    setAttackDelay() {
        setTimeout(() => {
            if (!this.isDead()) this.setAttack();
        }, this.attackTime);
    }

    setAttack() {
        this.damageSatae = 0;
        this.onCollisionCourse = true;
        this.attackTime = Math.random() * 5000 + 3000;
    }

    playAudio() {
        if (this.isBiteing()) return this.audioBite();
        if (this.isHurt() || this.isDying()) return this.audioHurt();
    }

    isBiteing() {
        return this.activState == 3 && this.oldState == 3 && this.actImage == 1
    }
    audioBite() {
        this.sounds.bite.currentTime = 0;
        this.sounds.bite.play()
    }

    isHurt() {
        return this.activState == 4 && this.oldState == 4 && this.actImage == 1;
    }
    isDying() {
        return this.activState == 100 && this.oldState == 100 && this.actImage == 1;
    }
    audioHurt() {
        this.sounds.hurt.currentTime = 0;
        this.sounds.hurt.play();
    }

    switchImg() {
        switch (this.activState) {
            case 1:
                this.changeImg(this.IMAGES.COMMING)
                break;
            case 2:
                this.changeImg(this.IMAGES.SWIM)
                break;
            case 3:
                this.changeImg(this.IMAGES.ATTACK)
                break;
            case 4:
                this.changeImg(this.IMAGES.HURT)
                break;

            case 100:
                if (this.actImage <= 5) {
                    this.changeImg(this.IMAGES.DEAD)
                }
                break;
            default:
                break;
        }
    }


}
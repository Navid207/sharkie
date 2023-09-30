class Bubble extends MovableObject {
    height = 35;
    width = 35;


    IMAGE = 'img/1_Sharkie/Attack/Bubble trap/Poisoned Bubble (for whale).png';
    endPos = 0;
    speed = 10;
    onCollisionCourse = true;
    atEndPos = false;



    TEST_X2 = 0;
    TEST_Y = 125;



    constructor(posX, posY, direction) {
        super().loadImage(this.IMAGE);
        this.direction = direction;
        this.setPos(posX);
        this.y = posY + this.TEST_Y;
        this.animate();
    }

    setPos(posX) {
        if (!this.direction) {
            this.x = posX + 160;
            this.endPos = this.x + 350;
        } else {
            this.x = posX;
            this.endPos = this.x - 350;
        }

    }

    animate() {
        if (!this.direction) {
            setInterval(() => {
                if (this.x <= this.endPos) {
                    this.moveRight();
                    this.loadImage(this.IMAGE);
                } else {
                    this.atEndPos = true;
                }
            }, 25)
        }
        else {
            setInterval(() => {
                if (this.x >= this.endPos) {
                    this.moveLeft();
                    this.loadImage(this.IMAGE);
                } else {
                    this.atEndPos = true;
                }
            }, 25)
        }
    }




}
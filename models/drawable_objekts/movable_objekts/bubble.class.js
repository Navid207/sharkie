class Bubble extends MovableObject {
    height = 35;
    width = 35;
    endPos = 0;
    speed = 5;
    onCollisionCourse = true;
    atEndPos = false;

    IMAGES = {
        GREEN: ['img/1_Sharkie/Attack/Bubble/BubbleGreen.png']
    }




    constructor(posX, posY, direction) {
        super().loadImage(this.IMAGES.GREEN[0]);
        this.loadImages(this.IMAGES);
        this.direction = direction;
        this.setPos(posX, posY);
        this.animate();
    }

    setPos(posX, posY) {
        !this.direction ? this.directionRight(posX) : this.directionLeft(posX);
        this.y = posY + 125;
    }
    directionRight(posX) {
        this.x = posX + 160;
        this.endPos = this.x + 350;
    }
    directionLeft(posX) {
        this.x = posX;
        this.endPos = this.x - 350;
    }


    animate() {
        !this.direction ? this.setIntervalRight() : this.setIntervalLeft();
    }

    setIntervalRight() {
        setInterval(() => {
            (this.x <= this.endPos) ? this.moveRight() : this.atEndPos = true;
        }, 10)
    }
    moveRight() {
        super.moveRight();
        this.changeImg(this.IMAGES.GREEN);
    }

    setIntervalLeft() {
        setInterval(() => {
            (this.x >= this.endPos) ? this.moveLeft() : this.atEndPos = true;
        }, 10)
    }
    moveLeft() {
        super.moveLeft();
        this.changeImg(this.IMAGES.GREEN);
    }
}
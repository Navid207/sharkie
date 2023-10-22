/**
 * Class representing a movable bubble object.
 */
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


    /**
     * Constructor for initializing the Bubble class with a specified position and direction.
     * @param {number} posX - The initial x-coordinate of the bubble.
     * @param {number} posY - The initial y-coordinate of the bubble.
     * @param {string} direction - The direction of the bubble.
     */
    constructor(posX, posY, direction) {
        super().loadImage(this.IMAGES.GREEN[0]);
        this.loadImages(this.IMAGES);
        this.direction = direction;
        this.setPos(posX, posY);
        this.animate();
    }

    /**
    * Set the position of the bubble based on the provided coordinates and direction.
    * @param {number} posX - The x-coordinate for positioning the bubble.
    * @param {number} posY - The y-coordinate for positioning the bubble.
    */
    setPos(posX, posY) {
        !this.direction ? this.directionRight(posX) : this.directionLeft(posX);
        this.y = posY + 125;
    }
    /**
     * Set the position and end position of the bubble when moving to the right.
     * @param {number} posX - The initial x-coordinate for positioning the bubble.
     */
    directionRight(posX) {
        this.x = posX + 160;
        this.endPos = this.x + 350;
    }
    /**
     * Set the position and end position of the bubble when moving to the left.
     * @param {number} posX - The initial x-coordinate for positioning the bubble.
     */
    directionLeft(posX) {
        this.x = posX;
        this.endPos = this.x - 350;
    }

    /**
     * Initiate animation based on the direction of the bubble.
     */
    animate() {
        !this.direction ? this.setIntervalRight() : this.setIntervalLeft();
    }

    /**
     * Set up an interval to continuously move the bubble to the right until it reaches the end position.
     */
    setIntervalRight() {
        setInterval(() => {
            (this.x <= this.endPos) ? this.moveRight() : this.atEndPos = true;
        }, 10)
    }
    /**
     * Move the bubble to the right and set its image.
     */
    moveRight() {
        super.moveRight();
        this.setImg(this.IMAGES.GREEN[0]);
    }

    /**
    * Set up an interval to continuously move the bubble to the left until it reaches the end position.
    */
    setIntervalLeft() {
        setInterval(() => {
            (this.x >= this.endPos) ? this.moveLeft() : this.atEndPos = true;
        }, 10)
    }
    /**
     * Move the bubble to the left and set its image.
     */
    moveLeft() {
        super.moveLeft();
        this.setImg(this.IMAGES.GREEN[0]);
    }
}
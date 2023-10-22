/**
 * Class representing the coin element.
 */
class Coin extends DrawableObject {
    height = 40;
    width = 40;
    onCollisionCourse = true;
    IMAGES = {
        COIN: [
            'img/4_Markers/Coins/1.png',
            'img/4_Markers/Coins/2.png',
            'img/4_Markers/Coins/3.png',
            'img/4_Markers/Coins/4.png',
        ]
    }

    /**
     * Constructor for the Coin class, initializing with a specified position.
     * @param {number} x - The initial x-coordinate of the coin.
     * @param {number} y - The initial y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES.COIN[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = x;
        this.y = y;
    }

    /**
    * Set up an animation interval to change the image of the coin.
    */
    animate() {
        setInterval(() => {
            this.changeImg(this.IMAGES.COIN);
        }, 200)
    }

}
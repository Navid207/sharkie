/**
 * Class representing a movable background object.
 */
class Background extends MovableObject {
    height = 480;
    width = 1600;
    x = 0;
    y = 0;


    /**
     * Constructor for initializing the Background class with a specified image path and x-coordinate.
     * @param {string} imgPath - The path of the background image.
     * @param {number} x - The initial x-coordinate of the background.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
    }
}
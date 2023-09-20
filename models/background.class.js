class Background extends MovableObject {
    height = 480;
    width = 1600;

    x = 0;
    y = 0;

    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
    }
}
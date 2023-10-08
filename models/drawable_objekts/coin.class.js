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

    constructor(x, y) {
        super().loadImage(this.IMAGES.COIN[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            this.changeImg(this.IMAGES.COIN);
        }, 200)
    }

}
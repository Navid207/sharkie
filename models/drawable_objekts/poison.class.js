class Poison extends DrawableObject {
    height = 50;
    width = 50;
    onCollisionCourse = true;

    collOffset = {
        x: 15,
        y: 15,
        width: -30,
        height: -20
    }


    IMAGES = {
        POISON: [
            'img/4_Markers/poison/animate/1.png',
            'img/4_Markers/poison/animate/2.png',
            'img/4_Markers/poison/animate/3.png',
            'img/4_Markers/poison/animate/4.png',
            'img/4_Markers/poison/animate/5.png',
            'img/4_Markers/poison/animate/6.png',
            'img/4_Markers/poison/animate/7.png',
            'img/4_Markers/poison/animate/8.png',
        ]
    }

    constructor(x, y) {
        super().loadImage(this.IMAGES.POISON[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            this.changeImg(this.IMAGES.POISON);
        }, 200)
    }
}

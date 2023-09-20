class Life extends MovableObject {
    x = 60;
    y = -5;
    height = 50;
    width = 200;

    IMAGES = {
        LIFE: [
            'img/4_Markers/green/Life/0.png',
            'img/4_Markers/green/Life/20.png',
            'img/4_Markers/green/Life/40.png',
            'img/4_Markers/green/Life/60.png',
            'img/4_Markers/green/Life/80.png',
            'img/4_Markers/green/Life/100.png',
        ]
    }

    constructor() {
        super().loadImage(this.IMAGES.LIFE[5]);
    }

    setLife(HP) {

        switch (true) {
            case (HP>=100):
                this.loadImage(this.IMAGES.LIFE[5]);
                break;
            case (HP>=80):
                this.loadImage(this.IMAGES.LIFE[4]);
                break;
            case (HP>=60):
                this.loadImage(this.IMAGES.LIFE[3]);
                break;
            case (HP>=40):
                this.loadImage(this.IMAGES.LIFE[2]);
                break;
            case (HP>=20):
                this.loadImage(this.IMAGES.LIFE[1]);
                break;
            case (HP<20):
                this.loadImage(this.IMAGES.LIFE[0]);
                break;
        }
    }


}
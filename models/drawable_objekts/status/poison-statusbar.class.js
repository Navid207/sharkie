class PoisonStatusbar extends MovableObject{
    x = 60;
    y = 65;
    height = 50;
    width = 200;

    IMAGES = {
        POISEN: [
            'img/4_Markers/green/poisoned bubbles/0.png',
            'img/4_Markers/green/poisoned bubbles/20.png',
            'img/4_Markers/green/poisoned bubbles/40.png',
            'img/4_Markers/green/poisoned bubbles/60.png',
            'img/4_Markers/green/poisoned bubbles/80.png',
            'img/4_Markers/green/poisoned bubbles/100.png',
        ]
    }

    constructor() {
        super().loadImage(this.IMAGES.POISEN[0]);
    }

    setPoisonBubbl(POISEN) {

        switch (POISEN) {
            case (5):
                this.loadImage(this.IMAGES.POISEN[5]);
                break;
            case (4):
                this.loadImage(this.IMAGES.POISEN[4]);
                break;
            case (3):
                this.loadImage(this.IMAGES.POISEN[3]);
                break;
            case (2):
                this.loadImage(this.IMAGES.POISEN[2]);
                break;
            case (1):
                this.loadImage(this.IMAGES.POISEN[1]);
                break;
            case (0):
                this.loadImage(this.IMAGES.POISEN[0]);
                break;
        }
    }

}
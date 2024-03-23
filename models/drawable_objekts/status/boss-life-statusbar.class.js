/**
 * Class representing the Life statusbar element for the boss.
 */
class BossLifeStatusbar extends DrawableObject {
    x = 60;
    y = -5;
    height = 50;
    width = 200;
    IMAGES = {
        LIFE: [
            'img/4_Markers/orange/Life_0.png',
            'img/4_Markers/orange/Life_20.png',
            'img/4_Markers/orange/Life_40.png',
            'img/4_Markers/orange/Life_60.png',
            'img/4_Markers/orange/Life_80.png',
            'img/4_Markers/orange/Life_100.png',
        ]
    }

    /**
    * Constructor for initializing the LifeStatusbar class and loading its images.
    */
    constructor() {
        super().loadImages(this.IMAGES);
    }

    /**
     * Set the image for the life indicator based on the provided Health Points (HP) value.
     * @param {number} HP - The Health Points value.
     */
    setLife(HP) {
        switch (true) {
            case (HP >= 100):
                this.setImg(this.IMAGES.LIFE[5]);
                break;
            case (HP >= 80):
                this.setImg(this.IMAGES.LIFE[4]);
                break;
            case (HP >= 60):
                this.setImg(this.IMAGES.LIFE[3]);
                break;
            case (HP >= 40):
                this.setImg(this.IMAGES.LIFE[2]);
                break;
            case (HP >= 20):
                this.setImg(this.IMAGES.LIFE[1]);
                break;
            case (HP < 20):
                this.setImg(this.IMAGES.LIFE[0]);
                break;
        }
    }


}
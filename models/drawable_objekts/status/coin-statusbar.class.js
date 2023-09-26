class CoinStatusbar extends MovableObject{
    x = 60;
    y = 30;
    height = 50;
    width = 200;

    IMAGES = {
        COIN: [
            'img/4_Markers/green/Coin/0.png',
            'img/4_Markers/green/Coin/20.png',
            'img/4_Markers/green/Coin/40.png',
            'img/4_Markers/green/Coin/60.png',
            'img/4_Markers/green/Coin/80.png',
            'img/4_Markers/green/Coin/100.png',
        ]
    }

    constructor() {
        super().loadImage(this.IMAGES.COIN[0]);
    }

    setCoin(COIN) {

        switch (COIN) {
            case (5):
                this.loadImage(this.IMAGES.COIN[5]);
                break;
            case (4):
                this.loadImage(this.IMAGES.COIN[4]);
                break;
            case (3):
                this.loadImage(this.IMAGES.COIN[3]);
                break;
            case (2):
                this.loadImage(this.IMAGES.COIN[2]);
                break;
            case (1):
                this.loadImage(this.IMAGES.COIN[1]);
                break;
            case (0):
                this.loadImage(this.IMAGES.COIN[0]);
                break;
        }
    }

}
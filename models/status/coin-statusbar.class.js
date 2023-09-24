class CoinStatusbar extends DrawableObject{
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

        switch (true) {
            case (COIN>=100):
                this.loadImage(this.IMAGES.COIN[5]);
                break;
            case (COIN>=80):
                this.loadImage(this.IMAGES.COIN[4]);
                break;
            case (COIN>=60):
                this.loadImage(this.IMAGES.COIN[3]);
                break;
            case (COIN>=40):
                this.loadImage(this.IMAGES.COIN[1]);
                break;
            case (COIN<20):
                this.loadImage(this.IMAGES.COIN[0]);
                break;
        }
    }

}
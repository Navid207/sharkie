class CoinStatusbar extends MovableObject {
    x = 60;
    y = 30;
    height = 50;
    width = 200;
    oldState = 0;

    sounds = {
        coin: new Audio('audio/coins.wav'),
    }

    IMAGES = {
        COIN: [
            'img/4_Markers/green/Coin/0.png',
            'img/4_Markers/green/Coin/20.png',
            'img/4_Markers/green/Coin/40.png',
            'img/4_Markers/green/Coin/60.png',
            'img/4_Markers/green/Coin/80.png',
            'img/4_Markers/green/Coin/100.png'
        ]
    }

    constructor() {
        super().loadImages(this.IMAGES);
    }

    setCoin(COIN) {
        switch (COIN) {
            case (5):
                this.setImg(this.IMAGES.COIN[5]);
                this.playAudio(5);
                break;
            case (4):
                this.setImg(this.IMAGES.COIN[4]);
                this.playAudio(4);
                break;
            case (3):
                this.setImg(this.IMAGES.COIN[3]);
                this.playAudio(3);
                break;
            case (2):
                this.setImg(this.IMAGES.COIN[2]);
                this.playAudio(2);
                break;
            case (1):
                this.setImg(this.IMAGES.COIN[1]);
                this.playAudio(1);
                break;
            case (0):
                this.setImg(this.IMAGES.COIN[0]);
                break;
        }
    }

    playAudio(state) {
        if (state > this.oldState) {
            this.sounds.coin.currentTime = 0;
            this.sounds.coin.play();
            this.oldState = state;
        }
    }

}
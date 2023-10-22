/**
 * Class representing the coin status bar element.
 */
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

    /**
    * Constructor for initializing the CoinStatusbar class and loading its images.
    */
    constructor() {
        super().loadImages(this.IMAGES);
    }

    /**
     * Set the image and play audio for the Coin Statusbar based on the given coin value.
     * @param {number} COIN - The coin value (0 to 5).
     */
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

    /**
    * Play the "coin" audio if the provided state is greater than the previous state.
    * @param {number} state - The current state for which to play the audio.
    */
    playAudio(state) {
        if (state > this.oldState) {
            this.sounds.coin.currentTime = 0;
            this.sounds.coin.play();
            this.oldState = state;
        }
    }

}
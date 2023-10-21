class GameStatus extends DrawableObject {
    collectedCoins = 0;
    collectedPoison = 0;

    IMAGES = {
        STATE: [
            'img/6_Botones/Tittles/GameOver/Recurso11.png',
            'img/6_Botones/Tittles/winningScreen.png',
        ]
    }
    sounds = {
        gameOver : new Audio ('audio/GameOver.wav'),
        winn : new Audio ('audio/winn.wav')
    }

    constructor() {
        super().loadImages(this.IMAGES);
    }

    setGameState(State) {
        switch (State) {
            case (1):
                this.stateGameOver();
                break;
            case (2):
                this.stateYouWin();
                break;
            default:
                break;
        }
    }

    stateGameOver() {
        this.y = 200;
        this.height = 50;
        this.width = 500;
        this.setImg(this.IMAGES.STATE[0]);
    }
    stateYouWin() {
        this.height = 480;
        this.width = 720;
        this.y = 0;
        this.setImg(this.IMAGES.STATE[1]);
    }
}
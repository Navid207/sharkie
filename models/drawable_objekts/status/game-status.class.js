class GameStatus extends DrawableObject {
    collectedCoins=0;
    collectedPoison=0;

    IMAGES = {
        STATE: [
            'img/6_Botones/Tittles/Game Over/Recurso 11.png',
            'img/6_Botones/Tittles/You win/winningScreen.png',
        ]
    }

    constructor() {
        super().loadImages(this.IMAGES);
    }

    setGameState(State) { 
        switch (State) {
            case (1):
                this.y = 200;
                this.height = 50;
                this.width = 500;
                this.loadImage(this.IMAGES.STATE[0]);
                break;
            case (2):
                this.height = 480;
                this.width = 720;
                this.y = 0;
                this.loadImage(this.IMAGES.STATE[1]);
                break;
            default:
                break;
        }
    }
}
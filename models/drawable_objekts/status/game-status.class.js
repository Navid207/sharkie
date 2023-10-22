/**
 * Class representing the game status, including collected coins and poison, as well as images and sounds for different states.
 */
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
        gameOver: new Audio('audio/GameOver.wav'),
        winn: new Audio('audio/winn.wav')
    }

    /**
    * Constructor for initializing the GameStatus class and loading its images.
     */
    constructor() {
        super().loadImages(this.IMAGES);
    }

    /**
    * Set the game state based on the provided state value.
    * @param {number} State - The value representing the game state (1 for Game Over, 2 for You Win).
    */
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

    /**
    * Set the GameStatus properties to represent the "Game Over" state.
    */
    stateGameOver() {
        this.y = 200;
        this.height = 50;
        this.width = 500;
        this.setImg(this.IMAGES.STATE[0]);
    }

    /**
     * Set the GameStatus properties to represent the "You Win" state.
     */
    stateYouWin() {
        this.height = 480;
        this.width = 720;
        this.y = 0;
        this.setImg(this.IMAGES.STATE[1]);
    }
}
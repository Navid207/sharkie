/**
 * Class representing a movable character in the game.
 */
class Character extends MovableObject {
    x = 220;
    y = 80;
    height = 368;
    width = 300;
    speed = 2;
    damageSatae = 0;
    sounds = {
        bubble: new Audio('audio/Bubble.wav'),
        slap: new Audio('audio/FinSlap.wav'),
        hurt: new Audio('audio/Hurt_Sharki.wav'),
        electric: new Audio('audio/electric.wav'),
        gameOver: new Audio('audio/GameOver.wav')
    }
    collOffset = {
        x: 45,
        y: 120,
        width: -90,
        height: -175
    }
    IMAGES = {
        IDLE: [
            'img/1_Sharkie/IDLE/1.png',
            'img/1_Sharkie/IDLE/2.png',
            'img/1_Sharkie/IDLE/3.png',
            'img/1_Sharkie/IDLE/4.png',
            'img/1_Sharkie/IDLE/5.png',
            'img/1_Sharkie/IDLE/6.png',
            'img/1_Sharkie/IDLE/7.png',
            'img/1_Sharkie/IDLE/8.png',
            'img/1_Sharkie/IDLE/9.png',
            'img/1_Sharkie/IDLE/10.png',
            'img/1_Sharkie/IDLE/11.png',
            'img/1_Sharkie/IDLE/12.png',
            'img/1_Sharkie/IDLE/13.png',
            'img/1_Sharkie/IDLE/14.png',
            'img/1_Sharkie/IDLE/15.png',
            'img/1_Sharkie/IDLE/16.png',
            'img/1_Sharkie/IDLE/17.png',
            'img/1_Sharkie/IDLE/18.png'
        ],
        LONG_IDLE: [
            'img/1_Sharkie/Long_IDLE/I1.png',
            'img/1_Sharkie/Long_IDLE/I1.png',
            'img/1_Sharkie/Long_IDLE/I2.png',
            'img/1_Sharkie/Long_IDLE/I2.png',
            'img/1_Sharkie/Long_IDLE/I3.png',
            'img/1_Sharkie/Long_IDLE/I3.png',
            'img/1_Sharkie/Long_IDLE/I4.png',
            'img/1_Sharkie/Long_IDLE/I4.png',
            'img/1_Sharkie/Long_IDLE/I5.png',
            'img/1_Sharkie/Long_IDLE/I5.png',
            'img/1_Sharkie/Long_IDLE/I6.png',
            'img/1_Sharkie/Long_IDLE/I6.png',
            'img/1_Sharkie/Long_IDLE/I7.png',
            'img/1_Sharkie/Long_IDLE/I7.png',
        ],
        FALLING_TO_SLEEP: [
            'img/1_Sharkie/Long_IDLE/I8.png',
            'img/1_Sharkie/Long_IDLE/I8.png',
            'img/1_Sharkie/Long_IDLE/I9.png',
            'img/1_Sharkie/Long_IDLE/I9.png',
            'img/1_Sharkie/Long_IDLE/I10.png',
            'img/1_Sharkie/Long_IDLE/I10.png',
        ],
        SLEEPING: [
            'img/1_Sharkie/Long_IDLE/I11.png',
            'img/1_Sharkie/Long_IDLE/I11.png',
            'img/1_Sharkie/Long_IDLE/I12.png',
            'img/1_Sharkie/Long_IDLE/I12.png',
            'img/1_Sharkie/Long_IDLE/I13.png',
            'img/1_Sharkie/Long_IDLE/I13.png',
            'img/1_Sharkie/Long_IDLE/I14.png',
            'img/1_Sharkie/Long_IDLE/I14.png'
        ],
        SWIM: [
            'img/1_Sharkie/Swim/1.png',
            'img/1_Sharkie/Swim/2.png',
            'img/1_Sharkie/Swim/3.png',
            'img/1_Sharkie/Swim/4.png',
            'img/1_Sharkie/Swim/5.png',
            'img/1_Sharkie/Swim/6.png'
        ],
        FIN_SLAP: [
            'img/1_Sharkie/Attack/FinSlap/1.png',
            'img/1_Sharkie/Attack/FinSlap/2.png',
            'img/1_Sharkie/Attack/FinSlap/3.png',
            'img/1_Sharkie/Attack/FinSlap/4.png',
            'img/1_Sharkie/Attack/FinSlap/5.png',
            'img/1_Sharkie/Attack/FinSlap/6.png',
            'img/1_Sharkie/Attack/FinSlap/7.png',
            'img/1_Sharkie/Attack/FinSlap/8.png',
        ],
        BUBBLE_TRAP: [
            'img/1_Sharkie/Attack/Bubble/1.png',
            'img/1_Sharkie/Attack/Bubble/2.png',
            'img/1_Sharkie/Attack/Bubble/3.png',
            'img/1_Sharkie/Attack/Bubble/4.png',
            'img/1_Sharkie/Attack/Bubble/5.png',
            'img/1_Sharkie/Attack/Bubble/6.png',
            'img/1_Sharkie/Attack/Bubble/7.png',
            'img/1_Sharkie/Attack/Bubble/8.png',
        ],
        DAMAGE_POISON: [
            'img/1_Sharkie/Hurt/Poisoned/1.png',
            'img/1_Sharkie/Hurt/Poisoned/2.png',
            'img/1_Sharkie/Hurt/Poisoned/3.png',
            'img/1_Sharkie/Hurt/Poisoned/4.png',
            'img/1_Sharkie/Hurt/Poisoned/5.png',
        ],
        DAMAGE_ELECTRIC: [
            'img/1_Sharkie/Hurt/ElectricShock/1.png',
            'img/1_Sharkie/Hurt/ElectricShock/2.png',
            'img/1_Sharkie/Hurt/ElectricShock/3.png',
        ],
        DEAD_POISON: [
            'img/1_Sharkie/Dead/Poisoned/1.png',
            'img/1_Sharkie/Dead/Poisoned/2.png',
            'img/1_Sharkie/Dead/Poisoned/3.png',
            'img/1_Sharkie/Dead/Poisoned/4.png',
            'img/1_Sharkie/Dead/Poisoned/5.png',
            'img/1_Sharkie/Dead/Poisoned/6.png',
            'img/1_Sharkie/Dead/Poisoned/7.png',
            'img/1_Sharkie/Dead/Poisoned/8.png',
            'img/1_Sharkie/Dead/Poisoned/9.png',
            'img/1_Sharkie/Dead/Poisoned/10.png',
            'img/1_Sharkie/Dead/Poisoned/11.png',
            'img/1_Sharkie/Dead/Poisoned/12.png',
        ],
        DEAD_ELECTRIC: [
            'img/1_Sharkie/Dead/ElectroShock/1.png',
            'img/1_Sharkie/Dead/ElectroShock/2.png',
            'img/1_Sharkie/Dead/ElectroShock/3.png',
            'img/1_Sharkie/Dead/ElectroShock/4.png',
            'img/1_Sharkie/Dead/ElectroShock/5.png',
            'img/1_Sharkie/Dead/ElectroShock/6.png',
            'img/1_Sharkie/Dead/ElectroShock/7.png',
            'img/1_Sharkie/Dead/ElectroShock/8.png',
            'img/1_Sharkie/Dead/ElectroShock/9.png',
            'img/1_Sharkie/Dead/ElectroShock/10.png',
        ]

    }

    /**
     * Constructor for initializing the Character class with an idle image, loading additional images, initiating movement, and starting animation.
     */
    constructor() {
        super().loadImage('img/1_Sharkie/IDLE/1.png');
        this.loadImages(this.IMAGES);
        this.move();
        this.animate()
    }

    /**
     * Set up an interval to repeatedly check for movement commands and update the character's position.
     */
    move() {
        setInterval(() => {
            if (this.moveLeft()) {
                super.moveLeft();
                this.imgCahangeDirection = true;
            }
            if (this.moveRight()) {
                super.moveRight();
                this.imgCahangeDirection = false;
            }
            if (this.moveUp()) super.moveUp();

            if (this.moveDown()) super.moveDown();

        }, 1000 / 60);
    }
    /**
    * Check conditions for moving the character to the left.
    * @returns {boolean} - True if the left movement conditions are met, otherwise false.
    */
    moveLeft() {
        return this.activState == 4 && this.keyboard.LEFT && (this.x > this.xMin) && !(this.x == 840);
    }
    /**
     * Check conditions for moving the character to the right.
     * @returns {boolean} - True if the right movement conditions are met, otherwise false.
     */
    moveRight() {
        return this.activState == 4 && this.keyboard.RIGHT && (this.x < this.xMax);
    }
    /**
     * Check conditions for moving the character up.
     * @returns {boolean} - True if the up movement conditions are met, otherwise false.
     */
    moveUp() {
        return this.activState == 4 && this.keyboard.UP && (this.y > this.yMin);
    }
    /**
     * Check conditions for moving the character down.
     * @returns {boolean} - True if the down movement conditions are met, otherwise false.
     */
    moveDown() {
        return ((this.activState == 4 && this.keyboard.DOWN) || this.activState == 2) && (this.y < this.yMax);
    }


    /**
    * Set up an interval for animating the character, checking for state changes, updating images, and playing audio.
    */
    animate() {
        setInterval(() => {
            if (this.activState != this.oldState) this.changeState();
            this.switchImg();
            this.playAudio();
        }, 100);
    }
    /**
     * Change the character's state, reset the image index, and trigger specific actions based on the new state.
     */
    changeState() {
        this.oldState = this.activState;
        this.actImage = 0;
        if (this.activState == 7) this.poisonDamage();
        if (this.activState == 8) this.electricDamage();
    }
    /**
     * Apply poison damage to the character, reducing HP by 20.
     * If the character is dead, update the state accordingly.
     */
    poisonDamage() {
        this.HP -= 20;
        if (this.isDead()) this.activState = 100;
    }
    /**
     * Apply electric damage to the character, reducing HP by 40.
     * If the character is dead, update the state accordingly.
     */
    electricDamage() {
        this.HP -= 40;
        if (this.isDead()) this.activState = 101;
    }
    /**
     * Switch the character's image based on its current state.
     * Adjust speed and other properties for specific states.
     */
    switchImg() {
        switch (this.activState) {
            case 4:
                super.changeImg(this.IMAGES.SWIM);
                this.speed = 2;
                break;
            case 5:
                super.changeImg(this.IMAGES.FIN_SLAP);
                break;
            case 6:
                super.changeImg(this.IMAGES.BUBBLE_TRAP);
                break;
            case 7:
                super.changeImg(this.IMAGES.DAMAGE_POISON);
                break;
            case 8:
                super.changeImg(this.IMAGES.DAMAGE_ELECTRIC);
                break;
            case 1:
                super.changeImg(this.IMAGES.LONG_IDLE);
                break;
            case 2:
                super.changeImg(this.IMAGES.FALLING_TO_SLEEP);
                this.speed = 0.5;
                break;
            case 3:
                super.changeImg(this.IMAGES.SLEEPING);
                break;

            case 100:
                if (this.actImage <= 11) {
                    super.changeImg(this.IMAGES.DEAD_POISON);
                }
                break;
            case 101:
                if (this.actImage <= 9) {
                    super.changeImg(this.IMAGES.DEAD_ELECTRIC);
                }
                break;
            default:
                super.changeImg(this.IMAGES.IDLE);
        }
    }


    /**
     * Play audio based on the character's state or interactions.
     */
    playAudio() {
        if (this.audioSlap()) {
            this.sounds.slap.play();
            this.onCollisionCourse = true;
            return
        } else this.onCollisionCourse = false;

        if (this.audioBubble()) return this.sounds.bubble.play();

        if (this.audioHurt()) return this.sounds.hurt.play();

        if (this.audioDead()) return this.sounds.hurt.play();

        if (this.audioElectricShock()) return this.sounds.electric.play();

        if (this.audioElectricDead()) {
            return this.sounds.electric.play();
        } else this.sounds.electric.pause();
    }
    /**
     * Check conditions to determine if the character is in a state where a slap sound should be played.
     * @returns {boolean} - True if the conditions for a slap sound are met, otherwise false.
     */
    audioSlap() {
        return this.activState == 5 && this.oldState == 5 && this.actImage >= 5 && this.actImage <= 7
    }
    /**
     * Check conditions to determine if the character is in a state where a bubble sound should be played.
     * @returns {boolean} - True if the conditions for a bubble sound are met, otherwise false.
     */
    audioBubble() {
        return this.activState == 6 && this.oldState == 6 && this.actImage >= 5 && this.actImage <= 7
    }
    /**
     * Check conditions to determine if the character is in a state where a hurt sound should be played.
     * @returns {boolean} - True if the conditions for a hurt sound are met, otherwise false.
     */
    audioHurt() {
        return this.activState == 7 && this.oldState == 7 && this.actImage >= 0 && this.actImage <= 4
    }
    /**
     * Check conditions to determine if the character is in a state where a dead sound should be played.
     * @returns {boolean} - True if the conditions for a dead sound are met, otherwise false.
     */
    audioDead() {
        return this.activState == 100 && this.oldState == 100 && this.actImage >= 0 && this.actImage <= 4
    }
    /**
     * Check conditions to determine if the character is in a state where an electric shock sound should be played.
     * @returns {boolean} - True if the conditions for an electric shock sound are met, otherwise false.
     */
    audioElectricShock() {
        return this.activState == 8 && this.oldState == 8 && this.actImage >= 0 && this.actImage <= 3
    }
    /**
     * Check conditions to determine if the character is in a state where an electric dead sound should be played.
     * @returns {boolean} - True if the conditions for an electric dead sound are met, otherwise false.
     */
    audioElectricDead() {
        return this.activState == 101 && this.oldState == 101 && this.actImage >= 0 && this.actImage <= 5
    }
}


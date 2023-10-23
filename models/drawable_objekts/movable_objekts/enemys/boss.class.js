/**
 * Class representing a Boss object in the game.
 * Inherits from the MovableObject class and defines specific attributes and functions for the Boss.
 */
class Boss extends MovableObject {
    height = 400;
    width = 400;
    startPosX = 1200;
    startPosY = 0;
    targetPosX;
    targetPosY;
    showPos;
    damageTyp = 1;
    damageSatae = 0;
    attackTime = Math.random() * 5000 + 3000;
    onCollisionCourse = false;
    activState;
    speed = 10;
    sounds = {
        bite: new Audio('audio/bite.wav'),
        hurt: new Audio('audio/Hurt_Boss.wav'),
    }
    collOffset = {
        x: 20,
        y: 160,
        width: -45,
        height: -235
    }
    IMAGES = {
        COMMING: [
            'img/2_Enemy/3_Final/1.Introduce/1.png',
            'img/2_Enemy/3_Final/1.Introduce/2.png',
            'img/2_Enemy/3_Final/1.Introduce/3.png',
            'img/2_Enemy/3_Final/1.Introduce/4.png',
            'img/2_Enemy/3_Final/1.Introduce/5.png',
            'img/2_Enemy/3_Final/1.Introduce/6.png',
            'img/2_Enemy/3_Final/1.Introduce/7.png',
            'img/2_Enemy/3_Final/1.Introduce/8.png',
            'img/2_Enemy/3_Final/1.Introduce/9.png',
            'img/2_Enemy/3_Final/1.Introduce/10.png'
        ],
        SWIM: [
            'img/2_Enemy/3_Final/2.floating/1.png',
            'img/2_Enemy/3_Final/2.floating/2.png',
            'img/2_Enemy/3_Final/2.floating/3.png',
            'img/2_Enemy/3_Final/2.floating/4.png',
            'img/2_Enemy/3_Final/2.floating/5.png',
            'img/2_Enemy/3_Final/2.floating/6.png',
            'img/2_Enemy/3_Final/2.floating/7.png',
            'img/2_Enemy/3_Final/2.floating/8.png',
            'img/2_Enemy/3_Final/2.floating/9.png',
            'img/2_Enemy/3_Final/2.floating/10.png',
            'img/2_Enemy/3_Final/2.floating/11.png',
            'img/2_Enemy/3_Final/2.floating/12.png',
            'img/2_Enemy/3_Final/2.floating/13.png'
        ],
        ATTACK: [
            'img/2_Enemy/3_Final/Attack/1.png',
            'img/2_Enemy/3_Final/Attack/2.png',
            'img/2_Enemy/3_Final/Attack/3.png',
            'img/2_Enemy/3_Final/Attack/4.png',
            'img/2_Enemy/3_Final/Attack/5.png',
            'img/2_Enemy/3_Final/Attack/6.png'
        ],
        HURT: [
            'img/2_Enemy/3_Final/Hurt/1.png',
            'img/2_Enemy/3_Final/Hurt/2.png',
            'img/2_Enemy/3_Final/Hurt/3.png',
            'img/2_Enemy/3_Final/Hurt/4.png'
        ],
        DEAD: [
            'img/2_Enemy/3_Final/Dead/1.png',
            'img/2_Enemy/3_Final/Dead/2.png',
            'img/2_Enemy/3_Final/Dead/3.png',
            'img/2_Enemy/3_Final/Dead/4.png',
            'img/2_Enemy/3_Final/Dead/5.png',
            'img/2_Enemy/3_Final/Dead/6.png'
        ],
    }

    /**
     * Constructor for the boss, initializing its position and loading initial images.
     * @param {number} x - The initial x-coordinate of the boss.
     * @param {number} y - The initial y-coordinate of the boss.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES.COMMING[0])
        this.x = this.startPosX;
        this.y = this.startPosY;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Animation loop for the boss. Executes actions such as playing audio,
     */
    animate() {
        setInterval(() => {
            this.playAudio();
            this.setNewState();
            if (this.activState > 0) this.attack();
            this.checkState();
            this.switchImg();
        }, 200);
    }

    /**
     * Checks the current state of the boss and triggers corresponding actions.
     */
    checkState() {
        if (this.isCommig()) return this.stateComming();
        if (this.isDead()) return this.stateIsDead();
        if (this.hurt) return this.stateHurt();
        if (this.onCollisionCourse) return this.activState = 3;
        if (this.activState > 0) return this.stateSwimm();
    }
    /**
     * Checks if the boss is in the 'Comming' state.
     * @returns {boolean} - True if the enemy is in the 'Comming' state, otherwise false.
     */
    isCommig() {
        return (this.showPos >= this.view_x & !this.activState) || this.activState == 1 && this.actImage < 10;
    }
    /**
     * Handles the state transition for the enemy when it is in the 'Comming' state.
     */
    stateComming() {
        this.onCollisionCourse = true;
        this.activState = 1
    }
    /**
     * Handles the state transition for the enemy when it is in the 'IsDead' state.
     * Resets hurt and collision flags, and updates the active state to indicate the enemy is dead.
     */
    stateIsDead() {
        this.hurt = false;
        this.onCollisionCourse = false;
        this.activState = 100
    }
    /**
     * Handles the state transition for the enemy when it is in the 'Hurt' state.
     */
    stateHurt() {
        if (this.oldState == 4 && this.actImage >= 3) this.hurt = false;
        this.activState = 4
    }
    /**
     * Handles the state transition for the boss when it is in the 'Swimm' state.
     */
    stateSwimm() {
        this.activState = 2;
        this.move();
    }

    /**
    * Initiates both vertical and horizontal movement for the Boss.
    */
    move() {
        this.moveVertical();
        this.moveHorizontal();
    }

    /**
     * Moves the enemy vertically towards the target position.
     */
    moveVertical() {
        if (this.yPosCenter() != this.targetPosY) {
            (this.yPosCenter() > this.targetPosY) ? this.moveUp() : this.moveDown();
        }
    }
    /**
     * Calculates and returns the vertical center position of the boss,
     * taking into account the collision offset.
     * @returns {number} - The vertical center position.
     */
    yPosCenter() {
        return this.y + this.collOffset.y + ((this.height + this.collOffset.height) / 2);
    }
    /**
    * Moves the boss upwards if the resulting position is above a minimum threshold.#
    * @remarks The minimum threshold is set to prevent the enemy from going too high.
    */
    moveUp() {
        if (this.y > -160) super.moveUp()
    }
    /**
     * Moves the boss downwards if the resulting position is below a maximum threshold.
     * @remarks The maximum threshold is set to prevent the enemy from going too low.
     */
    moveDown() {
        if (this.y < 155) super.moveDown()
    }

    /**
     * Adjusts the boss horizontal position to reach the target horizontal position.
     * The adjustment is made by moving the enemy either left or right based on the comparison of current and target horizontal positions.
     */
    moveHorizontal() {
        if (this.xPosCenter() != this.targetPosX) {
            (this.xPosCenter() > this.targetPosX) ? this.moveLeft() : this.moveRight();
        }
    }
    /**
     * Calculates and returns the horizontal center position of the enemy, taking into account its collision offset.
     * @returns {number} - The horizontal center position of the Yellow enemy.
     */
    xPosCenter() {
        return this.x + this.collOffset.x + ((this.width + this.collOffset.width) / 2);
    }
    /**
     * Moves the boss to the right if its horizontal center position plus an additional offset is less than the target horizontal position.
     */
    moveRight() {
        this.imgCahangeDirection = true;
        if ((this.xPosCenter() + 150) < this.targetPosX) super.moveRight();
    }
    /**
     * Moves the boss to the left if its horizontal center position minus an additional offset is greater than the target horizontal position.
     */
    moveLeft() {
        this.imgCahangeDirection = false;
        if ((this.xPosCenter() - 150) > this.targetPosX) super.moveLeft();
    }


    /**
     * Checks if the boss is in the attacking state and at a specific animation frame, then sets the onCollisionCourse flag to false and triggers an attack delay.
     */
    attack() {
        if (this.oldState == 3 && this.actImage == 5) {
            this.onCollisionCourse = false;
            this.setAttackDelay();
        }
    }

    /**
     * Sets a delay before triggering an attack, ensuring that the boss can perform attacks at intervals defined by the attackTime property.
     */
    setAttackDelay() {
        setTimeout(() => {
            if (!this.isDead()) this.setAttack();
        }, this.attackTime);
    }

    /**
    * Initiates an attack by resetting the damage state, setting the enemy on a collision course, and updating the attackTime for the next attack.
    */
    setAttack() {
        this.damageSatae = 0;
        this.onCollisionCourse = true;
        this.attackTime = Math.random() * 5000 + 3000;
    }

    /**
    * Plays audio based on the enemy's state. If the enemy is biting, it plays the biting audio. If the enemy is hurt or dying, it plays the hurt audio.
    */
    playAudio() {
        if (this.isBiteing()) return this.audioBite();
        if (this.isHurt() || this.isDying()) return this.audioHurt();
    }

    /**
     * Checks if the enemy is currently in the biting state. Returns true if the enemy is actively biting in the current frame.
     * @returns {boolean} - True if the enemy is biting, false otherwise.
     */
    isBiteing() {
        return this.activState == 3 && this.oldState == 3 && this.actImage == 1
    }
    /**
     * Plays the audio for the biting action. Resets the audio playback to the beginning before playing.
     */
    audioBite() {
        this.sounds.bite.currentTime = 0;
        this.sounds.bite.play()
    }

    /**
    * Checks if the boss is in the hurt state, specifically during the first frame of the hurt animation.
    * @returns {boolean} - True if the boss is in the hurt state, otherwise false.
    */
    isHurt() {
        return this.activState == 4 && this.oldState == 4 && this.actImage == 1;
    }
    /**
     * Checks if the boss is in the dying state, specifically during the first frame of the dying animation.
     * @returns {boolean} - True if the boss is in the dying state, otherwise false.
     */
    isDying() {
        return this.activState == 100 && this.oldState == 100 && this.actImage == 1;
    }
    /**
     * Plays the hurt sound effect, resetting its playback to the beginning.
     */
    audioHurt() {
        this.sounds.hurt.currentTime = 0;
        this.sounds.hurt.play();
    }

    /**
     * Switches the image based on the current state of the boss.
     * Uses different images for coming, swimming, attacking, hurt, and dead states.
     */
    switchImg() {
        switch (this.activState) {
            case 1:
                this.changeImg(this.IMAGES.COMMING)
                break;
            case 2:
                this.changeImg(this.IMAGES.SWIM)
                break;
            case 3:
                this.changeImg(this.IMAGES.ATTACK)
                break;
            case 4:
                this.changeImg(this.IMAGES.HURT)
                break;

            case 100:
                if (this.actImage <= 5) {
                    this.changeImg(this.IMAGES.DEAD)
                }
                break;
            default:
                break;
        }
    }


}
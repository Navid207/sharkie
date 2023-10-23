/**
 * Class representing a Puffer object in the game.
 * Inherits from the MovableObject class and defines specific attributes and functions for the Puffer.
 */
class Puffer extends MovableObject {
    height = 50;
    width = 50;
    x = 300 + Math.random() * 400;
    y = 0 + Math.random() * (480 - this.height);
    speed = Math.random() * 0.5;
    damageTyp = 1;
    damageSatae = 0;
    onCollisionCourse = false;
    attackTime = Math.random() * 10000;
    HP = 20;
    IMAGES = {
        SWIM: [
            'img/2_Enemy/1_Puffer/1.Swim/1.swim1.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim2.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim3.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim4.png',
            'img/2_Enemy/1_Puffer/1.Swim/1.swim5.png'
        ],
        TRANSFORM: [
            'img/2_Enemy/1_Puffer/2.transition/1.transition1.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition2.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition3.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition4.png',
            'img/2_Enemy/1_Puffer/2.transition/1.transition5.png',
        ],
        ATTACK: [
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim1.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim2.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim3.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim4.png',
            'img/2_Enemy/1_Puffer/3.Bubbleeswim/1.bubbleswim5.png',
        ],
        DEAD: [
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead1.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead2.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png',
            'img/2_Enemy/1_Puffer/4.DIE/1.Dead3.png'
        ]


    }

    /**
    * Constructor for the Puffer class.
    * Loads the initial image for swimming, loads additional images, starts animation,
    * and sets the initial swimming direction (left).
    */
    constructor() {
        super().loadImage('img/2_Enemy/1_Puffer/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.swimLeft();
    }

    /**
    * Method to animate the Puffer object.
    * Sets a new state, introduces a delay for the attack, and updates the Puffer's state.
    */
    animate() {
        setInterval(() => {
            this.setNewState();
            this.delayAttack();
            this.pufferState();
        }, 200 - (200 * this.speed));
    }

    /**
     * Method to introduce a delay before initiating the Puffer's attack.
     * The Puffer will set itself on collision course after a specified delay, unless already on course
     * or if its health points (HP) reach zero.
     */
    delayAttack() {
        setTimeout(() => {
            if (!this.onCollisionCourse && this.HP > 0) this.onCollisionCourse = true;
        }, this.attackTime)
    }

    /**
    * Function to manage the state transitions of the Puffer based on its behavior.
    * Checks if the Puffer is dead, attacking, swimming, or in a transformed state.
    */
    pufferState() {
        if (super.isDead()) return this.stateIsDead();
        if (this.isAttacking()) return this.stateAttack();
        if (!this.onCollisionCourse) this.stateSwimm();
        else this.stateTransform();
    }
    /**
     * Handle the state when the Puffer is dead.
     */
    stateIsDead() {
        this.activState = 100;
        this.speed = 0;
        this.onCollisionCourse = false;
        if (this.isDead()) this.changeImg(this.IMAGES.DEAD);
    }
    /**
     * Check if the Puffer is considered dead.
     * @returns {boolean} - True if the Puffer is dead, otherwise false.
     */
    isDead() {
        return (this.actImage <= 3 || this.oldState != 100);
    }
    /**
     * Check if the Puffer is in an attacking state.
     * @returns {boolean} - True if the Puffer is attacking, otherwise false.
     */
    isAttacking() {
        return (this.onCollisionCourse && this.actImage == 4) || this.activState == 2
    }
    /**
     * Handle the state transition and image change when the Puffer is in an attacking state.
     */
    stateAttack() {
        this.changeImg(this.IMAGES.ATTACK);
        this.activState = 2;
        if (this.speed < 2) return this.speed = this.speed + this.speed;
    }
    /**
     * Handle the state transition and image change when the Puffer is in a swimming state.
     */
    stateSwimm() {
        this.changeImg(this.IMAGES.SWIM);
        this.activState = 1;
    }
    /**
     * Handle the state transition and image change when the Puffer is in a transformed state.
     */
    stateTransform() {
        this.changeImg(this.IMAGES.TRANSFORM);
        this.activState = 2;
    }

    /**
     * Initiates the movement of the Puffer to the left in a swimming animation.
     * The method uses setInterval to continuously move the Puffer to the left at a regular interval,
     * but only when the Puffer is in a state less than or equal to 2 (indicating not in an attacking state).
     */
    swimLeft() {
        setInterval(() => {
            if (this.activState <= 2) this.moveLeft()
        }, 1000 / 60);
    }




}
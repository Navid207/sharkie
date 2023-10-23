/**
 * Class representing a Jally object in the game.
 * Inherits from the MovableObject class and defines specific attributes and functions for the Jally.
 */
class Jally extends MovableObject {
    height = 80;
    width = 80;
    x = 300 + Math.random() * 400;
    y = 0 + Math.random() * (480 - this.height);
    speed = Math.random() * 0.5;
    direction = 1;
    damageTyp = 2;
    damageSatae = 0;
    attackTime = Math.random() * 5000;
    IMAGES = {
        YELLOW: [
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 1.png',
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 2.png',
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 3.png',
            'img/2_Enemy/2_Jelly/Regular damage/Yellow 4.png',
        ],
        ATTACK: [
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 1.png',
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 2.png',
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 3.png',
            'img/2_Enemy/2_Jelly/Súper dangerous/Pink 4.png',
        ]

    }

    /**
     * Constructor for the Jally, initializing its image, animation, and movement behavior.
     * The enemy starts with the first image from the YELLOW animation, loads all images,
     * and begins the animation and vertical swimming behavior.
     */
    constructor() {
        super().loadImage(this.IMAGES.YELLOW[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.swimUpDown();
    }

    /**
     * Animation function for the Jally enemy, managing the periodic updates of its behavior.s
     */
    animate() {
        setInterval(() => this.setCollisionCourse(), this.attackTime)
        setInterval(() => this.checkImgState(), 200 - (200 * this.speed));
    }
    /**
     * Function to toggle the collision course of the Yellow enemy.
     */
    setCollisionCourse() {
        this.onCollisionCourse ? (this.onCollisionCourse = false) : (this.onCollisionCourse = true);
        if (!this.onCollisionCourse) this.damageSatae = 0;
    }
    /**
     * Function to check the image state of the Yellow enemy based on its collision course.
     */
    checkImgState() {
        (!this.onCollisionCourse) ? this.changeImg(this.IMAGES.YELLOW) : this.changeImg(this.IMAGES.ATTACK);
    }

    /**
     * Function to make the Yellow enemy swim up and down within the vertical limits of the canvas.
     */
    swimUpDown() {
        setInterval(() => {
            this.direction > 0 ? this.moveUp() : this.moveDown();
            this.direction = (this.y <= 0) ? -1 : (this.y >= 400) ? 1 : this.direction; // Verkürzte schreibweise bedingte (ternäre) Operator 
        })
    }




}
/**
 * Base class representing a movable object in the game.
 * Extends the DrawableObject class and includes properties and functions for movement, state, health, collision, and keyboard input.
 */
class MovableObject extends DrawableObject {
    xMin = -30;
    xMax = 1430;
    yMin = -110;
    yMax = 280;
    activState = 0;
    oldState;
    speed = 0;
    HP = 100;
    onCollisionCourse = true;
    hurt = false;
    keyboard = new Keyboard;


    /**
     * Move the object to the right by updating its x-coordinate based on the current speed.
     */
    moveRight() {
        this.x = this.x + this.speed;
    }
    /**
     * Move the object to the left by updating its x-coordinate based on the current speed.
     */
    moveLeft() {
        this.x = this.x - this.speed;
    }
    /**
     * Move the object up by updating its y-coordinate based on the current speed.
     */
    moveUp() {
        this.y = this.y - this.speed;
    }
    /**
     * Move the object down by updating its y-coordinate based on the current speed.
     */
    moveDown() {
        this.y = this.y + this.speed;
    }

    /**
    * Check if the calling object (e.g. character) is colliding with another object.
    * @param {Object} obj - The object to check for collision.
    * @returns {boolean} - True if a collision is detected, otherwise false.
    */
    isColliding(obj) {
        let OBJ = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };
        OBJ.xMin = obj.x + obj.collOffset.x;
        OBJ.xMax = OBJ.xMin + obj.width + obj.collOffset.width;
        OBJ.yMin = obj.y + obj.collOffset.y;
        OBJ.yMax = OBJ.yMin + obj.height + obj.collOffset.height;

        let CHAR = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };
        CHAR.xMin = this.x + this.collOffset.x;
        CHAR.xMax = CHAR.xMin + this.width + this.collOffset.width;
        CHAR.yMin = this.y + this.collOffset.y;
        CHAR.yMax = CHAR.yMin + this.height + this.collOffset.height;

        return ((CHAR.xMax >= OBJ.xMin) && (CHAR.xMin <= OBJ.xMax)) &&
            ((CHAR.yMax >= OBJ.yMin) && (CHAR.yMin <= OBJ.yMax))
            && obj.onCollisionCourse
    }
    /**
     * Check if the object is considered dead based on its current health points.
     * @returns {boolean} - True if the object is dead, otherwise false.
     */
    isDead() {
        if (this.HP <= 0) {
            this.HP = 0;
            return true
        } else { return false }

    }
    /**
     * Update state-related properties when a new state is set.
     */
    setNewState() {
        if (this.activState != this.oldState) {
            this.oldState = this.activState;
            this.actImage = 0;
        }
    }
}

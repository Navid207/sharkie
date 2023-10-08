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


    moveRight() {
        this.x = this.x + this.speed;
    }

    moveLeft() {
        this.x = this.x - this.speed;
    }

    moveUp() {
        this.y = this.y - this.speed;
    }

    moveDown() {
        this.y = this.y + this.speed;
    }

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

    isDead() {
        if (this.HP <= 0) {
            this.HP = 0;
            return true
        } else { return false }

    }

    setNewState() {
        if (this.activState != this.oldState) {
            this.oldState = this.activState;
            this.actImage = 0;
        }
    }
}

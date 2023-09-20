class MovableObject {
    xMin = -30;
    xMax = 1430;
    x = 100;
    yMin = -110;
    yMax = 280;
    y = 200;
    height = 150;
    width = 100;
    onCollisionCourse = true;

    collOffset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }

    view_x;
    img;
    imgCahangeDirection = false;

    activState = 0;
    oldState;

    imageCache = {};
    actImage = 0;

    swimPath;


    speed = 0;
    HP = 100;

    keyboard = new Keyboard;

    loadImage(path) {
        this.img = new Image(); // => this.img = document.getElementById('image')  nur das es die Img noch nicht esestiet in HTML
        this.img.src = path;    //  es entspricht <img src="">
    }

    loadImages(images) {
        for (const key in images) {
            if (images.hasOwnProperty(key)) {
                const pathList = images[key];
                pathList.forEach((path) => {
                    let img = new Image();
                    img.src = path;
                    this.imageCache[path] = img;
                });
            }
        }
    }


    moveRight() {
        this.x = this.x + this.speed;
    };
    moveLeft() {
        this.x = this.x - this.speed;
    };
    moveUp() {
        this.y = this.y - this.speed;
    };
    moveDown() {
        this.y = this.y + this.speed;
    };
    changeImg(animationArr) {
        let i = this.actImage % animationArr.length; //Modulo (%) ist der Rest der beim Teil sich ergibt
        let path = animationArr[i];
        this.img = this.imageCache[path];
        this.actImage++;
    };

    drawImage(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawCollisionArea(ctx) {
        // rectangel for collisions detection
        if (this instanceof Character || this instanceof Jally || this instanceof Puffer || this instanceof Boss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect((this.x + this.collOffset.x), (this.y + this.collOffset.y), (this.width + this.collOffset.width), (this.height + this.collOffset.height));
            ctx.stroke();
        }
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

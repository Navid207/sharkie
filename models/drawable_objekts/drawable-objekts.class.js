class DrawableObject {

    x = 100;
    y = 200;
    height = 150;
    width = 100;

    view_x;
    img;
    actImage = 0;
    imageCache = {};
    imgCahangeDirection = false;

    collOffset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }

    sounds = {};


    loadImage(path) {
        this.img = new Image(); // => this.img = document.getElementById('image')  nur das es die Img noch nicht esestiet in HTML
        this.img.src = path;    //  es entspricht <img src="">
    }

    loadImages(images) {
        for (const key in images) {
            if (images.hasOwnProperty(key)) {
                const pathList = images[key];
                pathList.forEach((path) => this.setImageCache(path));
            }
        }
    }

    setImageCache(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    changeImg(animationArr) {
        let i = this.actImage % animationArr.length; //Modulo (%) ist der Rest der beim Teil sich ergibt
        let path = animationArr[i];
        this.img = this.imageCache[path];
        this.actImage++;
    }

    drawImage(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawCollisionArea(ctx) {
        if (this.instanceofObjects()) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect((this.x + this.collOffset.x), (this.y + this.collOffset.y), (this.width + this.collOffset.width), (this.height + this.collOffset.height));
            ctx.stroke();
        }
    }

    instanceofObjects() {
        return (this instanceof Character || this instanceof Coin || this instanceof Poison || this instanceof Jally || this instanceof Puffer || this instanceof Boss);
    }

}
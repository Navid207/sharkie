/**
 * Parent class containing all functions and variables for an object being drawn.
 */
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

    /**
     * Function to load an image into the document.
     * @param {string} path - The path of the image.
     */
    loadImage(path) {
        this.img = new Image(); // => this.img = document.getElementById('image')  nur das es die Img noch nicht esestiet in HTML
        this.img.src = path;    //  es entspricht <img src="">
    }

    /**
     * Function to load images into the document.
     * @param {JSON} images - The JSON object containing all image paths for an object.
     */
    loadImages(images) {
        for (const key in images) {
            if (images.hasOwnProperty(key)) {
                const pathList = images[key];
                pathList.forEach((path) => this.setImageCache(path));
            }
        }
    }

    /**
     * Set an image in the cache based on the provided path.
     * @param {string} path - The path of the image to be cached.
     */
    setImageCache(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    /**
    * Change the current image based on the provided animation array.
    * @param {string[]} animationArr - An array of image paths for the animation sequence.
     */
    changeImg(animationArr) {
        let i = this.actImage % animationArr.length; //Modulo (%) ist der Rest der beim Teil sich ergibt
        let path = animationArr[i];
        this.img = this.imageCache[path];
        this.actImage++;
    }

    /**
    * Set the current image using the cached image associated with the given path.
    * @param {string} path - The path of the image to set.
     */
    setImg(path) {
        this.img = this.imageCache[path];
    }

    /**
    * Draw the current image on the provided canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the image.
    */
    drawImage(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
    * Draw the collision area for the object on the provided canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the collision area.
    */
    drawCollisionArea(ctx) {
        if (this.instanceofObjects()) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect((this.x + this.collOffset.x), (this.y + this.collOffset.y), (this.width + this.collOffset.width), (this.height + this.collOffset.height));
            ctx.stroke();
        }
    }

    /**
    * Check if the current instance belongs to specific object classes.
    * @returns {boolean} - True if the instance is of Character, Coin, Poison, Jally, Puffer, or Boss; otherwise, false.
    */
    instanceofObjects() {
        return (this instanceof Character || this instanceof Coin || this instanceof Poison || this instanceof Jally || this instanceof Puffer || this instanceof Boss);
    }

}
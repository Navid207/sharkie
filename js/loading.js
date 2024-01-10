/**
 * Checks the loading state of images in the world.
 * If all images are loaded, updates the loading state.
 */
function checkLoadingState() {
    if (!world) return
    if (!world.allImgsLoaded) {
        let allImgs = setAllImgs();
        incAllLoadedImgs();
        setProgress(allImgs);
        if (world.loadedImgs >= allImgs) {
            setAllImgsLoaded();
        }
    }
}

/**
 * Updates the progress width based on the loaded images and maximum image count.
 * @param {number} maxImg - The maximum number of images to set progress against.
 */
function setProgress(maxImg) {
    if (world.loadedImgs >= maxImg) setProgressWidth(100)
    else setProgressWidth(maxImg / 100 * world.loadedImgs)
}

/**
 * Sets the width of the progress element based on the specified percentage.
 * @param {number} perc - The percentage value to set as the width.
 * @returns {string} - The resulting width value as a CSS string.
 */
function setProgressWidth(perc) {
    return document.getElementById('progress').style.width = perc + '%';
}

/**
 * Updates the loading state and performs additional actions when all images are loaded.
 */
function setAllImgsLoaded() {
    world.allImgsLoaded = true;
    world.loadedImgs = 0;
    document.getElementById('loading').classList.add('d-none');
    if (world.level) startPufferMovements();
}

/**
 * Initiates movement animations for Puffer enemies in the current level.
 */
function startPufferMovements() {
    world.level.enemys.forEach(e => {
        if (e instanceof Puffer) {
            e.animate();
            e.swimLeft();
        }
    });
}

/**
 * Determines the total number of images to be loaded based on the game state.
 * @returns {number} - The total number of images.
 */
function setAllImgs() {
    if (world.stopGame) return 122
    else return world.level.imgs
}

/**
 * Increments the loaded image count for various game elements.
 */
function incAllLoadedImgs() {
    incLoadedImgs(world.character);
    incLoadedImgs(world.statusbar);
    incLoadedImgs(world.backgrounds);
    if (world.level) {
        incLoadedImgs(world.level.enemys);
        incLoadedImgs(world.level.statusbar);
        incLoadedImgs(world.level.coins);
        incLoadedImgs(world.level.poison);
    }
}

/**
 * Increments the loaded image count based on the saved image counts of the specified object or array of objects.
 * @param {Object|Array} object - The object or array of objects containing saved image counts.
 */
function incLoadedImgs(object) {
    let imgs = 0;
    if (object) {
        if (!object.length) imgs = object.savedImg
        else {
            for (let i = 0; i < object.length; i++) {
                const obj = object[i];
                if (obj.savedImg) imgs += obj.savedImg;
            }
        }
        if (imgs > 0) world.loadedImgs += imgs;
    }
}
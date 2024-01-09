function checkLoadingState() {
    if (!world) return
    if (!world.allImgsLoaded) {
        let allImgs = setAllImgs();
        incAllLoadedImgs();
        if (world.loadedImgs >= allImgs) {
            setAllImgsLoaded();
        }
    }
}

function setAllImgsLoaded() {
    world.allImgsLoaded = true;
    world.loadedImgs = 0;
    document.getElementById('loading').classList.add('d-none');
    if (world.level) startPufferMovements();
}

function startPufferMovements() {
    world.level.enemys.forEach(e => {
        if (e instanceof Puffer) {
            e.animate();
            e.swimLeft();
        }
    });
}

function setAllImgs() {
    if (world.stopGame) return 122
    else return world.level.imgs
}

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
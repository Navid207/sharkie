class World {
    character = new Character;
    level;
    damageTyp;
    statusbar = [
        new LifeStatusbar,
        new CoinStatusbar,
        new PoisonStatusbar
    ];
    gameStatus = new GameStatus;
    bubbles = [];
    canvas;
    ctx;
    keyboard;
    view_x = 0;
    mute;
    gameIsOver = false;
    stopGame = true;
    sounds = {
        background: new Audio('audio/background.mp3'),
    }
    backgrounds = [
        new Background('img/3_Background/Layers/Water/D.png', 0),
        new Background('img/3_Background/Layers/Background2/D.png', 300),
        new Background('img/3_Background/Layers/Background1/D.png', -200),
        new Background('img/3_Background/Layers/Light/COMPLETO.png', 200),
        new Background('img/3_Background/Layers/Floor/D.png', -300)
    ];


    constructor(canvas, keyboard, mute) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.mute = mute;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.checkSound(mute);
    }

    /**
     * a loop function to draw the canvas , as often the GPU allows
     */
    draw() {
        if (!this.stopGame && this.level.enemys) this.DrawGameLoop();
        else this.DrawHomeScreen();
        // Um immer sich selbs zu starten so offt wie die Grafikkarte es hergibt
        let self = this;
        requestAnimationFrame(() => self.draw())
    }

    // Draw Section------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * draw the game Scree and moving the view of the canvas.
     */
    DrawGameLoop() {
        this.update();
        this.ctx.translate(this.view_x, 0);
        this.drawObjects();
        this.ctx.translate(-this.view_x, 0);
    }

    /**
     * a summary of all objects intended to be drawn on the canvass
     */
    drawObjects() {
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.statusbar);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.enemys);
        this.addToMap(this.character);
        this.addObjectsToMap(this.bubbles);
        this.setGameStatus();
    }

    /**
     * add objects from an array to the "map"
     * 
     * @param {ARRAY of Objects} objects 
     */
    addObjectsToMap(objects) {
        if (objects) objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * draw an object in the correct direction on the "map" (canvas).
     * 
     * @param {Object} object - Object which should be added to the "map" (canvas). 
     */
    addToMap(object) {
        if (object.imgCahangeDirection) this.flipImg(object);
        object.drawImage(this.ctx);
        if (object.imgCahangeDirection) this.flipImgBack(object);
        // object.drawCollisionArea(this.ctx)       // mark a frame for the collision area
    }

    /**
     * function to mirror the image
     * 
     * @param {Object} object - image to be mirrored
     */
    flipImg(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * function to flip the image back 
     * 
     * @param {Object} object - image to be flipped back
     */
    flipImgBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * draw the Home Screen
     */
    DrawHomeScreen() {
        this.addObjectsToMap(this.backgrounds);
    }

    // Sound Section------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * function to check if the game was muted before it starts
     * @param {Boolean} mute - mute state
     */
    checkSound(mute) {
        mute ? this.muteAllObjects() : this.unMuteAllObjects();
    }

    /**
     * summary of all audio elements for muting
     */
    muteAllObjects() {
        this.muteObjects(this.character.sounds);
        this.muteObjects(this.sounds);
        this.muteObjects(this.gameStatus.sounds);
        if (this.level) this.level.enemys.forEach(e => this.muteObjects(e.sounds));
        if (this.statusbar) this.statusbar.forEach(e => this.muteObjects(e.sounds));
    }

    /**
     * mute object
     * @param {JSON of Audio} obj 
     */
    muteObjects(obj) {
        Object.values(obj).forEach(obj => obj.muted = true)
    }

    /**
     * summary of all audio elements for unmuting
     */
    unMuteAllObjects() {
        this.unMuteObjects(this.character.sounds);
        this.unMuteObjects(this.sounds);
        this.unMuteObjects(this.gameStatus.sounds);
        if (this.level) this.level.enemys.forEach(e => this.unMuteObjects(e.sounds));
        if (this.statusbar) this.statusbar.forEach(e => this.unMuteObjects(e.sounds));
    }

    /**
     * unmute object
     * @param {JSON of Audio} obj 
     */
    unMuteObjects(obj) {
        Object.values(obj).forEach(obj => obj.muted = false)
    }

    // Update Logic------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * summary of functions for the game loop
     */
    update() {
        this.moveView();
        this.setUsedVar();
        this.checkCollisions();
        this.characterState();
        this.upadteStatusbar();
    }

    /**
     * move the view position with the character
     */
    moveView() {
        if (this.view_x > -880) {
            this.view_x = (this.character.x < 50) ? 0 : -(this.character.x - 50);
            this.view_x = Math.max(this.view_x, -880);
        }
    }

    /**
     * set variables which required in other objects 
     */
    setUsedVar() {
        this.character.keyboard = this.keyboard;
        this.character.xMax = this.level.endPos;
        this.varForBoss();
    }

    /**
    * set variables which required for the boss
    */
    varForBoss() {
        this.level.enemys.forEach(e => {
            if (e instanceof Boss) {
                e.view_x = this.view_x;
                e.showPos = this.level.bossPos;
                e.targetPosX = this.characterCenterX();
                e.targetPosY = this.characterCenterY();
            }
        });
    }
    /**
     * 
     * @returns the center position of x-achse the image
     */
    characterCenterX() {
        return this.character.x + this.character.collOffset.x + ((this.character.width + this.character.collOffset.width) / 2)
    }
    /**
     * 
     * @returns the center position of y-achse the image
     */
    characterCenterY() {
        return this.character.y + this.character.collOffset.y + ((this.character.height + this.character.collOffset.height) / 2)
    }

    /**
     * summary of collision detections for all relevant objects 
     */
    checkCollisions() {
        this.collisionCharacter();
        this.collisionEnemys();
        this.collecting();
        this.bubbleState();
    }


    collisionCharacter() {
        for (const enemy of this.level.enemys) {
            if (this.attackToCharacterPossible(enemy)) return this.attackCharacter(enemy);
        }
        this.damageTyp = 0;
    }
    attackToCharacterPossible(e) {
        return (this.character.isColliding(e) && e.damageSatae == 0 && !(this.character.oldState == 5 && this.character.actImage >= 2))
    }
    attackCharacter(enemy) {
        this.damageTyp = enemy.damageTyp;
        if (enemy.damageSatae === 0) {
            setTimeout(() => enemy.damageSatae = 1, 500);
        }
    }

    collisionEnemys() {
        for (let i = 0; i < this.level.enemys.length; i++) {
            if (this.attackToEnemyPossible(i)) this.attackEnemy(i)
        }
    }
    attackToEnemyPossible(i) {
        return (this.level.enemys[i].isColliding(this.character) & !this.level.enemys[i].hurt);
    }
    attackEnemy(i) {
        this.level.enemys[i].HP = this.level.enemys[i].HP - 20;
        this.level.enemys[i].hurt = true;
    }

    collecting() {
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) this.collectingCoin(i);
        }
        for (let i = 0; i < this.level.poison.length; i++) {
            if (this.character.isColliding(this.level.poison[i])) this.collectingPoison(i);
        }
    }
    collectingCoin(pos) {
        this.gameStatus.collectedCoins += 1;
        this.level.coins.splice(pos, 1);
    }
    collectingPoison(pos) {
        this.gameStatus.collectedPoison += 1;
        this.level.poison.splice(pos, 1);
    }


    bubbleState() {
        if (this.bubbles.length > 0) {
            if (this.bubbles[0].atEndPos) this.bubbles.splice(0, 1);
            else if (this.attacktoBossPossible()) this.attackBoss()
        }
    }
    attacktoBossPossible() {
        return (this.level.enemys[(this.level.enemys.length - 1)].isColliding(this.bubbles[0]));
    }
    attackBoss() {
        this.level.enemys[(this.level.enemys.length - 1)].HP = this.level.enemys[(this.level.enemys.length - 1)].HP - 20;
        this.level.enemys[(this.level.enemys.length - 1)].hurt = true;
        this.bubbles.splice(0, 1);
    }

    addBubble() {
        if (this.isBubbleBuilded()) this.addBubbleToMap();
    }
    isBubbleBuilded() {
        return (this.character.actImage == 8 && this.character.oldState == 6 && this.bubbles.length < 1);
    }
    addBubbleToMap() {
        this.bubbles.push(new Bubble(this.character.x, this.character.y, this.character.imgCahangeDirection));
        this.gameStatus.collectedPoison -= 1;
    }

    upadteStatusbar() {
        this.statusbar.forEach(e => e.x = (-1 * this.view_x));
        this.statusbar[0].setLife(this.character.HP);
        this.statusbar[1].setCoin(this.gameStatus.collectedCoins);
        this.statusbar[2].setPoisonBubbl(this.gameStatus.collectedPoison);
    }

    setGameStatus() {
        if (this.character.isDead()) return this.gameOver();
        if (this.level.enemys.some(e => e instanceof Boss && e.isDead())) return this.youWin();
        return this.playBgAudio();
    }

    gameOver() {
        if (this.gameIsOver) this.setGameIsOver();
        else setTimeout(() => this.delayGameIsOver(), 1500);
    }
    setGameIsOver() {
        this.gameStatus.setGameState(1);
        this.gameStatus.x = -1 * this.view_x + 115;
        this.addToMap(this.gameStatus);
    }
    delayGameIsOver() {
        this.gameIsOver = true;
        this.tryAgain();
        this.stopBgAudio();
        this.gameStatus.sounds.gameOver.play();
    }

    youWin() {
        if (this.gameIsOver) this.setYouWin();
        else setTimeout(() => this.delayYouWin(), 1500)
    }
    setYouWin() {
        this.gameStatus.setGameState(2);
        this.gameStatus.x = -1 * this.view_x;
        this.addToMap(this.gameStatus);
    }
    delayYouWin() {
        this.gameIsOver = true;
        this.tryAgain();
        this.stopBgAudio();
        this.gameStatus.sounds.winn.play();
    }

    tryAgain() {
        document.getElementById('butTryAgain').classList.remove('d-none');
        document.getElementById('');
    }

    playBgAudio() {
        if (this.level.bgSound.currentTime == 0 || this.level.bgSound.currentTime >= 16.05) {
            this.level.bgSound.currentTime = 0;
            this.sounds.background.play();
        }
    }

    stopBgAudio() {
        return this.sounds.background.pause();
    }

    // Character States
    characterState() {
        if (this.character.activState >= 100) return
        if (this.stateElectricDamage()) return this.character.activState = 8;
        if (this.statePoisonDamage()) return this.character.activState = 7;
        if (this.stateBubbleAttack()) {
            this.addBubble();
            this.character.activState = 6;
            return;
        }
        if (this.stateFinAttack()) return this.character.activState = 5;
        if (this.stateSwimm()) return this.character.activState = 4;
        if (this.stateSleeping()) return this.character.activState = 3;
        if (this.stateFallingSleeping()) return this.character.activState = 2;
        if (this.stateLongIdle()) return this.character.activState = 1;
        this.character.activState = 0;
    }

    stateElectricDamage() {
        return this.damageTyp === 2 && (!(this.character.actImage >= 8 && this.character.activState == 8))
    }
    statePoisonDamage() {
        return this.damageTyp === 1 && (!(this.character.actImage >= 8 && this.character.oldState == 7))
    }
    stateBubbleAttack() {
        return (this.keyboard.B && this.gameStatus.collectedPoison > 0) || (this.character.activState == 6 && this.character.actImage <= 8)
    }
    stateFinAttack() {
        return ((this.keyboard.SPACE && (this.character.oldState != 5)) || (this.character.activState == 5 && this.character.actImage <= 8))
    }
    stateSwimm() {
        return (this.keyboard.DOWN || this.keyboard.UP || this.keyboard.LEFT || this.keyboard.RIGHT)
    }
    stateSleeping() {
        return (this.character.activState == 2 && this.character.y >= 260) || (this.character.activState == 3)
    }
    stateFallingSleeping() {
        return (this.character.oldState == 1 && this.character.actImage >= 42) || (this.character.activState == 2)
    }
    stateLongIdle() {
        return (this.character.oldState == 0 && this.character.actImage >= 50) || (this.character.activState == 1 && this.character.actImage <= 42)
    }

}
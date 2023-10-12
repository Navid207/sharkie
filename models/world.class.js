class World {
    character = new Character;
    level;
    damageTyp;
    statusbar = [
        new LifeStatusbar,
        new CoinStatusbar,
        new PoisonStatusbar];
    gameStatus = new GameStatus;
    bubbles = [];
    canvas;
    ctx;
    keyboard;
    view_x = 0;
    mute;
    gameIsOver = false;
    stopGame = true;
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

    addToMap(object) {
        if (object.imgCahangeDirection) this.flipImg(object);
        object.drawImage(this.ctx);
        if (object.imgCahangeDirection) this.flipImgBack(object);
        // object.drawCollisionArea(this.ctx)
    }

    addObjectsToMap(objects) {
        if (objects) objects.forEach(o => {
            this.addToMap(o);
        })
    }

    draw() {
        if (!this.stopGame && this.level.enemys) this.DrawGameLoop();
        else this.DrawHomeScreen();
        // Um immer sich selbs zu starten so offt wie die Grafikkarte es hergibt
        let self = this;
        requestAnimationFrame(() => self.draw())
    }

    DrawGameLoop() {
        this.update();
        this.ctx.translate(this.view_x, 0);
        this.drawObjects();
        this.ctx.translate(-this.view_x, 0);
    }

    DrawHomeScreen() {
        this.addObjectsToMap(this.backgrounds);
    }

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

    flipImg(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    flipImgBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    checkSound(mute) {
        mute ? this.muteAllObjects() : this.unMuteAllObjects();
    }

    muteAllObjects() {
        this.muteObjects(this.character.sounds);
        if (this.level) this.level.enemys.forEach(e => this.muteObjects(e.sounds));
        if (this.statusbar) this.statusbar.forEach(e => this.muteObjects(e.sounds));
    }

    unMuteAllObjects() {
        this.unMuteObjects(this.character.sounds);
        if (this.level) this.level.enemys.forEach(e => this.unMuteObjects(e.sounds));
        if (this.statusbar) this.statusbar.forEach(e => this.unMuteObjects(e.sounds));
    }

    muteObjects(obj) {
        Object.values(obj).forEach(obj => obj.muted = true)
    }

    unMuteObjects(obj) {
        Object.values(obj).forEach(obj => obj.muted = false)
    }

    //////////// Update Logic

    update() {
        this.setUsedVar();
        this.checkCollisions();
        this.characterState();
        this.upadteStatusbar();
    }

    setUsedVar() {
        this.moveView();
        this.character.keyboard = this.keyboard;
        this.character.xMax = this.level.endPos;
        this.varForBoss();
    }

    moveView() {
        if (this.view_x > -880) {
            this.view_x = (this.character.x < 50) ? 0 : -(this.character.x - 50);
            this.view_x = Math.max(this.view_x, -880);
        }
        this.level.enemys.forEach(e => {
            if (e instanceof Boss) e.view_x = this.view_x;
        });
    }

    varForBoss() {
        this.level.enemys.forEach(e => {
            if (e instanceof Boss) {
                e.showPos = this.level.bossPos;
                e.targetPosX = this.characterCenterX();
                e.targetPosY = this.characterCenterY();
            }
        });
    }
    characterCenterX() {
        return this.character.x + this.character.collOffset.x + ((this.character.width + this.character.collOffset.width) / 2)
    }
    characterCenterY() {
        return this.character.y + this.character.collOffset.y + ((this.character.height + this.character.collOffset.height) / 2)
    }


    checkCollisions() {
        this.collisionCharacter();
        this.collisionEnemys();
        this.collecting();
        this.bubbleState();
    }

    collisionCharacter() {
        for (const enemy of this.level.enemys) {
            if (this.attackToCharacterPossible(enemy)) {
                this.attackCharacter(enemy);
                return;
            }
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
    }

    tryAgain() {
        document.getElementById('butTryAgain').classList.remove('d-none');
        document.getElementById('');
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
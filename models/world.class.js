class World {
    character = new Character;
    level = level1;
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


    constructor(canvas, keyboard, mute) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.mute = mute;
        this.ctx = canvas.getContext('2d');
        this.draw();
        debugger
        this.checkSound(mute);
    }

    setUsedVar() {
        this.moveView();
        this.character.keyboard = this.keyboard;
        this.character.xMax = this.level.endPos;
        this.level.enemys.forEach(e => {
            if (e instanceof Boss) {
                e.showPos = this.level.bossPos;
            }
        });

    }

    addToMap(object) {
        if (object.imgCahangeDirection) {
            this.flipImg(object);
        }

        object.drawImage(this.ctx);

        if (object.imgCahangeDirection) {
            this.flipImgBack(object);
        }

        //object.drawCollisionArea(this.ctx)
    }

    addObjectsToMap(objects) {
        if (objects) {
            objects.forEach(o => {
                this.addToMap(o);
            })
        }
    }

    draw() {
        if (!this.stopGame && this.level.enemys) {
            this.update();
            this.ctx.translate(this.view_x, 0);
            this.drawObjects();
            this.ctx.translate(-this.view_x, 0);
        }

        // Um immer sich selbs zu starten so offt wie die Grafikkarte es hergibt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    drawObjects() {
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.statusbar);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.enemys);
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

    checkSound(mute){
        if (mute) {
            this.muteAllObjects();
        }
        else{
            this.unMuteAllObjects();
        }
    }
    
    muteAllObjects(){
        this.muteObjects(this.character.sounds);
        if (this.level.enemys) {
            this.level.enemys.forEach(e => {
                this.muteObjects(e.sounds)
            });
        }
        if (this.statusbar) {
            this.statusbar.forEach(e => {
                this.muteObjects(e.sounds)
            });
        }
    }
    unMuteAllObjects(){
        this.unMuteObjects(this.character.sounds);
        if (this.level.enemys) {
            this.level.enemys.forEach(e => {
                this.unMuteObjects(e.sounds)
            });
        }
        if (this.statusbar) {
            this.statusbar.forEach(e => {
                this.unMuteObjects(e.sounds)
            });
        }
    }
    muteObjects(obj){
        Object.values(obj).forEach(obj => obj.muted=true)
    }
    unMuteObjects(obj){
        Object.values(obj).forEach(obj => obj.muted=false)
    }    

    //////////// Update Logic

    update() {
        this.setUsedVar();

        this.checkCollisions();
        this.characterState();
        this.upadteStatusbar();

    }

    moveView() {
        if (this.view_x > -880) {
            if (this.character.x < 50) {
                this.view_x = 0;
            } else {
                this.view_x = -(this.character.x - 50);
            }
            if (this.view_x < -880) {
                this.view_x = -880;
            }
        }
        if (this.level.enemys.length > 0) {
            this.level.enemys.forEach(e => {
                if (e instanceof Boss) {
                    e.view_x = this.view_x;
                }
            });
        }
    }

    checkCollisions() {
        this.attackToCharacter();
        this.attackToEnemy();
        this.collecting();
        this.bubbleState();
    }

    attackToCharacter() {
        for (const e of this.level.enemys) {
            if (this.character.isColliding(e) && e.damageSatae == 0 && !(this.character.activState == 5)) {
                this.damageTyp = e.damageTyp;
                if (e.damageSatae == 0) {
                    setTimeout(() => {
                        e.damageSatae = 1;
                        return;
                    }, 500)
                }
                return;
            }
        }
        this.damageTyp = 0;
    }
    attackToEnemy() {
        for (let i = 0; i < this.level.enemys.length; i++) {
            if (this.level.enemys[i].isColliding(this.character) & !this.level.enemys[i].hurt) {
                this.level.enemys[i].HP = this.level.enemys[i].HP - 20;
                this.level.enemys[i].hurt = true;
            }
        }
    }
    collecting() {
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.gameStatus.collectedCoins += 1;
                this.level.coins.splice(i, 1);
            }
        }
        for (let i = 0; i < this.level.poison.length; i++) {
            if (this.character.isColliding(this.level.poison[i])) {
                this.gameStatus.collectedPoison += 1;
                this.level.poison.splice(i, 1);
            }
        }
    }
    bubbleState() {
        if (this.bubbles.length > 0) {
            if (this.bubbles[0].atEndPos) {
                this.bubbles.splice(0, 1);
                return
            }
            if (this.level.enemys[(this.level.enemys.length - 1)].isColliding(this.bubbles[0])) {
                this.level.enemys[(this.level.enemys.length - 1)].HP = this.level.enemys[(this.level.enemys.length - 1)].HP - 20;
                this.level.enemys[(this.level.enemys.length - 1)].hurt = true;
                this.bubbles.splice(0, 1);
            }
        }
    }

    characterState() {
        if (this.character.activState >= 100) {

            return
        }
        if (this.damageTyp === 2 && (!(this.character.actImage >= 8 && this.character.activState == 8))) {
            this.character.activState = 8;
            return;
        }
        if (this.damageTyp === 1 && (!(this.character.actImage >= 8 && this.character.oldState == 7))) {
            this.character.activState = 7;
            return;
        }
        if ((this.keyboard.B && this.gameStatus.collectedPoison > 0) || (this.character.activState == 6 && this.character.actImage <= 8)) {
            this.addBubble();
            this.character.activState = 6;
            return;
        }
        if ((this.keyboard.SPACE && (this.character.oldState != 5)) || (this.character.activState == 5 && this.character.actImage <= 8)) {
            this.character.activState = 5;
            return;
        }
        if ((this.keyboard.DOWN || this.keyboard.UP || this.keyboard.LEFT || this.keyboard.RIGHT)) {
            this.character.activState = 4;
            return;
        }
        if ((this.character.activState == 2 && this.character.y >= 260) || (this.character.activState == 3)) {
            this.character.activState = 3;
            return;
        }
        if ((this.character.oldState == 1 && this.character.actImage >= 42) || (this.character.activState == 2)) {
            this.character.activState = 2;
            return;
        }
        if ((this.character.oldState == 0 && this.character.actImage >= 50) || (this.character.activState == 1 && this.character.actImage <= 42)) {
            this.character.activState = 1;
            return;
        }
        this.character.activState = 0;
    }

    addBubble() {
        if (this.character.actImage == 8 && this.character.oldState == 6 && this.bubbles.length < 1) {
            this.bubbles.push(new Bubble(this.character.x, this.character.y, this.character.imgCahangeDirection));
            this.gameStatus.collectedPoison -= 1;
        }
    }

    upadteStatusbar() {
        this.statusbar.forEach(e => {
            e.x = (-1 * this.view_x);
        });
        this.statusbar[0].setLife(this.character.HP);
        this.statusbar[1].setCoin(this.gameStatus.collectedCoins);
        this.statusbar[2].setPoisonBubbl(this.gameStatus.collectedPoison);
    }

    setGameStatus() {
        if (this.character.isDead()) {
            this.gameOver();
            return
        }
        this.level.enemys.forEach(e => {
            if (e instanceof Boss) {
                if (e.isDead()) {
                    this.youWin();
                    return
                }
            }
        });

    }

    gameOver() {
        if (this.gameIsOver) {
            this.gameStatus.setGameState(1);
            this.gameStatus.x = -1 * this.view_x + 115;
            this.addToMap(this.gameStatus);
            return
        } else {
            setTimeout(() => {
                this.gameIsOver = true;
                this.TryAgain();
                
            }, 1500)
        }
    }

    youWin() {
        if (this.gameIsOver) {
            this.gameStatus.setGameState(2);
            this.gameStatus.x = -1 * this.view_x;
            this.addToMap(this.gameStatus);;
            return
        } else {
            setTimeout(() => {
                this.gameIsOver = true;
                this.TryAgain();
            }, 1500)
        }
    }

    TryAgain(){
        document.getElementById('butTryAgain').classList.remove('d-none');
        document.getElementById('')
    }






}
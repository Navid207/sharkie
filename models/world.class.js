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
    volume;
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

    loadedImgs = 0;

    /**
     * Constructor for initializing an object with properties related to canvas, keyboard and mute functionality.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
     * @param {Keyboard} keyboard - An instance of the Keyboard class for handling input.
     * @param {boolean} mute - A flag indicating whether audio is muted.
     */
    constructor(canvas, keyboard, volume) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.volume = volume;
        this.ctx = canvas.getContext('2d');
        this.checkSound(volume);
        this.draw();
        //this.checkLoadingState();
    }

    // functions for later
    // checkLoadingState() {
    //     this.test(this.character);
    //     this.test(this.statusbar);
    //     this.test(this.level.enemys);
    //     this.test(this.level.statusbar);
    //     this.test(this.level.coins);
    //     this.test(this.level.poison);
    //     console.log(this.loadedImgs);
    //     this.loadedImgs = 0;
    // }

    // test(object) {
    //     let test = 0;
    //     if (object) {
    //         if (!object.length) {
    //             test = object.savedImg
    //         } else {
    //             for (let i = 0; i < object.length; i++) {
    //                 const obj = object[i];
    //                 if (obj.savedImg) test += obj.savedImg;
    //             }
    //         }
    //         if (test > 0) this.loadedImgs += test;
    //     }
    // }

    /**
     * Loop function to draw the canvas as often as the GPU allows.
     * Conditionally calls DrawGameLoop or DrawHomeScreen based on the game state.
     */
    draw() {
        //this.checkLoadingState();
        if (!this.stopGame && this.level.enemys) this.DrawGameLoop();
        else this.DrawHomeScreen();
        let self = this;
        requestAnimationFrame(() => self.draw())
    }

    //============ Draw Section ============

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

    //============ Sound Section ============

    /**
     * function to check if the game was muted before it starts
     * @param {Boolean} mute - mute state
     */
    checkSound(volume) {
        if (volume === 0) return this.muteAllObjects()
        if (volume === 1) return this.soundOn(0.25)
        if (volume === 2) return this.soundOn(0.8)
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
     * Turn on sound by unmuting all objects and setting the audio volume for various game objects.
     * @param {number} volume - The volume level to set for the audio elements (0.0 to 1.0).
     */
    soundOn(volume) {
        this.unMuteAllObjects();
        this.setAudioVolume(this.character.sounds, volume);
        this.setAudioVolume(this.sounds, volume);
        this.setAudioVolume(this.gameStatus.sounds, volume);
        if (this.level) this.level.enemys.forEach(e => this.setAudioVolume(e.sounds, volume));
        if (this.statusbar) this.statusbar.forEach(e => this.setAudioVolume(e.sounds, volume));
    }
    /**
     * Unmute the sounds for various game objects, including the character, game status, enemies, and status bars.
     */
    unMuteAllObjects() {
        this.unMuteObjects(this.character.sounds);
        this.unMuteObjects(this.sounds);
        this.unMuteObjects(this.gameStatus.sounds);
        if (this.level) this.level.enemys.forEach(e => this.unMuteObjects(e.sounds));
        if (this.statusbar) this.statusbar.forEach(e => this.unMuteObjects(e.sounds));
    }
    /**
     * Unmute all sounds within the provided object by setting the 'muted' property to false.
     * @param {Object} obj - The object containing sound properties to be unmuted.
     */
    unMuteObjects(obj) {
        Object.values(obj).forEach(obj => obj.muted = false)
    }
    /**
     * Set the volume for all audio elements within the provided object.
     * @param {Object} obj - The object containing audio elements to have their volume set.
     * @param {number} volume - The volume level to set for the audio elements (0.0 to 1.0).
     */
    setAudioVolume(obj, volume) {
        Object.values(obj).forEach(obj => obj.volume = volume)
    }

    //============ Update Logic ============

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
     * Summary of collision detection for all relevant objects
     * used for attacking and collecting in the game
     */
    checkCollisions() {
        this.collisionCharacter();
        this.collisionEnemys();
        this.collecting();
        this.bubbleState();
    }
    /**
     * Checks collision between the character and an enemy.
     * @returns {function} attackCharacter - Function with the parameter {@param {enemy}} representing the enemy object.
     */
    collisionCharacter() {
        for (const enemy of this.level.enemys) {
            if (this.attackToCharacterPossible(enemy)) return this.attackCharacter(enemy);
        }
        this.damageTyp = 0;
    }
    /**
    * Function to check if a collision is possible.
    * @param {enemy} enemy - Represents the enemy object.
     * @returns {boolean} true or false.
     */
    attackToCharacterPossible(e) {
        return (this.character.isColliding(e) && e.damageSatae == 0 && !(this.character.oldState == 5 && this.character.actImage >= 2))
    }
    /**
     * Set the damage type from the enemy to the character and change the damage state from the enemy to 1.
     * @param {enemy} enemy - Represents the enemy object.
     */
    attackCharacter(enemy) {
        this.damageTyp = enemy.damageTyp;
        if (enemy.damageSatae === 0) {
            setTimeout(() => enemy.damageSatae = 1, 500);
        }
    }
    /**
     * Checks collision between all enemies and a character.
     */
    collisionEnemys() {
        for (let i = 0; i < this.level.enemys.length; i++) {
            if (this.attackToEnemyPossible(i)) this.attackEnemy(i)
        }
    }
    /**
     * Function to check if an attack to the enemy is possible.
     * @param {number} i - Array position of the enemy.
     * @returns {boolean} true or false.
     */
    attackToEnemyPossible(i) {
        return (this.level.enemys[i].isColliding(this.character) & !this.level.enemys[i].hurt);
    }
    /**
     * Set the damage for the enemy.
     * @param {number} i - Array position of the enemy.
     */
    attackEnemy(i) {
        this.level.enemys[i].HP = this.level.enemys[i].HP - 20;
        this.level.enemys[i].hurt = true;
    }
    /**
     * Function to check collision between the character and a collecting object.
     */
    collecting() {
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) this.collectingCoin(i);
        }
        for (let i = 0; i < this.level.poison.length; i++) {
            if (this.character.isColliding(this.level.poison[i])) this.collectingPoison(i);
        }
    }
    /**
     * Add the coin to the game status and remove the coin from the map.
     * @param {number} pos - Position of the coin in the array.
     */
    collectingCoin(pos) {
        this.gameStatus.collectedCoins += 1;
        this.level.coins.splice(pos, 1);
    }
    /**
     * Add poison to the game status and remove it from the map.
     * @param {number} pos - Position of the posion in the array.
     */
    collectingPoison(pos) {
        this.gameStatus.collectedPoison += 1;
        this.level.poison.splice(pos, 1);
    }
    /**
     * Check the state of the bubble. 
     * If the maximum position is reached, delete the bubble from the map. 
     * If a collision with the boss is detected, activate the attackBoss function.
     */
    bubbleState() {
        if (this.bubbles.length > 0) {
            if (this.bubbles[0].atEndPos) this.bubbles.splice(0, 1);
            else if (this.attacktoBossPossible()) this.attackBoss()
        }
    }
    /**
     * Check collision between the bubble and the boss.
     * @returns {boolean} true or false.
     */
    attacktoBossPossible() {
        return (this.level.enemys[(this.level.enemys.length - 1)].isColliding(this.bubbles[0]) && (this.bubbles.length == 1 || !this.level.enemys[(this.level.enemys.length - 1)].hurt));
    }
    /**
     * Set the damage for the boss and delete the bubble from the map.
     */
    attackBoss() {
        this.level.enemys[(this.level.enemys.length - 1)].HP = this.level.enemys[(this.level.enemys.length - 1)].HP - 20;
        this.level.enemys[(this.level.enemys.length - 1)].hurt = true;
        this.bubbles.splice(0, 1);
    }
    /**
     * Function to check the state of the bubble building and add the bubble to the map.
     */
    addBubble() {
        if (this.isBubbleBuilded()) this.addBubbleToMap();
    }
    /**
     * Check if the animation of building a bubble is done.
     * @returns {boolean} true if the animation is done, false otherwise.
     */
    isBubbleBuilded() {
        return (this.character.actImage == 8 && this.character.oldState == 6 && this.bubbles.length < 1);
    }
    /**
     * Add the bubble to the map and remove one collected poison from the status.
     */
    addBubbleToMap() {
        this.bubbles.push(new Bubble(this.character.x, this.character.y, this.character.imgCahangeDirection));
        this.gameStatus.collectedPoison -= 1;
    }


    /**
     * Function to update the status bars for live state, coins state, and poison state.
     */
    upadteStatusbar() {
        this.statusbar.forEach(e => e.x = (-1 * this.view_x));
        this.statusbar[0].setLife(this.character.HP);
        this.statusbar[1].setCoin(this.gameStatus.collectedCoins);
        this.statusbar[2].setPoisonBubbl(this.gameStatus.collectedPoison);
    }


    /**
     * Check the game state.
     * @returns {function} - If the game is over, returns the functions for gameOver or youWin. Otherwise, it returns the background audio.
     */
    setGameStatus() {
        if (this.character.isDead()) return this.gameOver();
        if (this.level.enemys.some(e => e instanceof Boss && e.isDead())) return this.youWin();
        return this.playBgAudio();
    }
    /**
     * Function to add delayed game over "Game Over" to the map.
     */
    gameOver() {
        if (this.gameIsOver) this.setGameIsOver();
        else setTimeout(() => this.delayGameIsOver(), 1500);
    }
    /**
     * Add "Game Over" to the map at the right position.
     */
    setGameIsOver() {
        this.gameStatus.setGameState(1);
        this.gameStatus.x = -1 * this.view_x + 115;
        this.addToMap(this.gameStatus);
    }
    /**
    * Delayed functios when game over "Game Over".
    */
    delayGameIsOver() {
        this.gameIsOver = true;
        this.tryAgain();
        this.stopBgAudio();
        this.gameStatus.sounds.gameOver.play();
    }
    /**
     * Function to add delayed game over "You Win" to the map.
     */
    youWin() {
        if (this.gameIsOver) this.setYouWin();
        else setTimeout(() => this.delayYouWin(), 1500)
    }
    /**
     * Add "You Win" to the map at the right position.
     */
    setYouWin() {
        this.gameStatus.setGameState(2);
        this.gameStatus.x = -1 * this.view_x;
        this.addToMap(this.gameStatus);
    }
    /**
    * Delayed functios when game over "You Winn".
    */
    delayYouWin() {
        this.gameIsOver = true;
        this.tryAgain();
        this.stopBgAudio();
        this.gameStatus.sounds.winn.play();
    }
    /**
     * Make the "Try Again" button visible.
     */
    tryAgain() {
        document.getElementById('level-easy').classList.remove('d-none');
        document.getElementById('level-hard').classList.remove('d-none');
        document.getElementById('butTryAgain').classList.remove('d-none');
    }
    /**
     * Play background audio in a loop.
     */
    playBgAudio() {
        if (this.level.bgSound.currentTime == 0 || this.level.bgSound.currentTime >= 16.05) {
            this.level.bgSound.currentTime = 0;
            this.sounds.background.play();
        }
    }
    /**
     * Stop background audio.
     */
    stopBgAudio() {
        return this.sounds.background.pause();
    }



    // Character States

    /**
     * Function to set the character state.
     * @returns {number} - The active state for the character.
     */
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

    /**
     * Conditions for the electric damage state.
     * @returns {boolean} - True if the electric damage state is met, otherwise false.
     */
    stateElectricDamage() {
        return this.damageTyp === 2 && (!(this.character.actImage >= 8 && this.character.activState == 8))
    }
    /**
     * Conditions for the poison damage state.
    * @returns {boolean} - True if the poison damage state is met, otherwise false.
    */
    statePoisonDamage() {
        return this.damageTyp === 1 && (!(this.character.actImage >= 8 && this.character.oldState == 7))
    }
    /**
     * Conditions for the bubble attack state.
     * @returns {boolean} - True if the bubble attack is active, otherwise false.
     */
    stateBubbleAttack() {
        return (this.keyboard.B && this.gameStatus.collectedPoison > 0 && this.bubbles <= 0) || (this.character.activState == 6 && this.character.actImage <= 8)
    }
    /**
     * Conditions for the fin slap attack state.
     * @returns {boolean} - True if the fin slap attack is active, otherwise false.
     */
    stateFinAttack() {
        return ((this.keyboard.SPACE && (this.character.oldState != 5)) || (this.character.activState == 5 && this.character.actImage <= 8))
    }
    /**
     * Conditions for swimming state.
     * @returns {boolean} - True if the character is swimming, otherwise false.
     */
    stateSwimm() {
        return (this.keyboard.DOWN || this.keyboard.UP || this.keyboard.LEFT || this.keyboard.RIGHT)
    }
    /**
    * Conditions for sleeping state.
    * @returns {boolean} - True if the character is sleeping, otherwise false.
    */
    stateSleeping() {
        return (this.character.activState == 2 && this.character.y >= 260) || (this.character.activState == 3)
    }
    /**
     * Conditions for falling asleep state.
     * @returns {boolean} - True if the character is falling asleep, otherwise false.
     */
    stateFallingSleeping() {
        return (this.character.oldState == 1 && this.character.actImage >= 42) || (this.character.activState == 2)
    }
    /**
     * Conditions for a long idle state.
     * @returns {boolean} - True if the character is in a long idle state, otherwise false.
     */
    stateLongIdle() {
        return (this.character.oldState == 0 && this.character.actImage >= 50) || (this.character.activState == 1 && this.character.actImage <= 42)
    }
}
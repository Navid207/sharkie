class World {
    character = new Character;
    level = level1;
    damageTyp;

    canvas;
    ctx;
    keyboard;
    view_x = 0;






    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.setUsedVar();
        this.draw();
    }

    setUsedVar() {
        this.character.keyboard = this.keyboard;
        this.character.xMax = this.level.endPos;
        this.level.enemys.forEach(e => {
            if (e instanceof Boss){
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

        object.drawCollisionArea(this.ctx)



    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.ctx.translate(this.view_x, 0);

        this.addObjectsToMap(this.level.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemys);

        this.ctx.translate(-this.view_x, 0);



        // Um immer sich selbs zu starten so offt wie die Grafikkarte es hergibt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
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



    //////////// Update Logic

    update() {
        this.moveView();
        this.checkCollisions();
        this.characterState();

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
        this.level.enemys.forEach(e => {
            if (e instanceof Boss){
                e.view_x = this.view_x;
            }
        });
        // this.level.enemys[4].view_x = this.view_x;
    }

    checkCollisions() {
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

        for (let i = 0; i < this.level.enemys.length; i++) {
            
            if (this.level.enemys[i].isColliding(this.character)) {
                this.level.enemys[i].HP = 0;
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
        if (this.keyboard.B || (this.character.activState == 6 && this.character.actImage <= 8)) {
            this.character.activState = 6;
            return;
        }
        if (this.keyboard.SPACE || (this.character.activState == 5 && this.character.actImage <= 8)) {
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







}
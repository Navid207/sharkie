class PoisonStatusbar extends MovableObject {
    x = 60;
    y = 65;
    height = 50;
    width = 200;
    oldState = 0;

    sounds = {
        blub: new Audio('audio/blub.mp3'),
    }

    IMAGES = {
        POISEN: [
            'img/4_Markers/green/poisoned bubbles/0.png',
            'img/4_Markers/green/poisoned bubbles/20.png',
            'img/4_Markers/green/poisoned bubbles/40.png',
            'img/4_Markers/green/poisoned bubbles/60.png',
            'img/4_Markers/green/poisoned bubbles/80.png',
            'img/4_Markers/green/poisoned bubbles/100.png',
        ]
    }

    constructor() {
        super().loadImages(this.IMAGES);
    }

    setPoisonBubbl(POISEN) {

        switch (POISEN) {
            case (5):
                this.setImg(this.IMAGES.POISEN[5]);
                this.playAudio(5);
                break;
            case (4):
                this.setImg(this.IMAGES.POISEN[4]);
                this.playAudio(4);
                break;
            case (3):
                this.setImg(this.IMAGES.POISEN[3]);
                this.playAudio(3);
                break;
            case (2):
                this.setImg(this.IMAGES.POISEN[2]);
                this.playAudio(2);
                break;
            case (1):
                this.setImg(this.IMAGES.POISEN[1]);
                this.playAudio(1);
                break;
            case (0):
                this.setImg(this.IMAGES.POISEN[0]);
                break;
        }
    }

    playAudio(state) {
        if (state > this.oldState) {
            this.sounds.blub.currentTime = 0;
            this.sounds.blub.play();
            this.oldState = state;
        }
    }

}
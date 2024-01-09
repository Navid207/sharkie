let  level2;

function initLevel2() {
    level2 = new Level();
    level2.enemys = [
        new Puffer,
        new Puffer,
        new Puffer,
        new Puffer,
        new Puffer,
        new Jally,
        new Jally,
        new Jally,
        new Boss,
    ];
    level2.coins = [
        new Coin(5, 250),
        new Coin((1200 * Math.random()), level2.enemys[1].y),
        new Coin((1200 * Math.random()), level2.enemys[2].y),
        new Coin((1200 * Math.random()), level2.enemys[3].y),
        new Coin((1200 * Math.random()), level2.enemys[4].y),
    ];
    level2.poison = [
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
    ];

    level2.backgrounds = [
        new Background('img/3_Background/Layers/Water/D.png', 0),
        new Background('img/3_Background/Layers/Background2/D.png', 0),
        new Background('img/3_Background/Layers/Background1/D.png', 0),
        new Background('img/3_Background/Layers/Light/COMPLETO.png', 0),
        new Background('img/3_Background/Layers/Floor/D.png', 0),
    ]
    level2.endPos = 1430;
    level2.bossPos = -760;
    level2.bgSound = new Audio ('audio/background.mp3'); 

    level2.imgs = 369;

    return level2;
}


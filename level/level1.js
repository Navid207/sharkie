let level1 = new Level();

function initLevel1() {
    level1.enemys = [
        new Puffer,
        new Puffer,
        new Puffer,
        new Jally,
        new Boss,
    ];
    level1.coins = [
        new Coin(5, 250),
        new Coin((1200 * Math.random()), level1.enemys[1].y),
        new Coin((1200 * Math.random()), level1.enemys[2].y),
        new Coin((1200 * Math.random()), level1.enemys[3].y),
        new Coin((1200 * Math.random()), level1.enemys[4].y),
    ];
    level1.poison = [
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
    ];

    level1.backgrounds = [
        new Background('img/3_Background/Layers/Water/D.png', 0),
        new Background('img/3_Background/Layers/Background2/D.png', 0),
        new Background('img/3_Background/Layers/Background1/D.png', 0),
        new Background('img/3_Background/Layers/Light/COMPLETO.png', 0),
        new Background('img/3_Background/Layers/Floor/D.png', 0),
    ]

    level1.endPos = 1430;
    level1.bossPos = -760;
    level1.bgSound = new Audio ('audio/background.mp3'); 

   return level1;
}
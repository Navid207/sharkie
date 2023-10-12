let levelTest = new Level();

function initLevelTest() {
    levelTest = new Level();
    levelTest.enemys = [
        new Boss,
    ];
    levelTest.coins = [
        new Coin(5, 250),
        new Coin((1200 * Math.random()), 11),
        new Coin((1200 * Math.random()), 11),
        new Coin((1200 * Math.random()), 11),
        new Coin((1200 * Math.random()), 11),
    ];
    levelTest.poison = [
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
        new Poison((1200 * Math.random()), 420),
    ];

    levelTest.backgrounds = [
        new Background('img/3_Background/Layers/Water/D.png', 0),
        new Background('img/3_Background/Layers/Background2/D.png', 0),
        new Background('img/3_Background/Layers/Background1/D.png', 0),
        new Background('img/3_Background/Layers/Light/COMPLETO.png', 0),
        new Background('img/3_Background/Layers/Floor/D.png', 0)
    ];
    levelTest.endPos = 1430;
    levelTest.bossPos = -760;

    return levelTest;
}
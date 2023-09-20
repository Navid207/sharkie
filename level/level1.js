const level1 = new Level();
level1.enemys = [
    new Puffer,
    new Puffer,
    new Puffer,
    new Puffer,
    new Puffer,
    new Jally,
    new Boss,
];
level1.backgrounds = [
    new Background('img/3_Background/Layers/5. Water/D.png', 0),
    new Background('img/3_Background/Layers/4.Fondo 2/D.png', 0),
    new Background('img/3_Background/Layers/3.Fondo 1/D.png', 0),
    new Background('img/3_Background/Layers/1. Light/COMPLETO.png', 0),
    new Background('img/3_Background/Layers/2. Floor/D.png', 0)
];
level1.endPos = 1430;
level1.bossPos = -880;
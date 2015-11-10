var stage, w, h, loader;
var ninja, enemy1, enemy2, pizza;
var keys = {};


function init() {
	stage = new createjs.Stage("testCanvas");
  w = stage.canvas.width;
  h = stage.canvas.height;

  images = [
		{src: "ninja.png", id: "ninja"},
		{src: "MonsterARun.png", id: "enemy1"},
		{src: "MonsterARun.png", id: "enemy2"},
	];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(images, true, "img/");

  this.document.onkeydown = keydown;
  this.document.onkeyup = keyup;
}

function handleComplete() {
  var spriteSheet = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("ninja")],
    "frames": {"height": 77, "width": 50, "regX": 25, "regY": 38.5},
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {
      "run": [16, 23, "run", .25],
      "jump": [36, 39, "run", .1]
    }
  });

  ninja = new createjs.Sprite(spriteSheet, "run");
  ninja.y = 400;

  var spriteSheet2 = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("enemy1")],
    "frames": {"height": 64, "width": 64, "regX": 32, "regY": 32},
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {
      "run": [0, 9, "run", .25]
    }
  });

  enemy1 = new createjs.Sprite(spriteSheet2, "run");
  enemy1.y = 250;

  var spriteSheet3 = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("enemy2")],
    "frames": {"height": 64, "width": 64, "regX": 32, "regY": 32},
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {
      "run": [0, 9, "run", .25]
    }
  });

  enemy2 = new createjs.Sprite(spriteSheet2, "run");
  enemy2.y = 100;

  stage.addChild(ninja, enemy1, enemy2);
  stage.addEventListener("stagemousedown", ninjaJump);


  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

  function ninjaJump() {
  	ninja.gotoAndPlay("jump");
  }

  function keydown(event) {
      keys[event.keyCode] = true;
  }

  function keyup(event) {
      delete keys[event.keyCode];
  }

  function tick(event) {
  	var deltaS = event.delta / 1000;
  	var position = ninja.x + 150 * deltaS;
    var positionE1 = enemy1.x + 150 * deltaS;
    var positionE2 = enemy2.x + 150 * deltaS;

  	var ninjaW = ninja.getBounds().width * ninja.scaleX;


  if(keys[39]){ninja.x = (position >= w + ninjaW) ? -ninjaW : position}

    var e1W = enemy1.getBounds().width * enemy1.scaleX;
  	enemy1.x = (positionE1 >= w + e1W) ? -e1W : positionE1;

    var e2W = enemy2.getBounds().width * enemy2.scaleX;
    enemy2.x = (positionE2 >= w + e2W) ? -e2W : positionE2;


  	stage.update(event);
  }

var stage, w, h, loader;
var ninja, enemy1, enemy2, gameover;
var keys = {};
var activeplayer = 1;
var gamestate;

function init() {
	stage = new createjs.Stage("testCanvas");
  w = stage.canvas.width;
  h = stage.canvas.height;

  images = [
		{src: "ninja.png", id: "ninja"},
		{src: "MonsterARun.png", id: "enemy1"},
		{src: "MonsterARun.png", id: "enemy2"},
		{src: "gameover.jpg", id: "gameover"}
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
    // define two animations, run and jump
    "animations": {
      "run": [16, 23, "run", .25],
      "jump": [36, 39, "run", .1]
    }
  });
  createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
  ninja = new createjs.Sprite(spriteSheet, "run");
  ninja.y = 400;
	ninja.direction = "right";
	ninja.jumpTime = 0;


  var spriteSheet2 = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("enemy1")],
    "frames": {"height": 64, "width": 64, "regX": 32, "regY": 32},
    // define run animation
    "animations": {
      "run": [0, 9, "run", .25]
    }
  });

  enemy1 = new createjs.Sprite(spriteSheet2, "run");
  enemy1.y = 400;
	enemy1.x = 450;

  var spriteSheet3 = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("enemy2")],
    "frames": {"height": 64, "width": 64, "regX": 32, "regY": 32},
    // define run animation
    "animations": {
      "run": [0, 9, "run", .25]
    }
  });

  enemy2 = new createjs.Sprite(spriteSheet2, "run");
  enemy2.y = 100;

	// var spriteSheet4 = new createjs.SpriteSheet({
	// 	framerate: 30,
	// 	"images": [loader.getResult("gameover")],
	//
	// })

  stage.addChild(ninja, enemy1, enemy2);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

  function ninjaJump() {
		if(ninja.direction == "right"){
			ninja.gotoAndPlay("jump");
			ninja.jumpTime = 75;
		}
  	else {
  		ninja.gotoAndPlay("jump_h");
			ninja.jumpTime = 75;
  	}
  }

	function jumpMovement(){
		if (ninja.jumpTime > 37) {
			ninja.y -= 2;
		} else {
			ninja.y += 2;
		}
	}



	function gravityCheck(){
		if (ninja.jumpTime == 0) {
		}
		else if (ninja.jumpTime > 1) {
				jumpMovement();
				ninja.jumpTime--;
		} else if (ninja.direction == 'left') {
			jumpMovement();
			ninja.jumpTime--;
			ninja.gotoAndPlay('run_h');
		} else {
			jumpMovement();
			ninja.jumpTime--;
			ninja.gotoAndPlay('run');
		}
	}

  function ninjaRight(){
		ninja.x++;
		if (ninja.direction == "left" && ninja.jumpTime == 0) {
			ninja.gotoAndPlay("run");
			ninja.direction = "right";
		}

  }

  function ninjaLeft(){
    ninja.x--;
		if (ninja.direction == "right" && ninja.jumpTime == 0) {
			ninja.gotoAndPlay("run_h");
			ninja.direction = "left";
		}

  }

  function keydown(event) {
      keys[event.keyCode] = true;
  }

  function keyup(event) {
      delete keys[event.keyCode];
  }

	function gameOverMan() {
		if(activeplayer == 0){
			//display game over screen
		  stage = new createjs.Stage("testCanvas");
			var goimage = new createjs.Bitmap(loader.getResult("gameover"));
			stage.addChild(goimage);
		}
	}

	function detectCollison() {
		if (Math.abs(ninja.x - enemy1.x) <= 15){
			if (Math.abs(ninja.y - enemy1.y) <= 50){
					console.log('Collision');
					gameOverMan();
			}
		}
	}

	function changePlayer(){
		activeplayer = 0;
	}

  function tick(event) {
  	var deltaS = event.delta / 1000;
  	var position = ninja.x;
    var positionE1 = enemy1.x;
    var positionE2 = enemy2.x + 150 * deltaS;

  	var ninjaW = ninja.getBounds().width * ninja.scaleX;


    if(keys[39]){ninjaRight();}
    if(keys[37]){ninjaLeft();}
    if(keys[38]){if (ninja.jumpTime == 0) {ninjaJump();}}

  	enemy1.x--;
    var e2W = enemy2.getBounds().width * enemy2.scaleX;
    enemy2.x = (positionE2 >= w + e2W) ? -e2W : positionE2;

		gravityCheck();
		detectCollison();
  	stage.update(event);
  }

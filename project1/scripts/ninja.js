var stage, w, h, loader, level;
var ninja, gameover, treasure, bg, block;
var keys = {};
var activeplayer = 1;
var enemies =  [];
var floorplan = [];

var level = 1;

/*
Util functions
*/

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetAll(){
	activeplayer = 1;
	enemies = [];
	level = 1;
}


function init() {
	stage = new createjs.Stage("testCanvas");
  w = stage.canvas.width;
  h = stage.canvas.height;

  images = [
		{src: "ninja.png", id: "ninja"},
		{src: "MonsterARun.png", id: "enemy1"},
		{src: "gameover.jpg", id: "gameover"},
		{src: "player2.png", id:"player2"},
		{src: "chest.png", id:"chest"},
    {src: "ladder.png", id:"ladder"},
    {src: "floor.png", id:"floor"},
    {src: "brick.png", id:"brick"},
    {src: "1.txt", id:"level1"},
    {src: "2.txt", id:"level2"},
    {src: "3.txt", id:"level3"}
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
    "frames": {"height": 77, "width": 50, "regX": 25, "regY": 77},
    // define two animations, run and jump
    "animations": {
      "run": [16, 23, "run", .25],
      "jump": [36, 39, "run", .1]
    }
  });
  createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
  ninja = new createjs.Sprite(spriteSheet, "run");
  ninja.y = 16;
  ninja.x = 5;
  ninja.falling = false;
	ninja.direction = "right";
	ninja.jumpTime = 0;

  treasure = new asset('chest', 32, 80, 600, 100);
	// enemies = [];
	// for (var i = 0; i < level; i++){
	// var newEnemy = new enemy();
	// newEnemy.x = getRandomIntInclusive(100,w);
	// enemies.push(newEnemy);
	// }
  bg = new createjs.Shape();
  bg.graphics.beginBitmapFill(loader.getResult("brick")).drawRect(0, 0, w, h);
  stage.addChild(bg);
  newLevel();
	stage.addChild(treasure);
  stage.addChild(ninja);
	for (var i in enemies) {
		stage.addChild(enemies[i]);
	}

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

function enemy() {
var spriteSheet2 = new createjs.SpriteSheet({
	framerate: 30,
	"images": [loader.getResult("enemy1")],
	"frames": {"height": 64, "width": 64, "regX": 32, "regY": 32},
	// define run animation
	"animations": {
		"run": [0, 9, "run", .25]
	}
});
createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet2, true, false, false);
var sprite = new createjs.Sprite(spriteSheet2, "run");
sprite.direction = "left";
return sprite;
}

function hero(){
  var spriteSheet = new createjs.SpriteSheet({
    framerate: 30,
    "images": [loader.getResult("ninja")],
    "frames": {"height": 77, "width": 50, "regX": 25, "regY": 77},
    // define two animations, run and jump
    "animations": {
      "run": [16, 23, "run", .25],
      "jump": [36, 39, "run", .1]
    }
  });
  createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
  ninja = new createjs.Sprite(spriteSheet, "run");
  ninja.y = 16;
  ninja.x = 5;
  ninja.falling = false;
  ninja.direction = "right";
  ninja.jumpTime = 0;
}

function asset(assetType, assetHeight, assetWidth, assetX, assetY){
  var spriteSheetT = new createjs.SpriteSheet({
    framerate:30,
    "images": [loader.getResult(assetType)],
    "frames": {"height" : assetHeight, "width": assetWidth, "regX": assetWidth/2 , "regY": 0},
    "animations": {
      "idle": [0, 0, "idle", 1]
    }
  });
  var result = new createjs.Sprite(spriteSheetT, "idle");
  result.y = assetY;
  result.x = assetX;
  return result;
}

function newLevel(lvlname){
  switch (level) {
    case 1:
    createLevel('img/1.txt');
      break;
    case 2:
    createLevel('img/2.txt');
      break;
    case 3:
    createLevel('img/3.txt');
      break;
    default:
    createLevel(lvlname);
  }
}

function createLevel(lvlname){
  var wc = 1;
  var hc = 1;
  floorplan = [];
  enemies = [];
  $.get(lvlname, function(data) {
    var txtout = data;
    for (var i in txtout) {
      if (txtout[i] == '.'){
        block = new asset('floor', 16, 32, wc*32 - 16, (hc*128));
        stage.addChild(block);
        wc++;
        floorplan.push(block);
      } else if (txtout[i] == ',') {
        hc++;
        wc = 1;
      } else if (txtout[i] == '~') {
        block = new asset('ladder', 128, 64, wc*32 - 16, (hc*128));
        stage.addChild(block);
        floorplan.push(block);
        wc++;
      } else if (txtout[i] == '|') {
        wc++;
      } else if (txtout[i] == 'z'){
        var zombie = new enemy();
        zombie.x = wc*32 -16;
        zombie.y = hc*128 -32;
        enemies.push(zombie);
        stage.addChild(zombie);
        block = new asset('floor', 16, 32, wc*32 - 16, (hc*128));
        stage.addChild(block);
        wc++;
        floorplan.push(block);
        // console.log("zombie");
      }
    }
  });
}

  function ninjaJump() {
		if(ninja.direction == "right"){
			ninja.gotoAndPlay("jump");
			ninja.jumpTime = 76;
		}
  	else {
  		ninja.gotoAndPlay("jump_h");
			ninja.jumpTime = 76;
  	}
  }

	function jumpMovement(){
		if (ninja.jumpTime > 38) {
			ninja.y -= 2;
		} else {
			ninja.y += 2;
		}
	}

  function ninjaFall(){
    var grounded = 0;
    ninja.falling = false;
    for (var i = 0; i < floorplan.length; i++) {
      if ((Math.abs(ninja.x - floorplan[i].x) <= 24) && (Math.abs(ninja.y - floorplan[i].y) <= 1)) {
        grounded += 1;
      }
    }
    if(grounded == 0){
      ninja.y +=2;
      ninja.falling = true;
    }

  }


	function gravityCheck(){

		if (ninja.jumpTime == 0) {
      ninjaFall();
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

	function enemyMovement(){
		for (var i in enemies) {
					if (enemies[i].x < 32 && enemies[i].direction == 'left') {
						enemies[i].x++;
						enemies[i].direction = 'right';
						enemies[i].gotoAndPlay('run_h');
					} else if (enemies[i].x > w - 32 && enemies[i].direction == 'right') {
						enemies[i].x--;
						enemies[i].gotoAndPlay('run');
						enemies[i].direction = 'left';
					} else if (enemies[i].direction == 'left'){
						enemies[i].x--;
					} else {
						enemies[i].x++;
					}
		}
	}

  function keydown(event) {
      keys[event.keyCode] = true;
  }

  function keyup(event) {
      delete keys[event.keyCode];
  }

	function keyInput(){
		if(keys[39]){ninjaRight();}
		if(keys[37]){ninjaLeft();}
		if(keys[38]){if (ninja.jumpTime == 0 && ninja.falling == false) {ninjaJump();}}
	}

/*
Collision detection and game condition functions are all below
detectCollison() checks for a collision between the ninja object and enemy objects
by calculating the absolute value of the difference between their x and y coordinates
if the values are both lower than a certain pixel threshold, a collision is triggered
which stops the ticker (animation engine) then calls the gameOverMan method
*/
	function detectCollison() {
		if (Math.abs(ninja.x - treasure.x) <= 5){
			if(Math.abs(ninja.y - treasure.y) <= 30){
				createjs.Ticker.removeAllEventListeners();
				nextLevel();
			}
		} else {
			for (var i = 0; i < enemies.length; i++) {
				if (Math.abs(ninja.x - enemies[i].x) <= 15){
					if (Math.abs(ninja.y - enemies[i].y) <= 50){
							createjs.Ticker.removeAllEventListeners(); //stop the ticker
							gameOverMan();
					}
				}
			}
		}

	}
 /*
 gameOverMan is a function which checks the active player variable to see which player is playing,
 if it's player 1, it removes all the objects on the canvas and calls the nextPlayer method.  If player 2
 is playing, it loads the game over screen.
 */
	function gameOverMan() {
		if (activeplayer == 1) {
			stage.removeChild(ninja);
			nextPlayer();
		} else if(activeplayer == 2){
			//display game over screen
		  stage = new createjs.Stage("testCanvas");
			var goimage = new createjs.Bitmap(loader.getResult("gameover"));
			stage.addChild(goimage);
			resetAll();
		}


	}

//resets the canvas object, loads the 2nd player ready screen, sets the active player value to 2 and calls init
	function nextPlayer(){
		stage = new createjs.Stage("testCanvas");
		var p2image = new createjs.Bitmap(loader.getResult("player2"));
		stage.addChild(p2image);
		level = 1;
		activeplayer = 2;
		window.setTimeout(init, 2000);
	}

	function nextLevel(){
		level++;
		init();
	}

	function changePlayer(){
		activeplayer = 2;
	}

/*
This is the most important function, it is basically the entire animation engine.
easel allows for the creation of a ticket event object, which basically calls this
tick function on every animation frame, so every function below gets called on every single frame
This allows me to easily handle movement, physics, and collision detection on every single frame.
*/

  function tick(event) {
		keyInput();
    detectCollison();
		enemyMovement();
		gravityCheck();
  	stage.update(event);
  }

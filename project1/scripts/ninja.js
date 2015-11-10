var stage, w, h, loader;
var ninja, enemy1, enemy2, gameover;
var keys = {};
var activeplayer = 1;
var enemies =  [];

function init() {
	stage = new createjs.Stage("testCanvas");
  w = stage.canvas.width;
  h = stage.canvas.height;

  images = [
		{src: "ninja.png", id: "ninja"},
		{src: "MonsterARun.png", id: "enemy1"},
		{src: "MonsterARun.png", id: "enemy2"},
		{src: "gameover.jpg", id: "gameover"},
		{src: "player2.png", id:"player2"}
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
	createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet2, true, false, false);
  enemy1 = new createjs.Sprite(spriteSheet2, "run");
  enemy1.y = 400;
	enemy1.x = 450;
	enemy1.direction = "left";


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
		if (ninja.jumpTime > 38) {
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

	function enemyMovement(){
		if (enemy1.x < 32 && enemy1.direction == 'left') {
			enemy1.x++;
			enemy1.direction = 'right';
			enemy1.gotoAndPlay('run_h');
		} else if (enemy1.x > 568 && enemy1.direction == 'right') {
			enemy1.x--;
			enemy1.gotoAndPlay('run');
			enemy1.direction = 'left';
		} else if (enemy1.direction == 'left'){
			enemy1.x--;
		} else {
			enemy1.x++;
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
		if(keys[38]){if (ninja.jumpTime == 0) {ninjaJump();}}
	}

/*
Collision detection and game condition functions are all below
detectCollison() checks for a collision between the ninja object and enemy objects
by calculating the absolute value of the difference between their x and y coordinates
if the values are both lower than a certain pixel threshold, a collision is triggered
which stops the ticker (animation engine) then calls the gameOverMan method
*/
	function detectCollison() {
		if (Math.abs(ninja.x - enemy1.x) <= 15){
			if (Math.abs(ninja.y - enemy1.y) <= 50){
					console.log('Collision');
					console.log(activeplayer);
					createjs.Ticker.removeAllEventListeners(); //stop the ticker
					gameOverMan();
			}
		}
	}
 /*
 gameOverMan is a function which checks the active player variable to see which player is playing,
 if it's player 1, it removes all the objects on the canvas and calls the nextPlayer method.  If player 2
 is playing, it loads the game over screen.
 */
	function gameOverMan() {
		if(activeplayer == 2){
			//display game over screen
		  stage = new createjs.Stage("testCanvas");
			var goimage = new createjs.Bitmap(loader.getResult("gameover"));
			stage.addChild(goimage);
		} else if (activeplayer == 1) {
			stage.removeChild(ninja,enemy1,enemy2);
			nextPlayer();
		}
	}

//resets the canvas object, loads the 2nd player ready screen, sets the active player value to 2 and calls init
	function nextPlayer(){
		stage.removeChild(ninja,enemy1,enemy2);
		stage = new createjs.Stage("testCanvas");
		var p2image = new createjs.Bitmap(loader.getResult("player2"));
		stage.addChild(p2image);
		activeplayer = 2;
		window.setTimeout(init, 1000);
	}

	function changePlayer(){
		activeplayer = 2;
	}

/*
This is the most important function, it is basically the entire animation engine.
easel allow for the creation of a ticket event object, which basically calls this
tick function on every animation frame, so every function below gets called on every single frame
This allows me to easily handle movement, physics, and collision detection on every single frame.
*/

  function tick(event) {
		keyInput();
		enemyMovement();
		gravityCheck();
		detectCollison();
  	stage.update(event);
  }

var stage, w, h, loader;
var ninja, enemy1, enemy2, pizza;



function init() {
	stage = new createjs.Stage("testCanvas");
  w = stage.canvas.width;
  h = stage.canvas.height;

  images = [
		{src: "ninja.png", id: "grant"},
		{src: "MonsterARun.png", id: "enemy1"},
		{src: "MonsterARun.png", id: "enemy2"},
	];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(images, true, "img/");
}

function handleComplete() {
  var spriteSheet = new createjs.spriteSheet({
    framerate: 60,
    "images": [loader.getResult("ninja")],
    "frames": {"height": 77, "width": 55},
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {
      "run": [16, 23, "run", 1],
      "jump": [44, 47, "run"]
  })

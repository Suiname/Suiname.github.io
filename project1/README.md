# Ninja Platformer Game

This game is a simple platformer I made using HTML, CSS and Javascript.  

## Instructions
The game conditions and controls are displayed in the image on the first screen once the page fully loads.  A form for the player names then moves onto the screen, input the names and hit submit and the game will begin.

## Approach
To create this game, I used the following tools:

1. a canvas HTML object.
2. a javascript library called createjs which contains easel and tween which I used to animate the canvas and DOMelements.
3. jquery for accessing dom elements quickly.

The real challenges were to figure out how to make a collision detection engine and a physics engine and how to generate levels quickly without hard coding them.  For the collison and physics engines, the easel library really helped.  Basically easel allows you to create a ticker object on your canvas, which is an object that calls a function called tick on every single frame of animation.  You can then edit the tick function and add your own code, which allowed me to run my collision detection, physics engine, and check for win conditions on every single frame much easier than if I had to write that logic from scratch.  As for the level generation, I figured out a quick way to generate the level by using a txt file and jquery.  Basically, I store a .txt file in the same directory as the image files on the web server, then call the jquery .get method to parse the file into a string, and then use that string to generate the level, where each character in string tells the level generator which block to lay down.


## Unsolved Problems

I did try to use the sound library included in createjs to add sound effects to the gameplay, however I just didn't have enough time to do so.  If I were to keep working on this that is definitely what I'd tackle next. In addition, since I only had ~3 days to complete this project, a lot of the code isn't as efficient as it could be, I'd definitely refactor it and write a lot more comments if I had more time.

## Sources
Createjs javascript library including easel and tween, which was used for all animation can be found here - http://www.createjs.com/

All art is open source and was discovered and obtained at http://opengameart.org
* Zombie animation - http://opengameart.org/content/zombie-animations
* Castle background and platforms - http://opengameart.org/content/2d-castle-platformer-starter-assets
* Treasure chest - http://opengameart.org/content/treasure-chest-2
* Ninja - http://opengameart.org/content/ninja

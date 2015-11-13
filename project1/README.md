This game is a simple platformer I made using HTML, CSS and Javascript.  To create it, I used the following tools:

1. a canvas HTML object.
2. a javascript library called createjs which contains easel and tween which I used to animate the canvas and DOMelements.
3. jquery for accessing dom elements quickly.

The real challenges were to figure out how to make a collision detection engine and a physics engine, which the easel library really helped with.  Basically easel allows you to create a ticker object on your canvas, which is an object that calls a function called tick on every single frame of animation.  You can then edit the tick function and add your own code, which allowed me to run my collision detection, physics engine, and check for win conditions on every single frame much easier than if I had to write it from scratch.

I did try to use the sound library included in createjs to add sound effects to the gameplay, however I just didn't have enough time to do so.  If I were to keep working on this that is definitely what I'd tackle next.

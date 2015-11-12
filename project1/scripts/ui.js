canvas = document.getElementById("testCanvas");
stage = new createjs.Stage(canvas);
var p1 = {};
var p2 = {};
p1.score = 1000;
p2.score = 500;
var time = 999;
var player1 = new textField('Player 1\rScore: ' + p1.score, 0, 20, 'left');
var player2 = new textField('Player 2\rScore: ' + p2.score, stage.canvas.width, 20, 'right');
var timer = new textField('Time:\r' + time, stage.canvas.width/2, 20, 'center');
stage.update(); 	//update the stage to show text
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick", tick);


function textField(datText, xCoord, yCoord, alignment){
  var messageField;
  messageField = new createjs.Text(datText, "bold 24px Arial", "#14f509");
  messageField.maxWidth = 1000;
  messageField.textAlign = alignment;
  messageField.textBaseline = "top";
  messageField.x = xCoord;
  messageField.y = yCoord;
  messageField.regX = 0;
  messageField.regY = 0;
  stage.addChild(messageField);
  return messageField;
}

function timer() {
  if (time >= 0) {
      time-= .1;
  } else {
    time = 0;
  }
  timer.text = 'Time:\r' + parseInt(time);
}

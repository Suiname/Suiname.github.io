    var canvas, stage, exportRoot;
		var container, form, fakeform;
		var rotationValue;
    var formDOMElement;
    var form;

    $(document).ready(function() {
      start();
    });

		function init() {
			canvas = document.getElementById("testCanvas");

			//DOMElement creation
			form = document.getElementById("myform");
      form.style.display = 'block';
			formDOMElement = new createjs.DOMElement(form);
			//move it's rotation center at the center of the form
			formDOMElement.regX = form.offsetWidth*0.5;
			formDOMElement.regY = form.offsetHeight*0.5;
			//move the form above the screen
			formDOMElement.x = canvas.width * 0.5;
			formDOMElement.y = - 200;

			stage = new createjs.Stage(canvas);

      formDOMElement.x = stage.canvas.width * 0.5;
			formDOMElement.y = - 200;
			//add the formDOMElement to the display list
			stage.addChild(formDOMElement);

			createjs.Ticker.setFPS(24);
			createjs.Ticker.addEventListener("tick", stage);

			//Apply a tween to the form
			createjs.Tween.get(formDOMElement).to({x:300, y:200, rotation:720},2000, createjs.Ease.cubicOut).call(tweenComplete);;
      stage.addChild(formDOMElement);
		}
		function tweenComplete(){
			stage.removeChild(formDOMElement);
		}

		//Checkbox change
		// function onCheckClick(e){
		// 	//get the checkbox element
		// 	var myCheck = e;
		// 	//create a property to stock the alpha target value for the tween
		// 	var alphaTarget;
		// 	//add the form to the display list (IE)
		// 	stage.addChild(formDOMElement);
		// 	//If the checkbox's state is checked, turn off the lights, else turn them on.
		// 	myCheck.checked == false?alphaTarget=1:alphaTarget=.2;
		// 	//remove all tweens (in case of unfinished tweens when user click on the checkbox)
		// 	Tween.removeTweens(formDOMElement);
		// 	//use the callback tweenComplete to remove the form
		// 	//from the display list (IE) when the tween is complete.
		// 	Tween.get(formDOMElement).to({alpha:alphaTarget},1000,Ease.bounceIn).call(tweenComplete);
		// }

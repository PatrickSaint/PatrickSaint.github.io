
var geometrics = []; 					// circle, triangle and cube
var warning = null;
var rotation = [
	"rotate_left 30s linear infinite",
	"rotate_right 30s linear infinite"
]

window.onload = function () {
	warning = document.getElementById('warning-message');
	warning.visibility = true;

	geometrics = document.getElementsByClassName('geometric');

	for (var i = 0; i < geometrics.length; i++) {
		// Make the DIV element draggable:
		drag(geometrics[i]);
	}

	loop();
}

function loop() {
	animate(geometrics);

	window.requestAnimationFrame(loop);
}

function toogle_warning() {
	if(warning.visibility){
		warning.style.opacity = "0%";
		warning.visibility = false;
	}
	else {
		warning.style.opacity = "100%";
		warning.visibility = true;
	}
}

function animate(array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].offsetTop >= -150){
			if (!array[i].dragging) {
				array[i].style["transition"] = "top 20s linear";
				array[i].style["top"] = array[i].offsetTop - document.body.clientHeight + "px";
			}

			else {
				array[i].style["transition"] = "top 0s linear";
			}
		}

		else {
			var direction = Math.round(Math.random() * 1);

			array[i].style["transition"] = "top 0s linear";
			array[i].style["top"] = document.body.clientHeight + 100 + "px";
			array[i].style["left"] = Math.random() * (document.body.clientWidth - 100) + "px";
			array[i].style["animation"] = rotation[direction];
		}
	}
}

function drag(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    elmnt.onmousemove = mouseOverDrag;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function mouseOverDrag(e) {
  		elmnt.style["cursor"] = "pointer";
  }

  function elementDrag(e) {
  	elmnt.dragging = true;
  	elmnt.style["cursor"] = "move";

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    var x = elmnt.offsetLeft - pos1;
    var y = elmnt.offsetTop - pos2;
    var r = 100;
    // set the element's new position:
    elmnt.style.top = numberUnder(20, y, document.body.clientHeight - r + 20) + "px";
    elmnt.style.left = numberUnder(0, x, document.body.clientWidth - r) + "px";
  }

  function closeDragElement() {
  	elmnt.dragging = false;
  	elmnt.style["cursor"] = "default";
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function numberUnder(min, number, max) {
  	if (number < min) {
  		return min;
  	}

  	if (number > max) {
  		return max;
  	}

  	return number;
  }
}

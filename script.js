var isMouseDown = false;
var isMouseOver = false;
var obj = null;
var offsetX = offsetY = null;
var zindex = 1;
var List;
var PlaceHolder;


document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;
document.onmouseover = mouseOver;
document.onmouseout = mouseOut;




function mouseOver(e) {
	obj = e.target;

	if (obj.className == "draggable") {
		isMouseOver = true;
	}
	else {
		isMouseOver = false;
		obj = null;
	}
}

function mouseOut(e) {
	isMouseOver = false;
	obj = null;
}

function mouseDown(e) {
	if (!e) {
		if (window.event) {
			e = window.event;
		}
		else {
			alert('Your browser does not support the event handler. Please upgrade or try a different browser.');
			return;
		}
	}
	if (isMouseOver) {
		isMouseDown = true;
		offsetX = e.clientX - parseInt(obj.offsetLeft);
		offsetY = e.clientY - parseInt(obj.offsetTop);
		obj.style.zIndex = 9999;
	}
}

function mouseUp() {
	isMouseDown = false;
	if (obj != null) {
		obj.style.zIndex = zindex;
		zindex++;
	}
}

function mouseMove(e) {
	if (!e) {
		if (window.event) {
			e = window.event;
		}
		else {
			alert('Your browser does not support the event handler. Please upgrade or try a different browser.');
			return;
		}
	}
if (isMouseDown && isMouseOver && obj != null) {

    
		obj.style.position = "absolute";
		obj.style.margin = "0px";
		obj.style.left = e.clientX - offsetX + "px";
		obj.style.top = e.clientY - offsetY + "px";
		obj.style.height = "32px";
		intersect(obj);
	}
}

function intersect(obj) {
    var rectA = {
        left: 10,
        top: 10,
        right: 30,
        bottom: 30
    };

    var divs = [
    { class: 'A', top: 278, left: 300 , height: 300, width: 300 }
];

    
        for (var j =0; j < divs.length; j++) {
            var I = divs[j];

            if ((I.top <= obj.style.top && (I.top + I.height) >= obj.style.top) ||
             (obj.style.top <= I.top && (obj.style.top + obj.style.height) >= I.top))
                alert(
                I.class + " collides with " + obj);
        }

}



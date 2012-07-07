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

 
function load()
 {
     List = document.getElementById("draggable");
   
  PlaceHolder = document.createElement("DIV");
  PlaceHolder.className = "draggable";
   PlaceHolder.style.backgroundColor = "rgb(225,225,225)";
   PlaceHolder.SourceI = null;
   
  new dragObject("e1", null, null, null, itemDragBegin, itemMoved, 
      itemDragEnd, false);
   new dragObject("e2", null, null, null, itemDragBegin, 
      itemMoved, itemDragEnd, false);
   new dragObject("e3", null, null, null, itemDragBegin, 
      itemMoved, itemDragEnd, false);
   new dragObject("e4", null, null, null, itemDragBegin, 
      itemMoved, itemDragEnd, false);
   new dragObject("e5", null, null, null, itemDragBegin, 
      itemMoved, itemDragEnd, false);
 }
 
 function itemDragBegin(eventObj, element)
 { 
  element.style.top = element.offsetTop + 'px';
   element.style.left = element.offsetLeft + 'px';
   element.className = "drag";
   PlaceHolder.style.height = element.style.height;
   List.insertBefore(PlaceHolder, element);
   PlaceHolder.SourceI = element;
}

function itemMoved(newPos, element, eventObj)
 {
   eventObj = eventObj ? eventObj : window.event;
   var yPos = newPos.Y + (eventObj.layerY ? eventObj.layerY : eventObj.offsetY);
 
  var temp;
   var bestItem = "end";
   for(var i=0; i<List.childNodes.length; i++)
   {
     if(List.childNodes[i].className == "list")
     {
       temp = parseInt(List.childNodes[i].style.height);
       if(temp/2 >= yPos)
       {
         bestItem = List.childNodes[i];
         break;
       }     
      yPos -= temp;
     }
   }
   
  if(bestItem == PlaceHolder || bestItem == PlaceHolder.SourceI)
     return;
   
  PlaceHolder.SourceI = bestItem;
   if(bestItem != "end")
     List.insertBefore(PlaceHolder, List.childNodes[i]);
   else
     List.appendChild(PlaceHolder);
   }
 }

 function itemDragEnd(element)
{
  if(PlaceHolder.SourceI != null)
  {
    PlaceHolder.SourceI = null;  
    List.replaceChild(element, PlaceHolder);
  }

  element.className = 'draggable';
  element.style.top = '0px';
  element.style.left = '0px';
}

function mouseOver(e) {
	obj = e.target;
	
	if(obj.className == "draggable") {
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
	if(!e) {
		if(window.event) {
			e = window.event;
		}
		else {
			alert('Your browser does not support the event handler. Please upgrade or try a different browser.');
			return;
		}
	}
	if(isMouseOver) {
		isMouseDown = true;
		offsetX = e.clientX - parseInt(obj.offsetLeft);
		offsetY = e.clientY - parseInt(obj.offsetTop);
		obj.style.zIndex = 9999;
	}
}

function mouseUp() {
	isMouseDown = false;
	if(obj != null) {
		obj.style.zIndex = zindex;
		zindex++;
	}
}

function mouseMove(e) {
	if(!e) {
		if(window.event) {
			e = window.event;
		}
		else {
			alert('Your browser does not support the event handler. Please upgrade or try a different browser.');
			return;
		}
	}
	if(isMouseDown && isMouseOver && obj != null) {
		obj.style.position = "absolute";
		obj.style.margin = "0px";
		obj.style.left = e.clientX - offsetX + "px";
		obj.style.top = e.clientY - offsetY + "px";
	}
}



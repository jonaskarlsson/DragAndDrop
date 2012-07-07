var List;
var PlaceHolder;

function load() {
    List = document.getElementById("list");

    PlaceHolder = document.createElement("DIV");
    PlaceHolder.className = "list";
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

function dragObject(element, attachElement, lowerBound, upperBound,
                    startCallback, moveCallback, endCallback, attachLater) {
    if (typeof (element) == "string")
        element = document.getElementById(element);
    if (element == null)
        return;

    if (lowerBound != null && upperBound != null) {
        var temp = lowerBound.Min(upperBound);
        upperBound = lowerBound.Max(upperBound);
        lowerBound = temp;
    }

    var cursorStartPos = null;
    var elementStartPos = null;
    var dragging = false;
    var listening = false;
    var disposed = false;

    if (typeof (attachElement) == "string")
        attachElement = document.getElementById(attachElement);
    if (attachElement == null)
        attachElement = element;

    if (!attachLater)
        this.StartListening();
}

function itemDragBegin(eventObj, element) {
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
 

 function itemDragEnd(element)
 {
   if(PlaceHolder.SourceI != null)
   {
     PlaceHolder.SourceI = null;  
     List.replaceChild(element, PlaceHolder);
   }
 
  element.className = 'list';
   element.style.top = '0px';
   element.style.left = '0px';
 }
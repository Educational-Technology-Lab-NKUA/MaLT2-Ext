// JavaScript

//initial positions
	var  mobileVer = false;
function initialPositions (){
	initialPositions = new Array ();
	var leftDiv = document.getElementById("mainCanvas");
	var element = {top:leftDiv.offsetTop, left:leftDiv.offsetLeft, width:leftDiv.offsetWidth, height:leftDiv.offsetHeight };
	initialPositions.push (element);
	element = {top: content.offsetTop, left:content.offsetLeft, width :content.offsetWidth, height: content.offsetHeight };
	initialPositions.push (element);
	element = {top: sliders.offsetTop, left:sliders.offsetLeft, width:sliders.offsetWidth, height: sliders.offsetHeight };
	initialPositions.push (element);
	element = {top: twoDVT.offsetTop, left:twoDVT.offsetLeft, width:twoDVT.offsetWidth, height: twoDVT.offsetHeight };
	initialPositions.push (element);
	element = {top: notes.offsetTop, left:notes.offsetLeft, width:notes.offsetWidth, height: notes.offsetHeight };
	initialPositions.push (element);
	tips = document.getElementById("tips");
	element = {top: tips.offsetTop, left:tips.offsetLeft, width:tips.offsetWidth, height: tips.offsetHeight };
	initialPositions.push (element);
	 if(!mobileVer)
	 resizableElemnts();
 else
	 mobileRes();
}
function initializeObjects()
		 {
		 	var style = document.getElementById("mainCanvas").style;
			$("#mainCanvas" ).width (initialPositions[0].width);
			$("#mainCanvas" ).height ( initialPositions[0].height);
			$("#mainCanvas" ).offset({top: initialPositions[0].top, left: initialPositions[0].left});
			document.getElementById("mainCanvas").style = style;
			resize_scene();
			style = document.getElementById("content").style;
			$("#content" ).width (initialPositions[1].width);
			$("#content" ).height ( initialPositions[1].height);
			$("#content" ).offset({top: initialPositions[1].top, left: initialPositions[1].left});
			document.getElementById("content").style = style;
			style = document.getElementById("sliders_outer").style;
			$("#sliders_outer" ).width (initialPositions[2].width);
			$("#sliders_outer" ).height ( initialPositions[2].height);
			$("#sliders_outer" ).offset({top: initialPositions[2].top, left: initialPositions[2].left});
			document.getElementById("sliders_outer").style = style;
			//style = document.getElementById("notes").style;
			$("#notes" ).width (initialPositions[4].width);
			$("#notes" ).height ( initialPositions[4].height);
			$("#notes" ).offset({top: initialPositions[4].top, left: initialPositions[4].left});
			//document.getElementById("notes").style = style;

			$("#twoDVT" ).offset({top: initialPositions[3].top, left: initialPositions[3].left});
			$("#tips" ).width (initialPositions[5].width);
			$("#tips" ).height ( initialPositions[5].height);
			$("#tips" ).offset({top: initialPositions[5].top, left: initialPositions[5].left});
			 }
function splitContent (){
   $('#codes').css({width: "100%", height: "93%"}).split({orientation: 'horizontal', limit :40, position: '75%' });
}
//touchControls
function touchControls () {
document.getElementById("cleanButton").addEventListener('touchstart',resetCanvas);
document.getElementById("zoomOut").addEventListener('touchstart',ZoomOut);
document.getElementById("zoomIn").addEventListener('touchstart',ZoomIn);
document.getElementById("upRot").addEventListener('touchstart',rotateUp);
document.getElementById("downRot").addEventListener('touchstart',rotateDown);
document.getElementById("leftRot").addEventListener('touchstart',rotateLeft);
document.getElementById("rightRot").addEventListener('touchstart',rotateRight);
document.getElementById("minimize").addEventListener('touchstart',minimizeTDCanvas);
document.getElementById("min").addEventListener('touchstart',minimizeNotes);
//document.getElementById("axisIcon").addEventListener('touchstart',showAxis);
//document.getElementById("runSelected").addEventListener('touchstart',takeLines);
document.getElementById("stopTurtle").addEventListener('touchstart',stop);
document.getElementById("undo").addEventListener('touchstart',undo);
}

function resizableElemnts() {
$( "#sliders_outer" ).draggable({handle: "div.grabBar", snap: true, scroll: true}).resizable({handles: "w,e,s,n",   maxWidth: window.innerWidth* 0.4, minHeight: window.innerHeight* 0.2 , minWidth: window.innerWidth* 0.15} );
$( "#twoDVT" ).draggable({handle: "div.grabBar", snap: true, scroll: true,  stop: function( event, ui ) { bRect = tdcanvas.getBoundingClientRect();}} ).resizable ({handles: "w,e" ,maxWidth: window.innerWidth* 0.4, maxWidth: window.innerWidth*0.45, minHeight: window.innerHeight* 0.3 , minWidth: window.innerWidth* 0.15, stop: function( event, ui ) { bRect = tdcanvas.getBoundingClientRect();}});
$( "#content" ).draggable({handle: "div.grabBar", snap: true, scroll: true} ).resizable ({handles: "w,s,n" ,maxWidth: window.innerWidth* 0.4, maxWidth: window.innerWidth*0.45, minHeight: window.innerHeight* 0.3 , minWidth: window.innerWidth* 0.15});
$( "#notes" ).draggable({handle: "div.grabBar", snap: true, scroll: true} ).resizable ({handles: "w,e,s,n" ,maxWidth: window.innerWidth* 0.4, maxWidth: window.innerWidth*0.45, minHeight: window.innerHeight* 0.3 , minWidth: window.innerWidth* 0.15});
$( "#objectSettings" ).draggable({handle: "div.objectSettings-header", snap: true, scroll: true} ).resizable ({handles: "w,e,s,n" ,maxWidth: window.innerWidth* 0.4, maxWidth: window.innerWidth*0.45, minHeight: window.innerHeight* 0.3 , minWidth: window.innerWidth* 0.15});

$( "#tips" ).draggable({handle: "div.grabBar", snap: true, scroll: true});
};

function mobileRes () {
	$( "#twoDVT" ).draggable({handle: "div.grabBar", snap: true, scroll: true,  stop: function( event, ui ) { bRect = tdcanvas.getBoundingClientRect();}} )
	$( "#content" ).draggable({handle: "div.grabBar", snap: true, scroll: true} )
$( "#notes" ).draggable({handle: "div.grabBar", snap: true, scroll: true} )
$( "#sliders_outer" ).draggable({handle: "div.grabBar", snap: true, scroll: true}).resizable({handles: "w,e,s,n",   maxWidth: window.innerWidth* 0.4, minHeight: window.innerHeight* 0.2 , minWidth: window.innerWidth* 0.15} );
$( "#tips" ).draggable({handle: "div.grabBar", snap: true, scroll: true} )
}

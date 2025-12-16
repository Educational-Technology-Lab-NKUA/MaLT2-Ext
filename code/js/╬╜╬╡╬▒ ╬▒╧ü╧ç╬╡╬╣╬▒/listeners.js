//event listeners etc.
import {checkTrail, init, undo, stop, axisControl, relocateCamera, resetCanvas, changePenColor, changeBGColor, changeCharacter, exportSceneObjects} from './init.js';
import {getEditor, play, clean_oldcode, changeFontSize} from './editor.js';
import {appearSaveBox} from './saveLoadFile.js';
var lastDownTarget = document;
var canvas = document.getElementById("3Dcanvas");

window.onload = function (e) {
  	init('3Dcanvas','turtle','input','oldcode', 'textOutput');
    initButtons ();
checkMobile();
	checkWindowDimensions ();
  initEventListeners();
}
function initButtons () {
  document.getElementById("runSelected").addEventListener("click", play);
  //document.getElementById("runSelected").addEventListener("mousedown", "src='icons/playClicked.png';");
  //document.getElementById("runSelected").addEventListener("mouseup", "src='icons/playClicked.png';");
  document.getElementById("stopTurtle").addEventListener("click", stop);
//  document.getElementById("stopTurtle").addEventListener("mousedown", "src='icons/stopSelected.png';");
//document.getElementById("stopTurtle").addEventListener("mouseup", "src='icons/stop.png';");
  document.getElementById("undo").addEventListener("click", undo);
  document.getElementById("cleanCode").addEventListener("click", clean_oldcode);
  document.getElementById("cleanButton").addEventListener("click", function() {  resetCanvas(1);}, false);
  document.getElementById("axisIcon").addEventListener("click", axisControl);
  document.getElementById("save").addEventListener("click", function() {  appearSaveBox(1);}, false);
  document.getElementById("saveAll").addEventListener("click", function() {  appearSaveBox(2);}, false);
  document.getElementById("fontSize").addEventListener("change", function() {  changeFontSize(this.value);}, false);
  document.getElementById("reset").addEventListener("click",  initializeObjects);
  document.getElementById("tipsButton").addEventListener("click",  appearTips);
  document.getElementById("notepad").addEventListener("click",  appearNotes);
  document.getElementById("settings").addEventListener("click",  showSettings);
  document.getElementById("export").addEventListener("click",  showExports);
  document.getElementById("bgcolor").addEventListener("change",  changeBGColor);
  document.getElementById("pencolor").addEventListener("change",  function() { changePenColor(this.value);}, false);
  document.getElementById("charSel").addEventListener("change",   function() {  changeCharacter(this.value);}, false);
    document.getElementById("exportOBJ").addEventListener("click",function() { exportSceneObjects("obj");}, false);
    document.getElementById("exportSTL").addEventListener("click",function() { exportSceneObjects("stl");}, false);
//  document.getElementById("undo").addEventListener("mousedown", "src='icons/undoSelected.png';");
//  document.getElementById("undo").addEventListener("mouseup", "icons/undo.png';");
}
function initEventListeners () {
  initialPositions ();
  var nc = document.getElementsByClassName("CodeMirror-sizer")
  	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
   canvas.addEventListener( 'touchstart', touchStartListener, false );
   	canvas.addEventListener ('contextmenu', onSceneRightClick, false);
   nc[0].addEventListener( 'touchstart', touchEditorListener, false );
   nc[0].addEventListener( 'touchmove', touchMouveEditorListener, false );
    nc[0].addEventListener( 'touchend', touchEndEditorListener, false );
}
function checkMobile (){
	var mobile = getMobileOperatingSystem();
	if ((mobile == "Android")||(mobile == "iOS")){
		adjustButtons();
	var	mobileVer = true
	}
	else mobileVer = false

}
function touchEditorListener (e) {
var	prevTouchY = e.touches[0].clientY
	//console.log ("tap on editor")
	 var cursor = editor.getCursor();
var	 startch = {line: cursor.line, ch: cursor.ch}
var		 prevPos = startch;

}
function touchMouveEditorListener (e) {
	if(e.touches[0].clientY > prevTouchY){
		//console.log ("goingDown")
		var newpos = {line: prevPos.line+2, ch: 0}
//console.log (newpos)
	 var cursor = editor.setCursor(newpos);
	 	editor.setSelection (startch,newpos);
var		prevPos = newpos
var	prevTouchY = e.touches[0].clientY }
else if (e.touches[0].clientY < prevTouchY){
	var newpos = {line: prevPos.line-1, ch: 0}

	 var cursor = editor.setCursor(newpos);
	 	editor.setSelection (startch,newpos);
		prevPos = newpos
		prevTouchY = e.touches[0].clientY

}

}
function touchEndEditorListener (e) {
	if(e.shiftKey){
		var cursor = editor.setCursor(newpos);
		editor.setSelection (startch,newpos);

	}
var	startch = null;
}
function checkLandscape(){
	if (window.innerWidth>window.innerHeight)
			return true;
		else return false;
}
function checkWindowDimensions(){
	var prev_windows_dimensions = {width: window.innerWidth, height: window.innerHeight}
	var w = window.innerWidth;
	var h = window.innerHeight;
	if (mobileVer){							//mobile
	if (is_landscape){
		 if (w < h)				//turned to normal screen
			is_landscape =  false;
		else{
		if(!is_keyboard){
		if (prev_windows_dimensions.height > h){
			$("#sliders_outer").hide()
			document.body.style.overflow = 'scroll';
			is_keyboard = true
		}

		}
		else if (prev_windows_dimensions.height < h){ 		//is keyboard
			$("#sliders_outer").show()
		is_keyboard = false;}
		}
	}
	else
		is_landscape = checkLandscape () 		//check if turned to landscape
	//if((is_landscape)&& (!is_keyboars)&& (h<350)){}

	}
	else{									//Desktop
	 if (w <520){
		$("#container").height(window.innerHeight*0.75)
		$("#content").height(window.innerHeight*0.75)
		$("#container").css({"min-width": window.innerWidth*0.9});
		$("#cameraControls").css ({"top":"70%"})
		$("#sliders_outer").offset({ left: 5, top: window.innerHeight*0.75});
		$("#sliders_outer").width (window.innerWidth);
		$("#sliders_outer").height (window.innerHeight*0.25);
		$("#slidersGrabBar").height(5);

		$("#ch").html("")
		$("#bg").html("Background")
		$("#pen").html("Pen")


	}
	else if (w <720){
		$("#sliders_outer").width (window.innerWidth*0.50);
			$("#ch").html("")
		$("#bg").html("Background")
		$("#pen").html("Pen")
		$("#container").css({"min-width": window.innerWidth});
	}
	}
	prev_windows_dimensions = {width: w, height: h}
}

function onSceneRightClick (event) {
checkObject(event.clientX,event.clientY);
}
function onDocumentMouseDown( event ) {
  lastDownTarget = event.target;
  var editor = getEditor();
if (lastDownTarget == canvas) {
  var cursor = editor.getCursor();
  editor.setOption ("readOnly", "nocursor");
  checkTrail(event.clientX,event.clientY);
}
else{
if(editor.getOption("readOnly")=="nocursor"){
editor.setOption ("readOnly", false); editor.setCursor ({line: cursor.line}); }
}
}

function touchStartListener (event) {
  event.preventDefault();
  editor.setOption ("readOnly", "nocursor");
  var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
  touchx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
  touchy = parseInt(touchobj.clientY)
  console.log (touchx,touchy);
  checkTrail(touchx,touchy);
  editor.setOption ("readOnly", false);
}
function touchMoveListener (event){
console.log ("touch move")

}
function mouseMoveListener (event){
console.log ("mouse move")

}

$(document).keydown(function(event)  {

if (event.keyCode == 67 && event.ctrlKey) {
    //stop();
      }

if (event.keyCode == 36) {
    //initializeObjects();
      }
 if (lastDownTarget == canvas)  {
//console.log ("key pressed" );
 var x = camera.position.x,
      y = camera.position.y,
      z = camera.position.z;
 var keyCode = event.which;

               if ((keyCode == 38)|| (keyCode == 87)){  //up arrow or w
                 rotateUp();
       }
               else if ((keyCode == 40)|| (keyCode == 83)){
                    camera.position.y= y * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
              camera.position.z = z * Math.cos(rotSpeed) + y * Math.sin(rotSpeed);
          if(!showGrid){
          //scene.add(turtle.helper);
          scene.add(gridXZ);
          scene.add(gridYZ);
          scene.add(gridXY);
          showGrid= true;
        }
       }
               else if ((keyCode == 37)|| (keyCode == 65)){
           camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
               camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
          if(!showGrid){
          //scene.add(turtle.helper);
          scene.add(gridXZ);
          scene.add(gridYZ);
          scene.add(gridXY);
          showGrid= true;
        }
         }
               else if ((keyCode == 39)|| (keyCode == 68)){
           camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
               camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
          if(!showGrid){
          //scene.add(turtle.helper);
          scene.add(gridXZ);
          scene.add(gridYZ);
          scene.add(gridXY);
          showGrid= true;
        }

         }
       else if ((keyCode == 107)|| (keyCode == 69))  //ZoomIn
                  {	controls.zoomIn(zoomVar);
          }

       else if ((keyCode == 109)|| (keyCode == 81))
                  {
          controls.zoomOut(zoomVar);

        }

  camera.lookAt(scene.position);
 }
//  console.log (keyCode );
});


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';

  }
  else if( userAgent.match( /Android/i ) )
  {

    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}

function showSettings () {

	$("#setDrop").toggle();
}
function showExports () {

	$("#exportDropdown").toggle();
}
function showMenu() {
	$("#myDropdown").toggle();

}
window.onclick = function(event) {
    if (event.target == objSets) {
        objSets.style.display = "none";
    }
	}

	$( function() {
    var handle = $( "#custom-handle" );
    $( "#sliderX" ).slider({
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
				updatePosX(ui.value);
      }
    });
  } );


  function appearNotes(){

  	var notes = document.getElementById("notes");
  	//	console.log (notes.style.visibility);
  	if(notes.style.visibility == "hidden"){
  		notes.style.visibility = "visible";
  		notes.style.zIndex= document.getElementById("tips").style.zIndex+1;
  	}
  	else{
  		notes.style.visibility = "hidden";
  		//notes.style.zIndex= 0;
  	}
  	}

  function appearTips(){

  	var tips = document.getElementById("tips");
  		//console.log (tips.style.visibility);
  	if(tips.style.visibility == "hidden"){
  		tips.style.visibility = "visible";
  		var notesIndex = document.getElementById("notes").style.zIndex;
  		tips.style.zIndex= notesIndex + 1;
  	}
  	else
  		tips.style.visibility = "hidden";
  		//tips.style.zIndex= 0;

  	}

  function minimizeNotes (){
  	document.getElementById("notes").style.visibility = "hidden";

  	}

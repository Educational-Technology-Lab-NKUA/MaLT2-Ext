
	$(function() {
		$( "#menu" ).menu();
	});
	$(function() {
		$( document ).tooltip();
	});

var turtle = null;
var logo = null;
var showAxis = false;
var showGrid = false;
var sceneCube;
var cameraCube;
var fromSliders =false;
var hasGrid = false;
var showPoints =false;
var tdactive = false;
var language = "Gr";
var zoom = 1.0;
var zoomO = -1.0;
var inc = -0.1;
var oldNum = 0;
var zoomVar = 1.2
var rotSpeed = .02
var canvas;
var tdcanvas;
var camera;
var controls;
var renderer;
var tdaxisY = null;
var tdaxisX = null;
var dragIndex = null;
var scene = null;
var traceCode = [];
var form;
var fromOpenFile= false;
var textOutput;
var pointLight;
var isMinimized = false;
var slidersOn = false;
var lastDownTarget = document;
var mobileVer = false;
var startch = null;
  parameters = {
    WIDTH: 700,
    HEIGHT: 600,
    SEGMENTS: 10,
    FIELD_OF_VIEW: 75,
    FRUSTUM_NEAR: 0.1,
    FRUSTUM_FAR: 1000000,
    CAMERA_DISTANCE: 200,
    TURTLE_START_POS: new THREE.Vector3(0, 0, 0),
    TURTLE_START_DIR: new THREE.Vector3(0, 1, 0),
    TURTLE_START_UP: new THREE.Vector3(0,0, 1),
    TURTLE_START_COLOR: 0xFF0000,
	TURTLE_START_COLOR_hex : "#FF0000",
	TURTLE_SELECT_COLOR:0x006600,
    TURTLE_START_WIDTH: 1.0,
    DIR_LIGHT_COLOR: 0xFFFFFF,
    DIR_LIGHT_POS: new THREE.Vector3(1, 1, 1),
    DIR_LIGHT_TARGET: new THREE.Vector3(0, 0, 0),
    AMB_LIGHT_COLOR: 0xffffcc,
    BACKGROUND_COLOR: 0xA3D1FF,
	 BACKGROUND_COLOR_hex:"#A3D1FF"

  };
function setup () {
    logo = new Logo()
	material =  new THREE.MeshLambertMaterial({
      color: parameters.TURTLE_START_COLOR,
      ambient: parameters.TURTLE_START_COLOR

    });
	init_turtle ();

}
function openInstance(){
	 var filename = window.location.href.split( '?' );
	 if (filename!=null){
		 lang = filename[1].split ('_');
		 if (lang[1]=="Gr")
		 	changeLanguage();
		 filepath = "Instances/" + filename[1] +".txt"
		 $.get(filepath, function(data) {
               parseTxt(data);
            }, "text");


		 }

	}


function init (canvas_id,turtle_id,form_id,oldcode_id,textoutput_id) {
	console.log (window.innerHeight);
	console.log (window.innerWidth);
	changeLanguage();
	checkWindowDimensions ();
    canvas = document.getElementById("3Dcanvas");
	leftDiv = document.getElementById("mainCanvas");
	content = document.getElementById("content");
	sliders = document.getElementById("sliders_outer");
	twoDVT = document.getElementById("twoDVT");
	inner_canvas = document.getElementById("inner");
	notes = document.getElementById ("notes");
	tips = document.getElementById ("tips");
	tips.style.visibility = "hidden";
	characters = document.getElementById("charSel");
	notes.style.visibility="hidden";
	init_canvas (canvas);
	splitContent();
    form = document.getElementById(form_id);
    textOutput = document.getElementById(textoutput_id);
    oldcode = document.getElementById(oldcode_id);
    setup();

	//2D variation Tool properties
	document.getElementById("twoDVT").style.visibility = "hidden";
	//colors
	document.getElementById("bgcolor").value = parameters.BACKGROUND_COLOR_hex;
	document.getElementById("pencolor").value = parameters.TURTLE_START_COLOR_hex;
	$('#aboutInfo').hide();
	var mobile = getMobileOperatingSystem();
	if ((mobile == "Android")||(mobile == "iOS")){
		adjustButtons();
		mobileVer = true
	}
	else mobileVer = false
	//Event Listeners
initialPositions ();
//touchControls  ();
var nc = document.getElementById("newcode")
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
 canvas.addEventListener( 'touchstart', touchStartListener, false );
 nc.addEventListener( 'touchstart', touchEditorListener, false );
 nc.addEventListener( 'touchmove', touchMouveEditorListener, false );
  nc.addEventListener( 'touchend', touchEndEditorListener, false );
//document.addEventListener( 'touchmove', touchMoveListener, false );
//canvas.addEventListener( 'mousemove', mouseMoveListener, false );
	//window.setTimeout(openInstance(),3000);

}
function touchEditorListener (e) {
	prevTouchY = e.touches[0].clientY
	console.log ("tap on editor")
	 var cursor = editor.getCursor();
	 startch = {line: cursor.line, ch: cursor.ch}
		 prevPos = startch;

}
function touchMouveEditorListener (e) {
	console.log (prevTouchY)
	console.log (e.touches[0].clientY )
	if(e.touches[0].clientY > prevTouchY){
		console.log ("goingDown")
		var newpos = {line: prevPos.line+2, ch: 0}

	 var cursor = editor.setCursor(newpos);
	 	editor.setSelection (startch,cursor);
		prevPos = newpos
	prevTouchY = e.touches[0].clientY }
else if (e.touches[0].clientY < prevTouchY){
	var newpos = {line: prevPos.line-1, ch: 0}

	 var cursor = editor.setCursor(newpos);
	 	editor.setSelection (startch,cursor);
		prevPos = newpos
		prevTouchY = e.touches[0].clientY

}

}
function touchEndEditorListener (e) {
	console.log ("endtouch")
	 var cursor = editor.getCursor();
	var end = {line: cursor.line, ch: cursor.ch}
	console.log (startch, end)
	if (startch!=end){
	editor.setSelection (startch,cursor);

	}
	startch = null;

}
function checkWindowDimensions(){
	var w = window.innerWidth;
	var h = window.innerHeight;

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
function init_canvas (canvas) {

    var animate, e, normalizationMatrix,  rendererParams;
    turtleGeometry = new THREE.CylinderGeometry(1, 1, 1, parameters.SEGMENTS);
    normalizationMatrix = new THREE.Matrix4();
    normalizationMatrix.rotateX(Math.PI / 2);
    normalizationMatrix.translate(new THREE.Vector3(0, -0.5, 0));
    turtleGeometry.applyMatrix(normalizationMatrix);
    rendererParams = {
      canvas: canvas,
      clearColor: parameters.BACKGROUND_COLOR,
      clearAlpha: 1
    };
	// WEBGL DETECTION

    try {window.WebGLRenderingContext;
      renderer = new THREE.WebGLRenderer(rendererParams);
    } catch (_error) {
		if (language == "Gr")
			msg = "Τα γραφικά webGl πιθανόν να είναι απενεργοποιημένα από το πρόγραμμα περιήγησης. Θα φορτωθεί μια πιο αργή έκδοση γραφικών.";
		else
			msg = " webGL graphics maybe are disabled from your browser. A slower version of graphics will be loaded.";
      if(confirm(msg)){renderer = new THREE.CanvasRenderer({canvas :canvas});
	  renderer.clear ();
	  canvas.style.backgroundColor = parameters.BACKGROUND_COLOR;}
	  else {
	  window.location= ("http://get.webgl.org/");
	    return 0;
	  }
    }

    renderer.setSize(inner_canvas.offsetWidth, inner_canvas.offsetHeight);

	offsetX = $("#3Dcanvas").offset().left;
	offsetY = $("#3Dcanvas").offset().top;
	projector = new THREE.Projector();
    camera = new THREE.PerspectiveCamera(parameters.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, parameters.FRUSTUM_NEAR, parameters.FRUSTUM_FAR);
    camera.position.set(0, 0, parameters.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    scene = new THREE.Scene();

      	animate = function() {

      controls.update();
	  camera.lookAt( scene.position );
	 // renderer.render( sceneCube, cameraCube );
       renderer.render(scene, camera);
	    requestAnimationFrame(animate);
    };




gridXZ = new THREE.GridHelper(100, 10);
material = new THREE.LineBasicMaterial({color :0xB8B8A0});
gridXZ.material = material;
gridXZ.rotation.y = Math.PI/2;
gridXZ.position.set( 100,0,100 );
//scene.add(gridXZ);

animate();
gridXY = new THREE.GridHelper(100, 10);
gridXY.position.set( 100,100,0 );
gridXY.rotation.x = Math.PI/2;
gridXY.material = material;
//scene.add(gridXY);

animate();


gridYZ = new THREE.GridHelper(100, 10);
gridYZ.position.set( 0,100,100 );
gridYZ.rotation.z = Math.PI/2;
gridYZ.material = material;
//scene.add(gridYZ);
     // add subtle ambient lighting

animate();

    return renderer.domElement;


	}


function run (code, drawbits) {

	if(!fromSliders){

    turtle.material = new THREE.MeshLambertMaterial({
      color: parameters.TURTLE_START_COLOR,

    });}
		turtle.start = true;


        var out = logo.run(code);   //Line 465
		 myVar = setInterval(function () { $("body").css("cursor", "progress");}, 1000);
		draw_graphics  (turtle);
        if (out && out.type == "error") {
            oldcode.innerHTML +="<br /> oops: "+out.data;
            logo.t = new Tokenizer();
        }

         oldcode.scrollTop = oldcode.scrollHeight;

         if (oldcode.createTextRange) {
             var range = oldcode.createTextRange();
             range.collapse(false);
             range.select();
         }

}

function stop(){
    //turtle.stop();
	resetCanvas ();
}


function runCode () {
	var code = getCode();
	run (code, false);
	}
function play (){
	var edit = editor.getSelection ();
		  if (edit=="") {
		   var cursor = editor.getCursor();
			editor.setCursor ({line: cursor.line});
			cursor = editor.getCursor ();
			var ancor = {line: cursor.line, ch: 0}
		 	editor.setSelection (ancor,cursor);
		 	edit = editor.getSelection();
			var  newLine = cursor.line+1;
		 	editor.setCursor ({line: newLine, ch:0});
		 }

 	run (edit,false);

	}


function runLine (cm){
		var cursor = editor.getCursor();
		editor.setCursor ({line: cursor.line});
		cursor = editor.getCursor ();
		var ancor = {line: cursor.line, ch: 0}

	// console.log (cursor );
		 editor.setSelection (ancor,cursor);
		 takeLines();
		var  newLine = cursor.line+1;
		 editor.setCursor ({line: newLine, ch:0});



		}
function clean_oldcode() {

		oldcode.innerHTML = ' ';

		}

function resize_scene (){

	 renderer.setSize(inner_canvas.offsetWidth, inner_canvas.offsetHeight);
	 offsetX = $("#3Dcanvas").offset().left;
	offsetY = $("#3Dcanvas").offset().top;
	projector = new THREE.Projector();
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.update();
	 if(!mobileVer)
	 resizableElemnts();
 else
	 mobileRes();
	 splitContent();
	}

function resetCanvas(option) {

	start = true
	var fromSliders=false;
   for (l=0; l< sceneObjects.length; l ++ ) {
		scene.remove (sceneObjects [l].mesh);

		}
	sceneObjects = [];
	traceCode = [];
	sliderFunctions = [];
	logo.usedFunctions = [];
		removeSliders (oldNum);
		resetTDCanvas();
		tdaxisY = null;
		tdaxisX = null;
		tdactive = false;
	if(option === 1) {			//if clearscreen reset turtle and camera, else if cleartrace do nothing i.e. leave turtle and camera at the same position
	 reset_turtle(turtle);
  camera = new THREE.PerspectiveCamera(parameters.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, parameters.FRUSTUM_NEAR, parameters.FRUSTUM_FAR);
    camera.position.set(0, 0, parameters.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.update();
	 scene.remove(turtle.helper);
	 scene.remove(gridXZ);
	 scene.remove(gridXY);
	 scene.remove(gridYZ);
		 showAxis = false;
		 showGrid = false;
 }
}

function clearGraphics () { //katharizei ta ixni, i xelona menei sti thesi tis
	 for (l=0; l< sceneObjects.length; l ++ ) {
		scene.remove (sceneObjects [l].mesh);

		}
		sceneObjects = [];
		traceCode = [];
		sliderFunctions = [];
		if(oldNum > 0)
				removeSliders (oldNum);
		logo.usedFunctions = [];
		resetTDCanvas();
		tdaxisY = null;
		tdaxisX = null;
		tdactive = false;
		fromSliders = false;
	}
function clean () {
	for (l=0; l< sceneObjects.length; l ++ ) {
			scene.remove (sceneObjects [l].mesh);
		}
		logo.usedFunctions = [];
		sceneObjects = [];
		}
function rotateUp(){
		 controls.rotateUp(0.1);
					if(!showGrid){
						//scene.add(turtle.helper);
						scene.add(gridXZ);
						scene.add(gridYZ);
						scene.add(gridXY);
						showGrid= true;
					}


		}
function rotateDown(){
		 controls.rotateDown(0.2);
					if(!showGrid){
						//scene.add(turtle.helper);
						scene.add(gridXZ);
						scene.add(gridYZ);
						scene.add(gridXY);
						showGrid= true;
					}


		}
function rotateLeft(){
		 controls.rotateLeft(0.2);
					if(!showGrid){
						//scene.add(turtle.helper);
						scene.add(gridXZ);
						scene.add(gridYZ);
						scene.add(gridXY);
						showGrid= true;
					}


		}

function rotateRight(){
		 controls.rotateRight(0.2);
					if(!showGrid){
						//scene.add(turtle.helper);
						scene.add(gridXZ);
						scene.add(gridYZ);
						scene.add(gridXY);
						showGrid= true;
					}


		}
function ZoomIn () {

	controls.zoomIn(zoomVar);

	}

function ZoomOut () {
	controls.zoomOut(zoomVar);
	}
function twoDimensions	() {
	 camera = new THREE.PerspectiveCamera(parameters.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, 		parameters.FRUSTUM_NEAR, parameters.FRUSTUM_FAR);
    camera.position.set(0, 0, parameters.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.update();
	 	scene.remove(gridXZ);
	scene.remove(gridXY);
	scene.remove(gridYZ);
		showGrid = false;
	}

function checkTrail (clickedX,clickedY) {			//checks if the user clicked on a turtle Trail
	var vector = new THREE.Vector3 ( ( (clickedX - offsetX)/ inner_canvas.offsetWidth) * 2 - 1, - (( clickedY - offsetY)/ inner_canvas.offsetHeight ) * 2 + 1, 0.5 );
				  projector.unprojectVector( vector, camera );

				  var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
				  var intersects = ray.intersectObjects(turtle.objects);
				//  console.log (intersects);
				  if ( intersects.length != 0 ) {

				  	this.id = intersects[0].object.id;
					for (i =0; i<sceneObjects.length; i++) {
						if ((sceneObjects[i].id == this.id)&& (sceneObjects[i].fName != "")){
							var fid = sceneObjects[i].fId;	//function if

							//console.log ("name of funct of selected obj: " + sceneObjects[i].fName);
							//console.log ("args of selected obj: " + sceneObjects[i].argsNames);
							//console.log ("args values of selected obj: " + sceneObjects[i].argsValues);
							if (sceneObjects[i].argsNames.length > 0){
								createSliders (sceneObjects[i]);
								}
						}
						}
  					for (i =0; i<sceneObjects.length; i++) {
					if ((sceneObjects[i].fId == fid)&&(sceneObjects[i].fName !=""))
						sceneObjects[i].mesh.material = new THREE.MeshLambertMaterial
						({color: parameters.TURTLE_SELECT_COLOR, ambient:  parameters.TURTLE_SELECT_COLOR})
					}
				  }

	}
 function onDocumentMouseDown( event ) {
	 	lastDownTarget = event.target;
		//console.log("MouseDown" )
	if (lastDownTarget == canvas) {
		cursor = editor.getCursor();
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




function undo (){
			  var newcode = "";
				 // var historyCommand = logo.usedFunctions;

					//console.log (historyCommand);
					k = logo.usedFunctions.length-1;
					//console.log  (k);
					for (i=0; i<k; i++)
					{
					newcode = newcode + " " + logo.usedFunctions[i].name;
						for(j=0; j< logo.usedFunctions[i].argsVal.length; j++) {
							newcode = newcode + " " + logo.usedFunctions[i].argsVal[j].data;

						}

					}
					clean ();
					reset_turtle(turtle);

							run (newcode,true);

			}
function changeBGColor() {
	var bgcolVal = document.getElementById("bgcolor").value.split ("#");
	var color = "0x"+bgcolVal[1]
	renderer.setClearColorHex ( color, 1);

	}
function changePenColor(pcolor) {
	var rgb= hexToRgb (pcolor);
	var colorComand = "SETPENCOLOR ["+rgb.r + " " +rgb.g + " " + rgb.b +"]"
	run (colorComand ,false);
	/*var pencol = pcolor.split ("#");
	console.log (pencol);
	var color = "0x"+pencol[1]
	defaultColor = color;
	turtle.color = new THREE.Color(defaultColor);*/


	}
	function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function axisControl ()
	{if(showAxis) {scene.remove(turtle.helper); showAxis = false; }
	 else {scene.add(turtle.helper); showAxis = true;}
	}



function changeCharacter(val) {
	change_turtle(val);
	}


function relocateCamera () {
	camera.position = new THREE.Vector3(camera.position.x, camera.position.y, parameters.CAMERA_DISTANCE).addSelf(myTurtle.position);

}

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

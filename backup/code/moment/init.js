
	$(function() {
		$( "#menu" ).menu();
	});
	$(function() {
		$( document ).tooltip();
	});
loging = true;
var rotationsStarted = false;
var notLogging = false;
var multyExecut = false;
var  keyDownEvent = false;
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
var sliderFunctions = [];
var form;

var textOutput;
var pointLight;
var isMinimized = false;
var slidersOn = false;
var lastDownTarget = null;
 cameraView = "2dview"
 cameraType = "null"

 maltParams = {
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


function init_canvas (canvas) {
	
    var animate, e, normalizationMatrix,  rendererParams;
    turtleGeometry = new THREE.CylinderGeometry(1, 1, 1, maltParams.SEGMENTS);
    normalizationMatrix = new THREE.Matrix4();
    normalizationMatrix.rotateX(Math.PI / 2);
    normalizationMatrix.translate(new THREE.Vector3(0, -0.5, 0));
    turtleGeometry.applyMatrix(normalizationMatrix);
    rendererParams = {
      canvas: canvas,
      clearColor: maltParams.BACKGROUND_COLOR,
      clearAlpha: 1
    };
	// WEBGL DETECTION
	
    try {window.WebGLRenderingContext;
      renderer = new THREE.WebGLRenderer(rendererParams);
    } catch (_error) {
		/*if (language == "Gr")
			msg = "Τα γραφικά webGl πιθανόν να είναι απενεργοποιημένα από το πρόγραμμα περιήγησης. Θα φορτωθεί μια πιο αργή έκδοση γραφικών.";
		else
			msg = " webGL graphics maybe are disabled from your browser. A slower version of graphics will be loaded.";
      if(!confirm(msg)){renderer = new THREE.CanvasRenderer({canvas :canvas});
	  renderer.clear ();
	  canvas.style.backgroundColor = maltParams.BACKGROUND_COLOR;}
	  else {
	  window.location= ("http://get.webgl.org/");
	    return 0;
	  }*/
	  renderer = new THREE.CanvasRenderer({canvas :canvas});
	  renderer.clear ();
	  canvas.style.backgroundColor = maltParams.BACKGROUND_COLOR;
    }

    renderer.setSize(inner_canvas.offsetWidth, inner_canvas.offsetHeight);
	
	offsetX = $("#3Dcanvas").offset().left;
	offsetY = $("#3Dcanvas").offset().top;
	projector = new THREE.Projector();
    camera = new THREE.PerspectiveCamera(maltParams.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, maltParams.FRUSTUM_NEAR, maltParams.FRUSTUM_FAR);
    camera.position.set(0, 0, maltParams.CAMERA_DISTANCE);
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


function run (code, drawbits, logs) {
	
	loging = logs;
	if((!fromSliders)){
	console.log ("EXECUTING : ")
	console.log (code)
    turtle.material = new THREE.MeshLambertMaterial({color: maltParams.TURTLE_SELECT_COLOR, ambient:  maltParams.TURTLE_SELECT_COLOR})	
	//console.log (logs);
	
	}
	if( (!fromSliders)&&(!fromOpenFile)) {
		if(!maltWid.activity_Started)
			maltWid.activityStarted();
		if (maltWid!=null){
			maltWid.camera_evets_counters.lastExec = 0;
			
		}
		}

	
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
	run (code, false, true);
	}
function play (){
	maltWid.send = false;
	 edit = editor.getSelection ();
		  if (edit=="") {  	//one line execution
		  console.log ("oneline");
		  multyExecut = false;	
		   var cursor = editor.getCursor();
			editor.setCursor ({line: cursor.line});
			cursor = editor.getCursor ();
			var ancor = {line: cursor.line, ch: 0}
		 	editor.setSelection (ancor,cursor);
			codeRange = {start: editor.getCursor(true), end: editor.getCursor(false)};
		 	edit = editor.getSelection();
			var  newLine = cursor.line+1;
		 	editor.setCursor ({line: newLine, ch:0});
			
		 }
		 else
			multyExecut = true;	
	codeRange = {start: editor.getCursor(true), end: editor.getCursor(false)};
 	run (edit,false, true);
	//eventManager.sendState();
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
		
		oldcode.innerHTML = '   <input id ="cleanCode" type="image" onClick="clean_oldcode();" title ="Καθαρισμός μηνυμάτων" src=".//icons/Delete_Icon.png" style="width: 7%;" />  ';
		
		}

function resize_scene (){
	
	 renderer.setSize(inner_canvas.offsetWidth, inner_canvas.offsetHeight);
	 offsetX = $("#3Dcanvas").offset().left;
	offsetY = $("#3Dcanvas").offset().top;
	projector = new THREE.Projector();
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.update();
	 resizableElemnts();
	 splitContent();
	}	

function resetCanvas() {
	
	start = true
	var fromSliders=false;
   for (l=0; l< sceneObjects.length; l ++ ) {
		scene.remove (sceneObjects [l].mesh);		
	
		}
	sceneObjects = [];
	traceCode = [];
	sliderFunctions = [];
	 reset_turtle(turtle);
  camera = new THREE.PerspectiveCamera(maltParams.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, maltParams.FRUSTUM_NEAR, maltParams.FRUSTUM_FAR);
    camera.position.set(0, 0, maltParams.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.update();
	logo.usedFunctions = [];
		
	scene.remove(turtle.helper);
	scene.remove(gridXZ);
	scene.remove(gridXY);
	scene.remove(gridYZ);
		showAxis = false;
		showGrid = false;
		removeSliders (oldNum);
		resetTDCanvas();
		tdaxisY = null;
		tdaxisX = null;
		tdactive = false;
		cameraView = "2dview"
		//var msg = '{ "action": "clear Graphics" }';
		//var obj = JSON.parse(msg);
	//eventManager.fireLogging(obj );
	
	//updateHandler(obj);
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
		cameraView = "2dview"
	}
function clean () { 			
	for (l=0; l< sceneObjects.length; l ++ ) {
			scene.remove (sceneObjects [l].mesh);
		}
		logo.usedFunctions = [];
		sceneObjects = [];		
		}		
function rotateUp(){
	cameraView = "3dview"
			if(! keyDownEvent)
				maltWid.cameraAction("rotate");
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
	cameraView = "3dview"
	if(! keyDownEvent)
				maltWid.cameraAction("rotate");
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
	cameraView = "3dview"
	if(! keyDownEvent)
				maltWid.cameraAction("rotate");
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
	cameraView = "3dview"
	if(! keyDownEvent)
				maltWid.cameraAction("rotate");
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
	if(! keyDownEvent)
				maltWid.cameraAction("zoomIn");
	controls.zoomIn(zoomVar);
	
	}
	
function ZoomOut () {
	if(! keyDownEvent)
				maltWid.cameraAction("zoomOut");
	controls.zoomOut(zoomVar);
	}	
function twoDimensions	() {
	 camera = new THREE.PerspectiveCamera(maltParams.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, 		maltParams.FRUSTUM_NEAR, maltParams.FRUSTUM_FAR);
    camera.position.set(0, 0, maltParams.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.update();
	 	scene.remove(gridXZ);
	scene.remove(gridXY);
	scene.remove(gridYZ);
	maltWid.cameraAction("2dview");
		showGrid = false;
	cameraView = "2dview";
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
							params = []; values = [];
							for (var j=0; j<sceneObjects[i].argsNames.length; j++){
								params.push (sceneObjects[i].argsNames[j].data)
								values.push (sceneObjects[i].argsValues[j].data)
							}
							if (sceneObjects[i].argsNames.length > 0){
								var clickedFunct = {proc_name:sceneObjects[i].fName, parameter_names:params , parameter_values: values} 
								var clickPosition =  {x: clickedX, y: clickedY }
								if (maltWid!=null) {
									maltWid.trackClicked (clickedFunct,clickPosition , sceneObjects[i].id );
								}
								createSliders (sceneObjects[i]);								
								}							
						}	
						}
  					for (i =0; i<sceneObjects.length; i++) {
					if ((sceneObjects[i].fId == fid)&&(sceneObjects[i].fName !=""))
						sceneObjects[i].mesh.material = new THREE.MeshLambertMaterial
						({color: maltParams.TURTLE_SELECT_COLOR, ambient:  maltParams.TURTLE_SELECT_COLOR})	
					} 				
				  }
	
	}	
 function onDocumentMouseDown( event ) {
	// console.log (event);
	 	lastDownTarget = event.target;
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

function onDocumentMouseUp (event){
	//console.log (event);
	//console.log (rotationsStarted);
	if ((lastDownTarget == canvas)&&(rotationsStarted))
	{console.log ("rotation Ends")
		rotationsStarted= false;
		maltWid.cameraAction(cameraType);
		
		}
	
	}

function touchStartListener (event) {
		editor.setOption ("readOnly", "nocursor");
		var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
 		touchx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
		touchy = parseInt(touchobj.clientY)
		checkTrail(touchx,touchy);
  		e.preventDefault();
		editor.setOption ("readOnly", false);	
	}
$(document).keyup(function(event)  {
	if (keyDownEvent){
		maltWid.cameraAction(cameraType);
		keyDownEvent = false;
		
		}
	
	
	});

$(document).keydown(function(event)  {
	
	
	 if (lastDownTarget == canvas)  {
		
	//console.log ("key pressed" );
	 var x = camera.position.x,
        y = camera.position.y,
        z = camera.position.z;
	 var keyCode = event.which;
	 			   
                 if ((keyCode == 38)|| (keyCode == 87)){  //up arrow or w
				  keyDownEvent = true;
                   rotateUp();
				   cameraType = "rotation"
				 }
                 else if ((keyCode == 40)|| (keyCode == 83)){
					  keyDownEvent = true;
                     
						rotateDown();
					
					cameraType = "rotation";
				 }
                 else if ((keyCode == 37)|| (keyCode == 65)){
					  keyDownEvent = true;
					
					rotateLeft();
					cameraType = "rotation";
					 }
                 else if ((keyCode == 39)|| (keyCode == 68)){
					  keyDownEvent = true;
						
					rotateRight();
					cameraType = "rotation";
		
					 }
				 else if ((keyCode == 107)|| (keyCode == 69))  //ZoomIn
                    {	 keyDownEvent = true;ZoomIn();
					cameraType = "zoomIn";
						}
	 
				 else if ((keyCode == 109)|| (keyCode == 81))
                    {	cameraType = "zoomOut";
						 keyDownEvent = true;ZoomOut();
						
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
					
							run (newcode,true, false);
					
			}
function changeBGColor() {
	var bgcolVal = document.getElementById("bgcolor").value.split ("#");
	var color = "0x"+bgcolVal[1]
	renderer.setClearColorHex ( color, 1);
	
	}
function changePenColor(pcolor) {
	var rgb= hexToRgb (pcolor);
	var colorComand = "SETPENCOLOR ["+rgb.r + " " +rgb.g + " " + rgb.b +"]"
	run (colorComand ,false, false);
	/*var pencol = pcolor.split ("#");
	console.log (pencol);
	var color = "0x"+pencol[1]
	defaultColor = color;
	turtle.color = new THREE.Color(defaultColor);*/
	defaultColor = color;
	console.log (defaultColor);
	
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




import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import {openInstance} from './saveLoadFile.js';
import {Logo} from './logo.js';
import {createSliders, removeSliders} from './sliders.js';
import Stats from 'three/addons/libs/stats.module.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

	$(function() {
		$( "#menu" ).menu();
	});
	$(function() {
		$( document ).tooltip();
	});

let myTurtle, turtleGeometry, stats, controls;

globalThis.logo = null;
var showAxis = false;
var showGrid = false;
var sceneCube;
var cameraCube;
globalThis.fromSliders =false;
globalThis.traceCode = [];
globalThis.turtleGeometry;
globalThis.hasGrid = false;
globalThis.showPoints =false;
globalThis.tdactive = false;
var zoom = 1.0;
var zoomO = -1.0;
var inc = -0.1;
	var 	inner_canvas = document.getElementById("inner");
var zoomVar = 1.2
var rotSpeed = .02
var canvas;
var tdcanvas;
globalThis.camera = null;
globalThis.controls = null;
globalThis.renderer = null;
var tdaxisY = null;
var tdaxisX = null;
var dragIndex = null;
var scene = null;

var sliderFunctions = [];
var form;

var textOutput;
var pointLight;
var isMinimized = false;

var mobileVer = false;
var startch = null;
var sceneShapes = [];
var logoHistory = [];
	var is_keyboard = false;
	var is_landscape = false;

  var parameters = {
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
	var material;
    logo = new Logo()
	material =  new THREE.MeshLambertMaterial({
  color: parameters.TURTLE_START_COLOR
    });
	init_turtle ();
}
function run (code, drawbits) {
		var out, myVar
	  start_turtle ()
		out = logo.run(code);   //Line 465
		myVar = setInterval(function () { $("body").css("cursor", "progress");}, 1000);
		if (out && out.type == "error") {
				updateOldcodeText(out.data);
				logo.t = new Tokenizer();
		}
		draw_graphics  (myTurtle);
		$("body").css("cursor", "default");
		clearInterval(myVar);
}
function start_turtle () {
	if(!fromSliders){
		myTurtle.material = new THREE.MeshLambertMaterial({
			color: parameters.TURTLE_START_COLOR});
	}

				myTurtle.start = true;
	}

export function init (canvas_id,turtle_id,form_id,oldcode_id,textoutput_id) {
	$('#aboutInfo').hide();
	changeLanguage();
	//checkMobile();
	//checkWindowDimensions ();
    canvas = document.getElementById("3Dcanvas");
		var leftDiv = document.getElementById("mainCanvas");
		var content = document.getElementById("content");
	var	sliders = document.getElementById("sliders_outer");
	var	twoDVT = document.getElementById("twoDVT");
	var	inner_canvas = document.getElementById("inner");
	var	notes = document.getElementById ("notes");
	var	tips = document.getElementById ("tips");
		tips.style.visibility = "hidden";
	var	characters = document.getElementById("charSel");
		notes.style.visibility="hidden";
		stats = new Stats();
		content.appendChild( stats.dom );
		init_canvas (canvas, inner_canvas);
		init_cameraControls();
		splitContent();
	var  form = document.getElementById(form_id);
	var  textOutput = document.getElementById(textoutput_id);
	var  oldcode = document.getElementById(oldcode_id);
	    setup();
		//2D variation Tool properties
		document.getElementById("twoDVT").style.visibility = "hidden";
		//colors
		document.getElementById("bgcolor").value = parameters.BACKGROUND_COLOR_hex;
		document.getElementById("pencolor").value = parameters.TURTLE_START_COLOR_hex;
}

function init_cameraControls () {
	 /* document.getElementById("upRot").addEventListener("click", rotateUp);
	  document.getElementById("downRot").addEventListener("click", rotateDown);
	  document.getElementById("leftRot").addEventListener("click", rotateLeft);
	  document.getElementById("rightRot").addEventListener("click", rotateRight);*/
	  document.getElementById("2D").addEventListener("click", twoDimensions);
	  document.getElementById("zoomOut").addEventListener("click", ZoomOut);
	  document.getElementById("zoomIn").addEventListener("click", ZoomIn);
		  document.getElementById("find").addEventListener("click", relocateCamera);
}
function init_canvas (canvas, inner_canvas) {

    var animate, e, normalizationMatrix,  rendererParams,  msg;
    rendererParams = {
      canvas: canvas,
      alpha: 1
    };
	// WEBGL DETECTION
    try {window.WebGLRenderingContext;
      renderer = new THREE.WebGLRenderer(rendererParams);
			renderer.setClearColor (parameters.BACKGROUND_COLOR, 1);
			renderer.setSize(inner_canvas.offsetWidth, inner_canvas.offsetHeight);
    } catch (_error) {
		if (language == "Gr")
			msg = "Τα γραφικά webGl πιθανόν να είναι απενεργοποιημένα από το πρόγραμμα περιήγησης. Θα φορτωθεί μια πιο αργή έκδοση γραφικών.";
		else
			msg = " webGL graphics maybe are disabled from your browser. A slower version of graphics will be loaded.";
      if(confirm(msg)){renderer = new THREE.CanvasRenderer({canvas :canvas});
	  renderer.clear ();
	  	renderer.setClearColor (parameters.BACKGROUND_COLOR, 1);}
	  else {
	  window.location= ("http://get.webgl.org/");
	    return 0;
	  }
    }

		var	offsetX = $("#3Dcanvas").offset().left;
		var	offsetY = $("#3Dcanvas").offset().top;
		var	raycaster = new THREE.Raycaster(); // create once
		var  mouse = new THREE.Vector2(); // create once

    camera = new THREE.PerspectiveCamera(parameters.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, parameters.FRUSTUM_NEAR, parameters.FRUSTUM_FAR);
    camera.position.set(0, 0, parameters.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
		scene = new THREE.Scene();
    controls = new OrbitControls(camera, renderer.domElement);
		turtleGeometry = new THREE.CylinderGeometry(1, 1, 1, parameters.SEGMENTS);
		normalizationMatrix = new THREE.Matrix4();
		normalizationMatrix.makeRotationX (Math.PI / 2);
		normalizationMatrix.makeTranslation(0, -0.5, 0);
		turtleGeometry.applyMatrix4 (normalizationMatrix);
		//GRID
		globalThis.gridXZ = 0;
		globalThis.gridXY  = 0;
		globalThis.gridYZ  = 0 ;
		globalThis.material = null;
		gridXZ = new THREE.GridHelper(200, 10);
		material = new THREE.LineBasicMaterial({color :0xB8B8A0});
		gridXZ.material = material;
		gridXZ.rotation.y = Math.PI/2;
		gridXZ.position.set( 100,0,100 );
		//scene.add(gridXZ);
		//animate();
		gridXY = new THREE.GridHelper(200, 10);
		gridXY.position.set( 100,100,0 );
		gridXY.rotation.x = Math.PI/2;
		gridXY.material = material;
		//scene.add(gridXY);
	//	animate();
		gridYZ = new THREE.GridHelper(200, 10);
		gridYZ.position.set( 0,100,100 );
		gridYZ.rotation.z = Math.PI/2;
		gridYZ.material = material;
		//scene.add(gridYZ);
	 // add subtle ambient lighting
	 function animate (){
		 requestAnimationFrame(animate);
		camera.lookAt( scene.position );
		stats.update();
	renderer.render(scene, camera);
					 };
		animate();
		 return renderer.domElement;
			}



function resize_scene (renderer){

	 renderer.setSize(inner_canvas.offsetWidth, inner_canvas.offsetHeight);
	 offsetX = $("#3Dcanvas").offset().left;
	offsetY = $("#3Dcanvas").offset().top;
	//projector = new THREE.Projector();
	controls = new OrbitControls(camera, renderer.domElement);
	 //controls.update();
	 if(!mobileVer)
	 resizableElemnts();
 else
	 mobileRes();
checkWindowDimensions ();
	 splitContent();


	}

function resetCanvas(option, renderer) {
		var 	inner_canvas = document.getElementById("inner");
		myTurtle.start = true
		 fromSliders=false;
	   for (var l=0; l< sceneObjects.length; l ++ ) {
			scene.remove (sceneObjects [l].mesh);
			}
		sceneObjects = [];
		traceCode = [];
		sliderFunctions = [];

		logo.usedFunctions = [];
			removeSliders (oldNum);
			resetTDCanvas();
			var tdaxisY = null;
			var tdaxisX = null;
			var tdactive = false;
		if(option === 1) {			//if clearscreen reset turtle and camera, if cleartrace leave turtle and camera at the same position
		 reset_turtle(myTurtle);
	  camera = new THREE.PerspectiveCamera(parameters.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, parameters.FRUSTUM_NEAR, parameters.FRUSTUM_FAR);
	    camera.position.set(0, 0, parameters.CAMERA_DISTANCE);
	    camera.lookAt(new THREE.Vector3(0, 0, 1));
			if (renderer)
			controls = new OrbitControls(camera, renderer.domElement);
		// controls.update();
		 scene.remove(myTurtle.helper);
		 scene.remove(gridXZ);
		 scene.remove(gridXY);
		 scene.remove(gridYZ);
			 showAxis = false;
			 showGrid = false;
	 }
}

function changeSliderValue (slider,ui, fname, argsValue, fId) {
		 fromSliders = true;
		 var code = "";
		 var newCode = "";
		 var functFound = false;
		 var id = $(slider).attr("id");
		 //console.log (ui.value)
		 $( "#"+id+"_amount" ).val( ui.value );

		 newCode = fname ;
				 for(var i=0; i<argsValue.length; i++) {
			 argsValue[i].data = $( "#" + i+"_amount" ).val();
			 newCode = newCode + " " + argsValue[i].data;
			 }

			 //console.log ("fid: " + fId);
			 var historyCommand = logo.usedFunctions;
			 //console.log (historyCommand);
			 clean ();
			 reset_turtle(myTurtle);
			 $("body").css("cursor", "wait");
			 for (var i=0; i<historyCommand.length; i++)
			 {
			 code = "";
				 if ((!fromOpenFile) || (fromOpenFile && !functFound)){

				 myTurtle.setpos (historyCommand[i].turtlePosition.x,historyCommand[i].turtlePosition.y,historyCommand[i].turtlePosition.z);//console.log ("notFoundYet");

				 }
				 myTurtle.setDirection (historyCommand[i].turtleDirection);
				 myTurtle.setUp (historyCommand[i].turtleUp);
				 // turtle.up = historyCommand[i].up;
				 if (i != fId){
					 myTurtle.color = new THREE.Color(defaultColor);
				 //code = code + " "+ historyCommand[i].name;
				 //console.log (logo.usedFunctions[i]);
					 var command =historyCommand[i].name;
				 for(j=0; j< historyCommand[i].argsVal.length; j++) {
					 var commandArg = historyCommand[i].argsVal[j];
						 command = command + " " + commandArg.data
					 if (commandArg.type != "num"){

						 var tokenArgsArray = retrieveArgs (commandArg)
						 //console.log (tokenArgsArray);

						 for (var l =0; l<tokenArgsArray.length; l++){
							command = command+ " " + tokenArgsArray[l];
						 }
						 if (commandArg.type == "lst")
							 command = command + "]"

					 }
				 }
					 //console.log (code);
					 code = code +" " + command;
					 run (code,false);
					 //turtle.setDirection (historyCommand[i].turtleDirection);



			 }	else { //console.log (newCode);
			 myTurtle.color = new THREE.Color(parameters.TURTLE_SELECT_COLOR);
			 run (newCode,false);
			 var lastPos=myTurtle.getPos();
			 //console.log ("found");
			 functFound = true;

			 }
			 }
			 $("body").css("cursor", "default");
			 myTurtle.setpos (lastPos.x,lastPos.y,lastPos.z);
			 myTurtle.color = new THREE.Color(parameters.TURTLE_START_COLOR);
			 //console.log ("code : " + code);
			 //redraw(code);

			 fromSliders = false;

	 }
function clearGraphics () { //clears trace, turtle remains at its current position
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

	for (var l=0; l< sceneObjects.length; l ++ ) {
		var mesh = sceneObjects [l].mesh
		mesh.material.dispose();
		mesh.geometry.dispose();
			scene.remove (mesh);
		}
		for (l=0; l< sceneShapes.length; l ++ ) {
				scene.remove (sceneShapes [l].mesh);
			}
		logo.usedFunctions = [];
		sceneObjects = [];
		sceneShapes= [];
		}
function rotateUp(){
		 controls.rotateUp(0.1);
		 //controls.enabled=false
	  //camera.rotation.set (0,5,0)
		// camera.updateProjectionMatrix();
		// camera.updateMatrix();
		 //camera.lookAt(myTurtle.position)
//controls.target.set(0,0,0);
//controls.update();
		// controls.enableDamping = true;
		// camera.rotation.z =+ 0.5
		// controls.target.copy(myTurtle.position)
	//	 controls.update();
				/*	if(!showGrid){
						//scene.add(turtle.helper);
						scene.add(gridXZ);
						scene.add(gridYZ);
						scene.add(gridXY);
						showGrid= true;
					}*/


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
		 //rotateLeft(0.2);
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
//	controls.enabled=false;
	camera.zoom +=0.2;
	camera.updateProjectionMatrix();

	}

function ZoomOut () {
	camera.zoom -=0.2
	camera.updateProjectionMatrix();
	}
function twoDimensions	() {
	 camera = new THREE.PerspectiveCamera(parameters.FIELD_OF_VIEW, inner_canvas.offsetWidth/ inner_canvas.offsetHeight, 		parameters.FRUSTUM_NEAR, parameters.FRUSTUM_FAR);
    camera.position.set(0, 0, parameters.CAMERA_DISTANCE);
    camera.lookAt(new THREE.Vector3(0, 0, 1));
		controls = new OrbitControls(camera, renderer.domElement);

	// controls.update();
	 	scene.remove(gridXZ);
	scene.remove(gridXY);
	scene.remove(gridYZ);
		showGrid = false;
	}
function checkObject (clickedX, clickedY){  //checks if the user clicked on an object
//	var vector = new THREE.Vector3 ( ( (clickedX - offsetX)/ inner_canvas.offsetWidth) * 2 - 1, - (( clickedY - offsetY)/ inner_canvas.offsetHeight ) * 2 + 1, 0.5 );
				 // projector.unprojectVector( vector, camera );

				 // var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

				 mouse.x = (clickedX / renderer.domElement.clientWidth ) * 2 - 1;
				 mouse.y = - ( clickedY / renderer.domElement.clientHeight ) * 2 + 1;
				 raycaster.setFromCamera( mouse, camera );
				 //	var intersects = raycaster.intersectObjects( objects, recursiveFlag );
				  var intersects = raycaster.intersectObjects(shapeMeshes);
				//  console.log (intersects);
				  if ( intersects.length != 0 ) {
				  	this.id = intersects[0].object.id;
					for (i =0; i<sceneShapes.length; i++) {
						if (sceneShapes[i].mesh.id == this.id){
							loadObjSettings (sceneShapes[i].mesh,clickedX, clickedY);
							break;
						}
						}

				  }

}
function undo (){
			  var newcode = "";
			  	var command = "";
				var numericValue = false;
				var historyFunction = null;
				var commandArg = null;
				 // var historyCommand = logo.usedFunctions;

					//console.log (historyCommand);
				var k = logo.usedFunctions.length-1;
					//console.log  (k);
					for (var i=0; i<k; i++)
					{
					var historyFunction = logo.usedFunctions[i]
					command = historyFunction.name;
						for(var j=0; j< historyFunction.argsVal.length; j++) {
							//newcode = newcode + " " + historyFunction.argsVal[j].data;
							commandArg = historyFunction.argsVal[j];
							command = command + " " + commandArg.data
							if (commandArg.type != "num"){

								var tokenArgsArray = retrieveArgs (commandArg)
								console.log (tokenArgsArray);

								for (var l =0; l<tokenArgsArray.length; l++){
								 command = command+ " " + tokenArgsArray[l];
								}
								if (commandArg.type == "lst")
									command = command + "]"


							}



						}
						newcode = newcode +" " + command;
					}



				//	console.log (newcode)
					clean ();
					reset_turtle(myTurtle);

							run (newcode,true);

			}
			function stop(){
					//turtle.stop();
				resetCanvas (1, renderer);
			}

function retrieveArgs (tok){
	var tokenArgs = []
	for (var l=0; l<tok.args.length; l++){
		if (tok.args[l].type != "num"){
			tokenArgs.push(retrieveArgs(tok.args[l]))
		}
		else {
			tokenArgs.push (tok.args[l].data)
		}
	}
	return (tokenArgs);


}
export function changeBGColor() {
	var bgcolVal = document.getElementById("bgcolor").value;
	var color = "0x"+bgcolVal[1]
	var newCol = new THREE.Color(bgcolVal);
	renderer.setClearColor(newCol);

	}
export function changePenColor(pcolor) {
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

export function axisControl ()
	{if(showAxis)
		{scene.remove(myTurtle.helper); showAxis = false; }
	 else {scene.add(myTurtle.helper); showAxis = true;}
	}



export function changeCharacter(val) {
	change_turtle(val);
	}

export function relocateCamera () {
	var newp =  new THREE.Vector3(camera.position.x, camera.position.y, parameters.CAMERA_DISTANCE).add(myTurtle.position);
	camera.position.x = newp.x;
	camera.position.y = newp.y;
	camera.position.z = newp.z;
	//controls.target.copy( myTurtle.position );
//	controls.update();
//camera.lookAt (myTurtle.position )
}


	// TURTLE

		var camera, deg2rad, getPerpVec, parameters, root, scene, centroid;
		 var helper = null;

	var	sceneObjects = [];
	var	history = [];


		deg2rad = function(degrees) {
		  return degrees / 360 * 2 * Math.PI;
		};

		getPerpVec = function(vec) {
		  if (vec.z === 0) {
			return new THREE.Vector3(0, 0, 1);
		  } else if (vec.y === 0) {
			return new THREE.Vector3(0, 1, 0);
		  } else {
			return new THREE.Vector3(0, 1, -(vec.y / vec.z));
		  }
		};

		//turtleGeometry = void 0;

		camera = void 0;

		controls = void 0;

		scene = void 0;

		var turtleImage = void 0;

				function object3D (id, fName, argsNames , argsVal, fId, mesh) {
					this.mesh = mesh;
					this.id = id;
					this.fName = fName;
					this.argsNames = argsNames;
					this.argsValues = argsVal;
					this.fId = fId;
					}

			function Turtle3D(position, direction, up, mat, width, headDirection, headup) {

			this.start = true;
			this.helper = null;
			this.head = null;
			this.headDirection =headDirection;
			this.headup = headup;
			this.position = position;
			this.direction = direction;
			this.up = up;
			this.material = mat;
			this.width = width;
			this.color= parameters.TURTLE_START_COLOR;
			this.direction.normalize();
			this.up.normalize();
			this.objects = [];
			this.droppings = [];
			this.drawing = true;
			this.visible = true;
		  }


		  	 var _q1 = new THREE.Quaternion();
	  Turtle3D.prototype.updateHead = function() {


		 this.head.lookAt (this.head.position.clone().addSelf( this.direction ) );

			if (this.visible)
				scene.add (this.head);

		  }

			  Turtle3D.prototype.stop = function() {
			this.start = false;
		  };

		  /////////////////KINHSEIS TIS XELONAS (GRAPHICS) ///////////////
		  Turtle3D.prototype.stinarxi = function () {
			  var newPosition;
			newPosition = new THREE.Vector3(0,0,0);
			//newPosition.add(this.position, this.direction.clone().multiplyScalar(distance));

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}
			  this.up = parameters.TURTLE_START_UP.clone()
				  this.direction =  parameters.TURTLE_START_DIR.clone()
				    newZ = this.up;
				  newY = this.direction;
				 this.head.quaternion.set (0,0,0,0);

				  this.head.quaternion.copy (this.startQuat);

			return this.position = newPosition;
			  }
		  Turtle3D.prototype.go = function(distance) {

			  if (logo.userFunct) {
				  //console.log ("userFunct "  );
				  this.functId = logo.usedFunctions.length-1;
				  var myFunct = logo.usedFunctions [this.functId];

	//			  console.log (myFunct);

				//console.log (this.startpoint);
				  this.fName = myFunct.name ;
				  this.argsNames = myFunct.funct.args;
				  this.argsValues = myFunct.argsVal;
				  }
				  else {
					  this.fName = "";}
			var newPosition;
			newPosition = new THREE.Vector3();
			var cl = this.direction.clone().multiplyScalar(distance);
			newPosition.addVectors(this.position, cl );

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });
			}
			return this.position = newPosition;
		  };

		  Turtle3D.prototype.yaw = function(angle) {
			var rot;
			rot = new THREE.Matrix4();
			rot.makeRotationAxis( this.up,deg2rad(-angle));
			this.direction.applyMatrix4 (rot);
			 this.direction.normalize();
			 rotateOnAxis(this.head, this.yAxis,deg2rad(-angle), this.q1);

		  };

		  Turtle3D.prototype.pitch = function(angle) {
			var right, rot;
			var dir = this.direction;
			var up = this.up;
			right = new THREE.Vector3();
			right.crossVectors (dir, up)
			right.normalize();
			rot = new THREE.Matrix4();
			rot.makeRotationAxis(right, deg2rad(angle));
			this.direction.applyMatrix4 (rot);
			 this.direction.normalize();
			 this.up.applyMatrix4 (rot);
			 this.up.normalize();

				 if(!showAxis){
					//scene.add(this.helper);
					//showAxis = true;
				 }
				  rotateOnAxis(this.head,this.xAxis,deg2rad(-angle), this.q1);
		  };

		  Turtle3D.prototype.roll = function(angle) {
			var rot;
			rot = new THREE.Matrix4().makeRotationAxis(this.direction, deg2rad(angle));
			this.up.applyMatrix4 (rot);
			this.up.normalize();

				  if(!showAxis){
					//scene.add(this.helper);
					//showAxis = true;
				  }
				 rotateOnAxis(this.head, this.zAxis,deg2rad(angle), this.q1);


		  };

		  Turtle3D.prototype.setx = function (x) {
			   var newPosition;
			newPosition = new THREE.Vector3(x,this.position.y, this.position.z);
			   	this.head.position = this.position;
		 	 this.helper.position = this.position;
				 // console.log("new pos");
			 // console.log (newPosition);

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}


			return this.position = newPosition;
			  }

			  Turtle3D.prototype.sety = function (y) {
			   var newPosition;
			   newPosition = new THREE.Vector3(this.position.x,y, this.position.z);
			 	this.head.position = this.position;
		  this.helper.position = this.position;
				 // console.log("new pos");
			 // console.log (newPosition);

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}


			return this.position = newPosition;
			  }

			  Turtle3D.prototype.setxy = function (x, y) {
				  var newPosition;
				  newPosition = new THREE.Vector3(x,y, this.position.z);
						this.head.position = this.position;
		  this.helper.position = this.position;
				 // console.log("new pos");
			 // console.log (newPosition);

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}


			return this.position = newPosition;
				  }

			 Turtle3D.prototype.setxz = function (x, z) {
				  var newPosition;
				  newPosition = new THREE.Vector3(x,this.position.y, z);
						this.head.position = this.position;
		  			this.helper.position = this.position;
				 // console.log("new pos");
			 // console.log (newPosition);

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}


			return this.position = newPosition;
				  }

			  Turtle3D.prototype.setz = function (z) {
			   var newPosition;
			newPosition = new THREE.Vector3(this.position.x,this.position.y, z);
			 	this.head.position = this.position;
		  this.helper.position = this.position;
				 // console.log("new pos");
			 // console.log (newPosition);

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}


			return this.position = newPosition;
			  }
			 Turtle3D.prototype.setyz = function (y, z) {
				  var newPosition;
				  newPosition = new THREE.Vector3(this.position.x,y, z);
						this.head.position = this.position;
		  			this.helper.position = this.position;
				 // console.log("new pos");
			 // console.log (newPosition);

			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}


			return this.position = newPosition;
				  }

		  Turtle3D.prototype.setpos = function (x, y, z) {
				  var newPosition;
				  newPosition = new THREE.Vector3(x,y,z);
				 	this.head.position.copy (this.position);
		  this.helper.position.copy (this.position);

			if(!fromSliders){
			if (this.drawing){
			  this.droppings.push({
				from: this.position,
				to: newPosition,
				color: this.color,
				material : this.material,
				functId: this.functId,
				functionName: this.fName,
				argsNames: this.argsNames,
				argsValues: this.argsValues,
				width: this.width
			  });

			}
			}

			return this.position = newPosition;
				  }

	    Turtle3D.prototype.getPos = function () {
				  return this.position;
				  }


		  Turtle3D.prototype.gohome = function () {
			 // console.log ("going home")
				  var newPosition, newZ, newY;
				  newPosition = new THREE.Vector3(0,0,0);
				  this.position = newPosition;
				  this.head.position.copy (this.position);
		 		 this.helper.position.copy (this.position);

				  this.up = parameters.TURTLE_START_UP.clone()
				  this.direction =  parameters.TURTLE_START_DIR.clone()
				    newZ = this.up;
				  newY = this.direction;
				 this.head.quaternion.set (0,0,0,0);

				  this.head.quaternion.copy (this.startQuat);

				  //this.head.lookAt (this.position.clone().addSelf( this.direction ) );

				  }



			function rotateOnAxis( object, axis, angle, _q1 ) {
						//object.useQuaternion = true;
	   				 _q1.setFromAxisAngle( axis, angle );
	  				  object.quaternion.multiply( _q1 );

						}

		  Turtle3D.prototype.penUp = function() {
			return this.drawing = false;
		  };

		  Turtle3D.prototype.penDown = function() {
			return this.drawing = true;
		  };

		   Turtle3D.prototype.setVisible = function(visible) {
			   if (visible)
				scene.add (this.head)
				else
				scene.remove(this.head)
			return this.visible = visible;
		  };

		  Turtle3D.prototype.setWidth = function(width) {
			this.width = width;
		  };

		  Turtle3D.prototype.setMaterial = function(material) {
			this.material = material;
		  };

		    Turtle3D.prototype.setDirection = function(newDir) {
			this.direction.copy (newDir);
		  };
		  Turtle3D.prototype.setUp = function(newUp) {
			this.up.copy (newUp);
		  };


		  Turtle3D.prototype.setColor = function(r, g, b) {
			this.color =  new THREE.Color( rgbToHex (r,g,b) );
			defaultColor = rgbToHex (r,g,b);
		  };



		  ////// KANEI RETRIEVE TOUS KYLINDROUS POU THA ZWGRAFISOUN TI DIADROMI (dropings) ////

			const createTransformationMatrix = function ()  {
			    const position = new THREE.Vector3();
			    const quaternion = new THREE.Quaternion();
			    const scale = new THREE.Vector3();
					const rotation = new THREE.Euler();
			    return function ( matrix, from, direction, to, width ) {
			        position.x = to.x;
			        position.y = to.y;
			        position.z = to.z;
			        quaternion.setFromUnitVectors( from, to );
			        scale.x = width;
			        scale.y = direction.length();
			        scale.z = width;
			        matrix.compose( position, quaternion, scale );

			    };
			}();

 			Turtle3D.prototype.retrieveMeshes = function() {
				var bottomRadius, distance, from, height, color, drawCol, mesh, shearFactor, to, topRadius, turtleTransform, width, fName, _i,myMat, _len, _ref, _ref1, _results;
				_ref = this.droppings;
				_results = [];
				// for each trace segment (line) create a cylinder
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				  _ref1 = _ref[_i], from = _ref1.from, to = _ref1.to, drawCol = _ref1.color, width = _ref1.width, fName = _ref1.functionName, myMat = _ref1.material;
	    // draw a cylinder of radius 'width' from one point (from) to another (to)
			// edge from (from) to (to)
	    var direction = new THREE.Vector3().subVectors( to, from );
		 // Make an instanced Mesh
	   	const mesh = new THREE.InstancedMesh( turtleGeometry, myMat, _len);
			 const matrix = new THREE.Matrix4;
			// shift it so one end rests on the origin
		//	matrix.makeTranslation(0, direction.length(), 0);
			// rotate it the right way for lookAt to work
	//   matrix.makeRotationX(THREE.MathUtils.degToRad(90));
	createTransformationMatrix (matrix, from, direction, to, width)
		  mesh.setMatrixAt( _i, matrix );
	    // Make a mesh with the geometry
	  //  var mesh = new THREE.Mesh( turtleTrace,new THREE.MeshBasicMaterial( {color: drawCol} ) );
			// Position it where we want
		//	mesh.position.copy(from);
			// And make it point to where we want
	//	 mesh.lookAt(to);
			myTurtle.objects.push(mesh);
			//
			var newObj = new object3D (mesh.id, fName, _ref1.argsNames, _ref1.argsValues, _ref1.functId, mesh);
			sceneObjects.push(newObj);
			 _results.push(mesh);
			}
				return _results;
			  };



		/*  Turtle3D.prototype.retrieveMeshes = function() {
			var bottomRadius, distance, from, height, color, drawCol, mesh, shearFactor, to, topRadius, turtleTransform, width, fName, _i,myMat, _len, _ref, _ref1, _results;
			_ref = this.droppings;
			_results = [];
			// for each trace segment (line) create a cylinder
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			  _ref1 = _ref[_i], from = _ref1.from, to = _ref1.to, drawCol = _ref1.color, width = _ref1.width, fName = _ref1.functionName, myMat = _ref1.material;
    // draw a cylinder of radius 'width' from one point (from) to another (to)
		// edge from (from) to (to)
    var direction = new THREE.Vector3().subVectors( to, from );
	 // Make the geometry (of "direction" length)
    var turtleTrace = new THREE.CylinderGeometry( width, width, direction.length(), parameters.SEGMENTS);
		// shift it so one end rests on the origin
		turtleTrace.applyMatrix4(new THREE.Matrix4().makeTranslation(0, direction.length() / 2, 0));
		// rotate it the right way for lookAt to work
    turtleTrace.applyMatrix4(new THREE.Matrix4().makeRotationX(THREE.MathUtils.degToRad(90)));
    // Make a mesh with the geometry
    var mesh = new THREE.Mesh( turtleTrace,new THREE.MeshBasicMaterial( {color: drawCol} ) );
		// Position it where we want
		mesh.position.copy(from);
		// And make it point to where we want
		mesh.lookAt(to);
		myTurtle.objects.push(mesh);
		//
		var newObj = new object3D (mesh.id, fName, _ref1.argsNames, _ref1.argsValues, _ref1.functId, mesh);
		sceneObjects.push(newObj);
		 _results.push(mesh);
		}
			return _results;
		  };
*/


	function change_turtle (character) {
			var old_quat = myTurtle.head.quaternion.clone();
			scene.remove(myTurtle.head);

	  if (character == "Bird"){
	var texture = THREE.ImageUtils.loadTexture( 'code/turtle/Feather-Free-Texture.jpg' );
					var loader = new OBJLoader();

					loader.load( "code/turtle/bird.obj", function ( object) {
					for ( var i = 0, l = object.children.length; i < l; i ++ ) {

							//object.children[ i ].material= material2;
							object.children[ i ].material.map = texture;
							//object.children[ i ].castShadow = true;
							object.children[ i ].receiveShadow = true;


						}
						object.scale.x = 0.6;
	                    object.scale.y = 0.6;
	                  object.scale.z = 0.6;

					object.position = myTurtle.position;

						xAxis = new THREE.Vector3 (1,0,0);
						yAxis = new THREE.Vector3 (0,1,0);
						zAxis = new THREE.Vector3 (0,0,1);
						myTurtle.head = object;
						scene.add( myTurtle.head );
						myTurtle.head.useQuaternion = true;
						//myTurtle.head.quaternion.set (old_quat);
						rotateOnAxis (myTurtle.head , xAxis, deg2rad(-90));
						rotateOnAxis (myTurtle.head , zAxis, deg2rad(-180));
						myTurtle.head.quaternion.copy (old_quat);

						myTurtle.startQuat = myTurtle.head.quaternion.clone();

					} );
	  }
	  else if (character == "Turtle"){

						var material2 = new THREE.MeshLambertMaterial({ color: 0x003300});

						var loader = new OBJLoader();

					loader.load( "code/turtle/turtle.obj", function ( object) {
					for ( var i = 0, l = object.children.length; i < l; i ++ ) {

							object.children[ i ].material= material2;
							object.children[ i ].receiveShadow = true;


						}
						object.scale.x = 0.12;
	                    object.scale.y = 0.12;
	                  object.scale.z = 0.12;

					object.position = myTurtle.position;

						xAxis = new THREE.Vector3 (1,0,0);
						yAxis = new THREE.Vector3 (0,1,0);
						zAxis = new THREE.Vector3 (0,0,1);
						myTurtle.head = object;
						scene.add( myTurtle.head );
							myTurtle.head.useQuaternion = true;
						//myTurtle.head.quaternion.set (old_quat);
						rotateOnAxis (myTurtle.head , xAxis, deg2rad(-180));
						//rotateOnAxis (myTurtle.head , zAxis, deg2rad(-180));
						myTurtle.head.quaternion.copy (old_quat);



					} );
	  }
		else {
				//var texture = THREE.ImageUtils.loadTexture( 'turtle/plane/planetext.jpg' );
						var material2 = new THREE.MeshLambertMaterial({ color: 0x666666});

						var loader = new OBJLoader();

					loader.load( "code/turtle/plane/plane.obj", function ( object) {
					for ( var i = 0, l = object.children.length; i < l; i ++ ) {

							object.children[ i ].material = material2;
							object.children[ i ].receiveShadow = true;


						}
						object.scale.x = 2.5;
	                    object.scale.y = 2.5;
	                  object.scale.z = 2.5;

					object.position.x = myTurtle.position.x;
					object.position.y = myTurtle.position.y;
					object.position.z = myTurtle.position.z;

					var 	xAxis = new THREE.Vector3 (1,0,0);
						var yAxis = new THREE.Vector3 (0,1,0);
					var	zAxis = new THREE.Vector3 (0,0,1);
						myTurtle.head = object;
						scene.add( myTurtle.head );
					myTurtle.head.useQuaternion = true;
						//myTurtle.head.quaternion.set (old_quat);
						rotateOnAxis (myTurtle.head , xAxis, deg2rad(-90));
						rotateOnAxis (myTurtle.head , zAxis, deg2rad(-180));
						myTurtle.head.quaternion.copy (old_quat);

					} );



			}


			return myTurtle;

			}

		function init_turtle () {
			var turtleMaterial, defaultColor, ambLight;
			let object;
	 		 turtleMaterial = new THREE.MeshLambertMaterial({
	   		   color: parameters.TURTLE_START_COLO
	  		  });
			  	defaultColor = parameters.TURTLE_START_COLOR;
			myTurtle = new Turtle3D(parameters.TURTLE_START_POS.clone(), parameters.TURTLE_START_DIR.clone(), parameters.TURTLE_START_UP.clone(), turtleMaterial, parameters.TURTLE_START_WIDTH,  new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
	   	ambLight = new THREE.AmbientLight(parameters.AMB_LIGHT_COLOR);
	  			scene.add(ambLight);
					function loadModel() {
						object.traverse( function ( child ) {
							if ( child.isMesh ) child.material.map = texture;
						} );
						object.scale.x = 0.6;
	          object.scale.y = 0.6;
	          object.scale.z = 0.6;
						object.position.y = myTurtle.position.y;
						object.position.z = myTurtle.position.z;
						object.position.x = myTurtle.position.x;
				  	myTurtle.xAxis = new THREE.Vector3 (1,0,0);
						myTurtle.yAxis = new THREE.Vector3 (0,1,0);
						myTurtle.zAxis = new THREE.Vector3 (0,0,1);
						myTurtle.head = object;
						scene.add( object );
						myTurtle.head.useQuaternion = true;
						myTurtle.q1 = new THREE.Quaternion();
						rotateOnAxis (myTurtle.head, myTurtle.xAxis, deg2rad(-90), 	myTurtle.q1 )
						rotateOnAxis (myTurtle.head, myTurtle.zAxis,deg2rad(-180), 	myTurtle.q1 )
						myTurtle.startQuat =  myTurtle.head.quaternion.clone();
					//	quaternionX.setFromAxisAngle( xAxis, deg2rad(-90));
				//	  myTurtle.head.setRotationFromQuaternion( quaternionX );
				//	quaternionZ.setFromAxisAngle( zAxis,deg2rad(-90));
				//		myTurtle.head.setRotationFromQuaternion( quaternionZ );
						myTurtle.helper = new THREE.AxesHelper(150);
					const newZ = myTurtle.up;
						const newX = myTurtle.direction;
						const newY = new THREE.Vector3().cross(newX, newZ);
						myTurtle.helper.position.x = myTurtle.position.x;
						myTurtle.helper.position.y = myTurtle.position.y;
						myTurtle.helper.position.z = myTurtle.position.z;
						logo.setTurtle(myTurtle);
						logo.setTextOutput(textOutput);
					  openInstance();
					}
					const manager = new THREE.LoadingManager( loadModel );
					const textureLoader = new THREE.TextureLoader( manager );
					const texture = textureLoader.load( 'code/turtle/Feather-Free-Texture.jpg' );

					function onProgress( xhr ) {
										if ( xhr.lengthComputable ) {
											const percentComplete = xhr.loaded / xhr.total * 100;
											console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
										}
									}
					function onError() {}
					const loader = new OBJLoader( manager );
					loader.load( 'code/turtle/bird.obj', function ( obj ) {
						object = obj;
					}, onProgress, onError );


				/*	loader.load( "code/turtle/bird.obj", function ( object) {
					for ( var i = 0, l = object.children.length; i < l; i ++ ) {

							//object.children[ i ].material= material2;
							object.children[ i ].material.map = texture;
							//object.children[ i ].castShadow = true;
							object.children[ i ].receiveShadow = true;

						}


					object.position = myTurtle.position;
						xAxis = new THREE.Vector3 (1,0,0);
						yAxis = new THREE.Vector3 (0,1,0);
						zAxis = new THREE.Vector3 (0,0,1);
						myTurtle.head = object;
						scene.add( myTurtle.head );
						myTurtle.head.useQuaternion = true;
						rotateOnAxis (myTurtle.head , xAxis, deg2rad(-90));
						rotateOnAxis (myTurtle.head , zAxis, deg2rad(-180));
						  startQuat = myTurtle.head.quaternion.clone();
						myTurtle.helper = new THREE.AxisHelper();
			newZ = myTurtle.up;
		 	newX = myTurtle.direction;
		 	newY = new THREE.Vector3().cross(newX, newZ);
		 // 	rotationMatrix = new THREE.Matrix4(newX.x, newY.x, newZ.x, 0, newX.y, newY.y, newZ.y, 0, newX.z, newY.z, newZ.z, 0, 0, 0, 0, 1);
		//  myTurtle.helper.applyMatrix(rotationMatrix);
		  myTurtle.helper.position = myTurtle.position;
		 // turtle = myTurtle;
		   logo.setTurtle(myTurtle);
	   	 logo.setTextOutput(textOutput);
			openInstance();
		} );*/




			}

		function reset_turtle (myTurtle) {
			myTurtle.gohome();
			myTurtle.visible=true;
			//console.log (myTurtle.drawing);
			myTurtle.penDown();
			myTurtle.objects = [];

			}

	 function   draw_graphics (myTurtle) {

		  if(myTurtle.start){
			var ambLight,  dirLight, helper, material, mesh, meshes,  newX, newY, newZ, rotationMatrix, _i, _j, _len, _len1;
			  meshes = myTurtle.retrieveMeshes(); ///RETRIEVE MESHES///
			   _len = meshes.length;
				 if(_len > 0){
		  	for (_i = 0;  _i < _len; _i++) {

					mesh = meshes[_i];

					scene.add(mesh);
		  		}

		 // projector = new THREE.Projector();
		myTurtle.head.position.x = myTurtle.position.x;
		myTurtle.head.position.y = myTurtle.position.y;
		myTurtle.head.position.z = myTurtle.position.z;
		  myTurtle.helper.position.x = myTurtle.position.x;
		  myTurtle.helper.position.y = myTurtle.position.y;
		  myTurtle.helper.position.z = myTurtle.position.z;
		  centroid = new THREE.Vector3();
		  for (_j = 0, _len1 = meshes.length; _j < _len1; _j++) {
			mesh = meshes[_j];
			centroid.add(mesh.position);
		  }

		  centroid.divideScalar(meshes.length);

		// camera.lookAt (myTurtle.head.position);
		// renderer.render(scene,camera);
		 // controls.center = centroid;

		  }
		 // if(!fromSliders)
		  // camera.position = new THREE.Vector3(camera.position.x, camera.position.y, parameters.CAMERA_DISTANCE).addSelf(centroid);
		//  camera.position = myTurtle.head.position;
		  //camera.lookAt (myTurtle.direction);
			 myTurtle.droppings = [];

		}
		}

		function componentToHex(c) {
		  var hex = c.toString(16);
		  return hex.length == 1 ? "0" + hex : hex;
	  }

	  function rgbToHex(r, g, b) {
		  return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	  }
		//exports scene objects to obj or slt files (not the avatar, only drawn models)
	export	function exportSceneObjects(option) {
		 myTurtle.setVisible(false);
		if (option === "obj"){
			// Instantiate an exporter
			const exporter = new OBJExporter();
			//hide the avatar if Visible
			// Parse the input and generate the OBJ output
			const data = exporter.parse( scene );
			saveString( data, 'object.obj' );
		}
		else if (option === "stl") {
			// Instantiate an exporter
			const exporter = new STLExporter();
			// Configure export options
			const options = { binary: true }
			// Parse the input and generate the STL encoded output
			const result = exporter.parse( scene, options );
			saveString( result, 'object.stl' );
		}
			 myTurtle.setVisible(true);
		}

		function saveString( text, filename ) {
			save( new Blob( [ text ], { type: 'text/plain' } ), filename );
		}
		function save( blob, filename ) {
			const link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link );
			link.href = URL.createObjectURL( blob );
			link.download = filename;
			link.click();
		}


	export 	function checkTrail (clickedX,clickedY) {			//checks if the user clicked on a turtle Trail
	var	offsetX = $("#3Dcanvas").offset().left;
	var offsetY = $("#3Dcanvas").offset().top;


		var  intersects;
		var	raycaster = new THREE.Raycaster(); // create once
		var  mouse = new THREE.Vector2(); // create once
		mouse.x = ((clickedX - offsetX)/ inner_canvas.offsetWidth) * 2 - 1;
		mouse.y = - (( clickedY - offsetY)/ inner_canvas.offsetHeight ) * 2 + 1;
			raycaster.setFromCamera( mouse, camera );
		 //	var intersects = raycaster.intersectObjects( objects, recursiveFlag );
			intersects  = raycaster.intersectObjects(myTurtle.objects);
		//	console.log (intersects.length)
						  if ( intersects.length != 0 ) {

						  var meshId = intersects[0].object.id;
							for (var i =0; i<sceneObjects.length; i++) {
								if ((sceneObjects[i].id == meshId)&& (sceneObjects[i].fName != "")){
									var fid = sceneObjects[i].fId;	//function if
									if (sceneObjects[i].argsNames.length > 0){
										createSliders (sceneObjects[i]);
										}
								}
								}
		  					for (i =0; i<sceneObjects.length; i++) {
							if ((sceneObjects[i].fId == fid)&&(sceneObjects[i].fName !=""))
								sceneObjects[i].mesh.material = new THREE.MeshLambertMaterial
								({color: parameters.TURTLE_SELECT_COLOR})
							}
						  }
			}


export {run, resetCanvas, clean, reset_turtle, changeSliderValue, undo, stop} ;

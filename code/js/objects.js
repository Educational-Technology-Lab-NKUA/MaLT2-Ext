import * as THREE from 'three';
import { deleteObject } from './init.js';
document.getElementById("cancel").addEventListener("click",function() { cancelSettings();}, false);

var objToInsert = null;
var activeObj = null;
var initialObject = null;
globalThis.objSets = document.getElementById("objectSettings")
var myDropdown = document.getElementById("myDropdown")
/*function shape (mesh) {
	this.mesh = mesh;
	this.argsNames = [];
	this.argsValues =[];
	this.fName = "";
	this.fId = "";
	this.type = objToInsert;
	//this.color = "0xffff00"
}
drawObject = function (object) {
var o = new shape (object);
if (logo.userFunct){
	o.fId = logo.usedFunctions.length-1;
	var myFunct = logo.usedFunctions [o.fId];
	o.fName = myFunct.name ;
	o.argsNames = myFunct.funct.args;
	o.argsValues = myFunct.argsVal;
	o.color = myTurtle.color;
} 
sceneShapes.push (o)
shapeMeshes.push (object)
scene.add( object );



return o;
}*/

/*generateCube = function (size){
var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( {color: myTurtle.color} );
var cube = new THREE.Mesh( geometry, material );
cube.scale.x = size;
cube.scale.y = size;
cube.scale.z = size;
cube.position = myTurtle.position
return drawObject (cube);

}
generateSphere = function (name){
var geometry = new THREE.SphereGeometry(1, 30, 30);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh(geometry, material );
sphere.scale.x = 20;
sphere.scale.y = 20;
sphere.scale.z = 20;
sphere.name = name;
return drawObject (sphere);

}

generateCylinder = function (name){
var geometry = new THREE.CylinderGeometry( 1, 1, 1, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.scale.x = 20;
cylinder.scale.y = 20;
cylinder.scale.z = 20;
cylinder.name = name
return drawObject( cylinder );

}
generateTorus = function (name){
var geometry = new THREE.TorusGeometry( 10, 4, 16, 100 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var torus = new THREE.Mesh( geometry, material );
torus.name = name;
return drawObject( torus );

}
function generatePyramid (name) {
var pyramidGeometry = new THREE.CylinderGeometry(0, 1, 1, 4);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00 } );
var pyramid = new THREE.Mesh( pyramidGeometry, material );
pyramid.name = name;
pyramid.scale.x = 30;
pyramid.scale.y = 30;
pyramid.scale.z = 30;
return drawObject( pyramid );

}
getSceneObject = function (n) {
for (var i =0; i < sceneShapes.length; i++)	{
	if (sceneShapes[i].mesh.name == n)
		return sceneShapes[i].mesh;
}
return null;

}*/

function setObjectPosition (o, newPos){
	o.position = newPos;
	if (logo.userFunct){
		for (var i=0; i<sceneShapes.length; i++){
			if (o == sceneShapes[i].mesh)
				break;
		}

		sceneShapes[i].fId = logo.usedFunctions.length-1;
		var myFunct = logo.usedFunctions [sceneShapes[i].fId];
		sceneShapes[i].fName = myFunct.name ;
		sceneShapes[i].argsNames = myFunct.funct.args;
		sceneShapes[i].argsValues = myFunct.argsVal;
	}
}


 function setObjectScale(o, newScale){
	o.scale.x = newScale.x;
	o.scale.y = newScale.y;
	o.scale.z = newScale.z;
	if (logo.userFunct){
		for (var i=0; i<sceneShapes.length; i++){
			if (o == sceneShapes[i].mesh)
				ob = i;
				break;
		}

		sceneShapes[i].fId = logo.usedFunctions.length-1;
		var myFunct = logo.usedFunctions [sceneShapes[i].fId];
		sceneShapes[i].fName = myFunct.name ;
		sceneShapes[i].argsNames = myFunct.funct.args;
		sceneShapes[i].argsValues = myFunct.argsVal;
	}
}

function setObjectRotation(o, newRotation){
	o.rotation.x = newRotation.x;
	o.rotation.y = newRotation.y;
	o.rotation.z = newRotation.z;
	if (logo.userFunct){
		for (var i=0; i<sceneShapes.length; i++){
			if (o == sceneShapes[i].mesh)
				ob = i;
				break;
		}

		sceneShapes[i].fId = logo.usedFunctions.length-1;
		var myFunct = logo.usedFunctions [sceneShapes[i].fId];
		sceneShapes[i].fName = myFunct.name ;
		sceneShapes[i].argsNames = myFunct.funct.args;
		sceneShapes[i].argsValues = myFunct.argsVal;
	}
}
export function setObjectColor(o, newColor){
	var hexColor = rgbToHex (newColor[0], newColor[1], newColor[2])
	o.material = new THREE.MeshBasicMaterial({color:new THREE.Color( hexColor )});

}
 function duplicateObject (o){
	var newO, newName,a ;
	var i=1;
	while (1){
		newName = o.name + i.toString();
		if (getSceneObject(newName)!=null)
		i++ ;
		else break;}
		var newO = new THREE.Mesh( o.geometry, o.material );
		newO.name = newName;
		a = drawObject(newO);
		a.mesh.position = o.position;
		a.mesh.rotation = o.rotation;
		a.mesh.scale = o.scale;

}

function hideObject (o){
	o.visible = false;
	if (logo.userFunct){
		for (var i=0; i<sceneShapes.length; i++){
			if (o == sceneShapes[i].mesh)
				ob = i;
				break;
		}

		sceneShapes[i].fId = logo.usedFunctions.length-1;
		var myFunct = logo.usedFunctions [sceneShapes[i].fId];
		sceneShapes[i].fName = myFunct.name ;
		sceneShapes[i].argsNames = myFunct.funct.args;
		sceneShapes[i].argsValues = myFunct.argsVal;
	}
}

function showObject (o){
	o.visible = true;
	if (logo.userFunct){
		for (var i=0; i<sceneShapes.length; i++){
			if (o == sceneShapes[i].mesh)
				ob = i;
				break;
		}

		sceneShapes[i].fId = logo.usedFunctions.length-1;
		var myFunct = logo.usedFunctions [sceneShapes[i].fId];
		sceneShapes[i].fName = myFunct.name ;
		sceneShapes[i].argsNames = myFunct.funct.args;
		sceneShapes[i].argsValues = myFunct.argsVal;
	}
}
function setWireframe (o){
	//TODO
}
function openObjSettings(objType) {
	var ok = document.getElementById("ok")
	var scalex = document.getElementById("scaleX");
	var scaley = document.getElementById("scaleY");
	var scalez = document.getElementById("scaleZ");
	 objToInsert = objType;
	 switch (objType) {
	 		case "cube":
	 			scalex.value = 30
	 			scaley.value = 30
	 			scalez.value = 30
	 			break;
	 		case "pyramid":
				scalex.value = 30
				scaley.value = 30
				scalez.value = 30
	 			break;
	 		case "sphere":
			scalex.value = 20
			scaley.value = 20
			scalez.value = 20
	 			break;
	 		case "cylinder":
				scalex.value = 20
				scaley.value = 20
				scalez.value = 20
	 				break;
	 		default: break;

	 	}
	 objSets.style.display = "block"
	 ok.onclick = function() {getObjSettings(1,null);};
}

function getObjSettings(action, obj) {  //action : 1 = new object 2 = modify object

var name = document.getElementById("objName").value;
if(name==""){
	alert ("please fill in a name!")
	return;
}
var position = {"x": parseFloat(document.getElementById("posX").value), "y": parseFloat(document.getElementById("posY").value),  "z": parseFloat(document.getElementById("posZ").value)}
var rotation = {"x": parseFloat(document.getElementById("rotX").value),"y": parseFloat(document.getElementById("rotY").value),"z":  parseFloat(document.getElementById("rotZ").value)}
var scale = {"x": parseFloat(document.getElementById("scaleX").value), "y": parseFloat(document.getElementById("scaleY").value),"z":  parseFloat(document.getElementById("scaleZ").value)}
var color = document.getElementById("objColor").value.split ("#");
var newColor = "0x"+color[1]
var newObj, o;
if(action == 1) {
	o= createNewObject(objToInsert, name)
	o.color = newColor;
	newObj = o.mesh
}
else {
	newObj = obj;
}

//setObjectAttributes (newObj,position,rotation,scale,newColor);
objSets.style.display = "none";
myDropdown.style.display = "none";
resetObjSettings();
}
function setObjectAttributes (o, pos, rot, sc, col) {
	setObjectPosition(o, pos);
	setObjectRotation(o, rot);
	setObjectScale(o, sc);
	o.material =  new THREE.MeshBasicMaterial({color:new THREE.Color( col )});
}
function createNewObject (type, name){
	var newObj = null;
	switch (type) {
			case "cube":
				newObj = generateCube(name);
				break;
			case "pyramid":
				newObj = generatePyramid(name);
				break;
			case "sphere":
				newObj = generateSphere (name);
				break;
			case "cylinder":
					newObj = generateCylinder(name);
					break;
					break;
			default: break;

		}
		return newObj;
}
function cancelSettings () {
if (activeObj!=null){
	activeObj.position.x = initialObject.initiPos.x;
	activeObj.position.y = initialObject.initiPos.y;
	activeObj.position.z = initialObject.initiPos.z;
	activeObj.rotation.x = initialObject.initiRot.x;
	activeObj.rotation.x = initialObject.initiRot.y;
	activeObj.rotation.x = initialObject.initiRot.z;
	activeObj.scale.x = initialObject.initiScale.x;
	activeObj.scale.y = initialObject.initiScale.y;
	activeObj.scale.z = initialObject.initiScale.z;
}
resetObjSettings ();
myDropdown.style.display = "none";
objSets.style.display = "none";
}
function resetObjSettings () {
document.getElementById("objName").value = "";
document.getElementById("posX").value = "0"
document.getElementById("posY").value	= "0"
document.getElementById("posZ").value	= "0"
document.getElementById("rotX").value	= "0"
document.getElementById("rotY").value	= "0"
document.getElementById("rotZ").value	= "0"
document.getElementById("scaleX").value	= "1"
document.getElementById("scaleY").value	= "1"
document.getElementById("scaleZ").value	= "1"
document.getElementById("objColor").value = "#FF0000"
document.getElementById("delete").style.visibility = "hidden";
activeObj = null;
initialObject = null;
}

export function loadObjSettings (objClicked, cx, cy) {
	activeObj =objClicked;
  initialObject = { initiPos:jQuery.extend(true, {}, objClicked.position), initiRot : jQuery.extend(true, {}, objClicked.rotation), initiScale : jQuery.extend(true, {}, objClicked.scale)}

	var ok = document.getElementById ("ok");
	var deleteB = document.getElementById("delete")
	var duplicateB = document.getElementById("duplicate")
	document.getElementById("objName").value = objClicked.name.toString();
	document.getElementById("posX").value = objClicked.position.x
	document.getElementById("posY").value	= objClicked.position.y;
	document.getElementById("posZ").value	= objClicked.position.z;
	document.getElementById("rotX").value	= objClicked.rotation.x;
	document.getElementById("rotY").value	= objClicked.rotation.y;
	document.getElementById("rotZ").value	= objClicked.rotation.z;
	document.getElementById("scaleX").value	= objClicked.scale.x;
	document.getElementById("scaleY").value	= objClicked.scale.y;
	document.getElementById("scaleZ").value	= objClicked.scale.z;
	//document.getElementById("objColor").value = "#FF0000"
	objSets.style.display = "block";
	objSets.style.position = "absolute";
	deleteB.style.visibility = "visible";
	duplicateB.style.visibility = "visible";

	//objSets.style.top =cy - objClicked.boundRadius + "px";
	//objSets.style.left = cx - objClicked.boundRadius  + "px";
	ok.onclick = function() {getObjSettings(2,objClicked);};
	deleteB.onclick = function() {
		deleteObject(objClicked);
		objSets.style.display = "none";
		resetObjSettings();
	};
	duplicateB.onclick = function () {
		duplicateObject(objClicked);
		objSets.style.display = "none";
		resetObjSettings();
	}

}
export function updatePosX (v) {
	if(activeObj !=null)
activeObj.position.x = v;
}
export function updatePosY (v) {
	if(activeObj !=null)
activeObj.position.y = v;
}
export function updatePosZ (v) {
	if(activeObj !=null)
activeObj.position.z = v;
}
export function updateRotX (v) {
	if(activeObj !=null)
activeObj.rotation.x = v;
}
export function updateRotY (v) {
	if(activeObj !=null)
activeObj.rotation.y = v;
}
export function updateRotZ (v) {
	if(activeObj !=null)
activeObj.rotation.z = v;
}

export function updateScaleX (v) {
	if(activeObj !=null)
activeObj.scale.x = v;
}

export function updateScaleY (v) {
	if(activeObj !=null)
activeObj.scale.y = v;
}

export function updateScaleZ(v) {
	if(activeObj !=null)
activeObj.scale.z = v;
}

export function updateColor(v) {
	if(activeObj !=null){
	activeObj.material = new THREE.MeshBasicMaterial({color:new THREE.Color( v )});
	}
}
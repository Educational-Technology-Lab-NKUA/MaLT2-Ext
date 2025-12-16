// get/set methods

function getCode () {
	return editor.getValue(); 
	}
	
function setCode (code) {
	editor.setVlaue (code);
	}

function getCharacter () {
	return characters.value;
	}
	
function setCharacter (char) {
	characters.value = char;
	changeCharacter (char);
	}

function getNotes () {
	return notes.value;
	}
function setNotes (text) {
	notes.value = text;
	}
	
function getCameraPosition () {
	return camera.position;
	}
	
function setCameraPosition (pos) {
	camera.position.set (pos[0], pos[1], pos[2]);
	}
	
//returns a string with the code that creates the current trace on scene. if there is no trace returns the string "/"
function getTrace () { 			
	var sceneCode ="";
	if (traceCode.length >0){
		for (var k = 0; k <traceCode.length; k++) { 			//scene code
		sceneCode = sceneCode + traceCode[k].name + " ";
			if (traceCode[k].args!=null){
			for (var j=0; j < traceCode[k].args.length; j ++ ) {			//args
				sceneCode = sceneCode + traceCode[k].args[j]+" ";
			}
			}
		}}
	else {
				
		sceneCode = "/" ;
	}
	return sceneCode;
	}

//draws a new trace to the scene according to the trCode	
function setTrace (trCode) {
	fromOpenFile = true;
	clean ();
	run (trCode ,false);
	fromOpenFile = false;
}

function createJSON () {
	cameraPos = getCameraPosition();
	var instance = '{"code":"'+getCode()+'","character":"'+getCharacter()+'","trace":"'+getTrace()+'","cameraPos":"'+cameraPos.x +' ' + cameraPos.y +' '+cameraPos.z+'","notes":"'+getNotes()+'"}'
	var obj = JSON.parse(instance);
	return obj;
	}
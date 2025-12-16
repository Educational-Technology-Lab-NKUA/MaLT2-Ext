// get/set methods
import { retrieveArgs } from './init.js';
import { readJSON } from './saveLoadFile.js';
globalThis.onplatform = false;
export function setUpCommunication()
{
	//create a wiil instance
		try {
			var wiil = Wiil.getInstance();
			onplatform = true;
		} catch (e) {
			if (e instanceof ReferenceError) {
				onplatform = false;
			}
		}

	globalThis.wiil = Wiil.getInstance();

	//register this component as [malt] with wiil
	globalThis.componentID = "malt";
	wiil.setComponentID(componentID);

	//register host page as peer with its name
	globalThis.peer = window.parent.name;
	wiil.register(false, peer, parent);

	//set up my public interface
	globalThis.events = {'elements': [{'name': 'camera', 'events': ['rotate', 'zoomIn','zoomOut','switch_view']}, {'name': 'trace', 'events': ['click']}, {'name': 'editor', 'events': ['proc_definition','proc_execution', 'multi_execution', 'command_execution']}, {'name': 'slider', 'events': ['change']}]}

	//set up public interface
	wiil.pushFunction
	(
		"logData",
		function(data)
		{
			console.log(data);
		}
	);

	wiil.pushFunction
	(
		"setState", // state is a JSON object that holds all the info needed to initialise or reset the state of the malt instance
		function(state)
		{
			if (jQuery.isEmptyObject(state.initial_state)){
				maltWid.resetState();
			}
			else {
			var res = maltWid.setState(state.initial_state);
		}
		}
	);

	wiil.pushFunction
	(
		"getState", // the function returns the state of the malt instance as a JSON object
		function()
		{
			return maltWid.getState();
		}
	);

	wiil.pushFunction
	(
		"getMetaData", 	// the function returns a JSON object that shows the types of elements we can have in a malt instance and the events they can be associated with
		function()
		{
			return events;
		}
	);

	}



function getCode () {
	return editor.getValue(); 
	}

	function getHiddenCode () {
		return hiddenText;
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
	
	function getTrace () {
		var sceneCode ="";
		if (traceCode.length >0){
			for (var k = 0; k <traceCode.length; k++) { 			//scene code
			sceneCode = sceneCode + traceCode[k].name + " ";
			var argsVal = traceCode[k].args;			
				if (argsVal!=null){
				for (var j=0; j < argsVal.length; j ++ ) {			//args
					var commandArg = argsVal[j];
					if (traceCode[k].name == "make" && j==0) {
						sceneCode = sceneCode + '"'+ commandArg.data + " "
					} 
					else{
						if (commandArg.type=="var"){
							sceneCode = sceneCode +":" + commandArg.data +" ";
						}
						else
					sceneCode = sceneCode + commandArg.data +" ";
	
					}
					if (commandArg.type != "num"){
	
						var tokenArgsArray = retrieveArgs (commandArg)
						//console.log (tokenArgsArray);
	
						for (var l =0; l<tokenArgsArray.length; l++){
						 sceneCode = sceneCode+  tokenArgsArray[l] +" ";
						}
						if (commandArg.type == "lst")
						sceneCode = sceneCode + "]"
	
					}
				}
				}
			}}
		else {
	
			sceneCode = "" ;
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
	
	function getSliderState () {
		var sliderArgs =[];
		var sliderF = null;
		var sliderObj = {};
		var usedFunctions = logo.usedFunctions;
		if (slidersOn) {
	
			for (var i = 0; i<usedFunctions.length; i++){
				if (usedFunctions[i].functId == sliderFunctionId){
					sliderF = usedFunctions[i];
				}
			}
			if(sliderF!=null){
			for (var i = 0; i< sliderF.argsVal.length; i ++){
			 sliderArgs.push( {"arg":sliderF.argsVal[i].data, "min": $('#'+i+'_min').val(), "max":  $('#'+i+'_max').val(), "step": $('#'+i+'_step').val()} );
			}
			 sliderObj = {"fid": sliderFunctionId , "fname": sliderF.name, "values":sliderArgs }
			}
		}
		return sliderObj;
	}

	export function sendState ()
	{   //sends the current state to host. It is called when the button "save online" is clicked by the teacher
		console.log ("Sending state:")
		var currentState = maltWid.getState();
		var message = wiil.createMessage(null, "saveState", [currentState], null);
		wiil.sendMessage(peer, message);
	};

	export function sendEvent (msg)
	{
		console.log ("Sending event:")
		console.log (msg)
		var message = wiil.createMessage(null, "logAction", [msg], null);
		wiil.sendMessage(peer, message);
	}
	//Send a message when everything has loaded
	export function sendReady ()
	{
		//ask host page to register this component as peer
		var message = wiil.createMessage(null, "register", [true, componentID], null);
		wiil.sendMessage(peer, message);
		// var msg = "ready"
		// var message = wiil.createMessage(null, "logAction", [msg], null);
		// wiil.sendMessage(peer, message);
	};
	export function getCurrentState () {
		var codeInEdittor = getCode();
		var hidden = getHiddenCode();
		var sceneCode = getTrace();
		var cameraPosition = getCameraPosition();
		var character  = getCharacter()
		var sliderObj = getSliderState();
		var notesText = getNotes();
		if (notesText == " ")
			notesText = null;
		var stateJSON = { "editorCode": codeInEdittor, "hiddenCode":hidden, "sceneCode":sceneCode, "cameraPos":cameraPosition, "character":  character, "notes":  notesText, "sliders": sliderObj};
	 return stateJSON;
	}

	export function setCurrentState(data) {
		fromLauch = true;
		console.log (data)
		maltWid.state = data;
		readJSON(data)
		fromLauch = false;
		return "MALT SET STATE: OK";

	}
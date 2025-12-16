import { getCurrentState, setCurrentState, sendEvent } from './states.js';
globalThis.fromLauch = false;
globalThis.launchData = null;
globalThis.launchRun = false;
globalThis.logOption = true; 
globalThis.codeEventSent = false;
globalThis.counteProceduresSent = false;
export function maltWidget (editor) {
	this.send = false;
	this.editor = editor
	this.definedFunctions = [];
	this.state = null;
	this.cameraId = "camera1";
	this.editorId = "logoEditor1"
	this.sceneId = "scene1"

	this.condtionalCount = 0; this.iterationCount = 0; this.iterationCondCount = 0; this.structureEventCount = 0;this.correctParametrsCounter=0;
	this.procedursCountEvent =0;
	this.getState = function(){
		var state = getCurrentState ();
		console.log ("sending state:")
		console.log (state)
		return state;
		}
	this.setState = function(data){
		setCurrentState(data);

		}

		this.resetState = function () {
			var defaultValues = { "editorCode": "", "hiddenCode":"", "sceneCode":"", "cameraPos":{'x' :0, 'y': 1.2246, 'z': 200}, "character":  "Bird", "notes":  "", "sliders": {}, "objects" : [] , "logOptions": analyticsOptions};
			this.setState (defaultValues)
		}

		// !!!!!!!!!! LOGGING !!!!!!!!!

	this.initializeLogParams = function () {
		globalThis.activity_Started = false  //activity starts on the first camera rotation or code execution. For camera rotation changes at Three.min.js line 622
		globalThis.logo_executions = 0
		globalThis.multiExecutCounter = 0;
		globalThis.commandExecutionCounter = 0;
		globalThis.num_of_procedures = 0;   // changes at logo.js l.868
		globalThis.camera_evets_counters = {overall: 0, lastExec: 0};
		globalThis.clcikTrack_events = {overall: 0, lastExec: 0};
	globalThis.definitionsCounter = 0;
	globalThis.keywordEventCount  =0;
	}
	this.activityStarted = function() {
		if (!this.activity_Started){
		var time = moment.utc().format("x");
		this.activity_Started = true;
		var feedbackMsg = { 'type': "activity",  'state': "started",   "timestamp" : time };
		sendEvent(feedbackMsg);
}

}
	this.cameraAction = function (type) {

		if(!fromOpenFile && !fromLauch){

		camera_evets_counters.overall ++;
		camera_evets_counters.lastExec ++ ;
		var currentdate = new Date();
		var time = moment.utc().format("x");
		var  trackCount =0;
		for (var i=0; i < traceCode.length; i ++){
			if (traceCode[i].origin == "user")
				trackCount ++;
		}
		var cam_state = {view_type: cameraView,  event_count: camera_evets_counters.overall, event_last_count:camera_evets_counters.lastExec};

		var feedbackMsg = { 'id': this.cameraId, 'type': "camera",  'state': cam_state, 'event': type,  "timestamp" : time };
		sendEvent(feedbackMsg);
		}

		}
	this.addFunction = function (code){ 			//it is called when a logo procedure is defined or redefined (logo.js lines ~ 1163,1171)
		if(!fromSliders){
		var time = moment.utc().format("x");
		var name = code.data;
		var args = code.args.args;
		var params = [];
		var redifineFunction = false;

		for (var i=0; i<args.length; i++){			//retrieve the name of parameters
			params.push (args[i].data)
		}
		for (var i = 0; i<this.definedFunctions.length; i ++) {			//check if its a redefinition
			if (	this.definedFunctions[i].name == name) {
				redifineFunction = true; break;
			}
		}
		if (!redifineFunction){					// new funciton (by name)
		var newF = {"name": name, "argsNum": args, "timesExecuted":0}
		this.definedFunctions.push (newF);
		this.num_of_procedures ++;
			}
				if ((!fromLauch) && (!fromOpenFile)){
			 definitionsCounter ++ ;
		var defState = {"definition" : {}, position:{start:{row: codeRange.start.line, col: codeRange.start.ch}, end: {row: codeRange.end.line, col: codeRange.end.ch}}, value:{proc_name: name, parameter_names:params, code: edit }, event_count: definitionsCounter};
		var feedbackMsg = { 'id': this.editorId , 'type':"editor", 'state' : defState, "event": "proc_definition", "timestamp" : time}
		sendEvent(feedbackMsg);   //send the definition logging message
		

	}
}

}




	this.functionExecuted = function(funcName, code){				//triggered when a defined procedure is called i.e. test 10 20

		if(!fromOpenFile && !fromLauch && !fromSliders){

		var time = moment.utc().format("x");
		for (var i=0; i<this.definedFunctions.length; i++){
			var params =[];
			if (this.definedFunctions[i].name == funcName){
				for (var j=0; j<this.definedFunctions[i].argsNum.length; j++){
					params.push (this.definedFunctions[i].argsNum[j].data)
				}
				this.definedFunctions[i].timesExecuted++;

				break;
				}

			}
		var values = []
		for (var k =0; k<code.args.length; k++){
			values.push (code.args[k].data)
		}
		if (Object.keys(codeRange).length > 0){
		if (!this.send){

			var exState = {"definition" : {}, position:{start:{row: codeRange.start.line, col: codeRange.start.ch}, end: {row: codeRange.end.line, col: codeRange.end.ch}},  value:{proc_name: funcName, parameter_names:params,parameter_values:values}, event_count: this.definedFunctions[i].timesExecuted, "tracking" : true};
			//var msg = '{ "action": "logo_execution", "num_of_procedures":"'+ this.num_of_procedures  +'", "procedure_name":"'+funcName+'", "procedure_parameters_count":"'+this.definedFunctions[i].argsNum+'", "execution_count":"'+this.definedFunctions[i].timesExecuted+'", "timestamp":"'+time+'"}';
		var feedbackMsg = { 'id': this.editorId , 'type':"editor", 'state' : exState, "event": "proc_execution" ,  "timestamp": time}
			sendEvent(feedbackMsg)
		
		this.send = true;
		}
		}
	}

		}

		this.commandExecution  = function(cmdName, code){    //called when logo commands are executed outside a function
			if(!fromLauch && !fromSliders && !fromOpenFile){

				var time = moment.utc().format("x");
				var values = []
				for (var k =0; k<code.args.length; k++){
					values.push (code.args[k].data)
				}
				
					commandExecutionCounter ++;
					var exState = { position:{start:{row: codeRange.start.line, col: codeRange.start.ch}, end: {row: codeRange.end.line, col: codeRange.end.ch}},  value:{cmd_name: cmdName, parameter_values:values}, event_count: commandExecutionCounter};
				var feedbackMsg = { 'id': this.editorId , 'type':"editor", 'state' : exState, "event": "command_execution" ,  "timestamp": time}
					sendEvent(feedbackMsg)
			
				}
				
		
		}


		this.parameterTracking = function (funcName, params, values){
				var time = moment.utc().format("x");
					var feedbackMsg , state = {}
			var correct = true;
			var absolutParamsLength = analyticsOptions.an_params_absolute.length
			if (absolutParamsLength==values.length) {
				for (var i =0; i< absolutParamsLength; i++){
					if(analyticsOptions.an_params_absolute[i] != values[i]){
					correct = false; break;
				}
				}
			}
			else correct = false
			if (correct) {
				var state = {'solution_kind': "absolute", 'values': values, event_count: this.correctParametrsCounter, 'tracking':analyticsOptions.logCodeModification}
				var	feedbackMsg = { 'id': this.editorId, 'type':"editor", "state": state , 'event': "correctParameters", "timestamp" : time };
					sendEvent(feedbackMsg)
					this.correctParametrsCounter ++;
			}
			var relativeParamsLength = analyticsOptions.an_params_relative.length
			var base = null;
			if (relativeParamsLength==values.length){
				for (var i=0; i<relativeParamsLength; i++){
					if (analyticsOptions.an_params_relative[i] == 1){
						base = analyticsOptions.an_params_relative[i];
						baseId = i;
						break;
					}
				}
				correct = true;
				if (base !=null) {
					for (var i=0; i<relativeParamsLength; i++){
						if (analyticsOptions.an_params_relative[i]!= base){
							if (values[i] != parseInt(analyticsOptions.an_params_relative[i])*values[baseId])
								correct = false; break;
						}
					}
					if (correct) {
						var state = {"solution_kind": "relative", 'values': values, 'event_count': this.correctParametrsCounter, 'tracking':analyticsOptions.logCodeModification}
						var	feedbackMsg = { 'id': this.editorId, 'type':"editor", 'state': state , 'event': "correctParameters", 'timestamp': time};
							sendEvent(feedbackMsg)
							this.correctParametrsCounter ++;
					}
				}
				else {console.log ("for the relative solution you should have one 1 indicating the base parameter to which the others are related")}
			}


		}
	this.multipleExcution = function(code, FuncExec, FuncDef){		//execution of commands outside a procedure
			if(!fromLauch && !fromSliders && !fromOpenFile){
				var time = moment.utc().format("x");
				this.multiExecutCounter++;
				var state = {"definition" : {"rawCode": code, "procDefined": FuncDef, "procExeucted": FuncExec }, position:{start:{row: codeRange.start.line, col: codeRange.start.ch}, end: {row: codeRange.end.line, col: codeRange.end.ch}}, "event_count" : this.multiExecutCounter};
				var feedbackMsg = { 'id': this.editorId , 'type':"editor", 'state' : state, "event": "multi_execution", "timestamp" : time}
				sendEvent(feedbackMsg);   //send the definition logging message
				this.procedursCountEvent++;
				this.send = true;

			}
			
		}
		

	this.redifine = function(funcName, argsNum){

		}

	this.sliderAction = function (obj){
		if(!fromOpenFile && !fromLauch){
		
		if(!launchRun){
			var time = moment.utc().format("x");
		var sState = {value: obj.final_value, definition:{proc_name: obj.procedure_name, min: obj.min, max: obj.max, step: obj.step, initialvalue: obj.initial_value, exeprduration: obj.durationSecs, variable: obj.slider_name}}
		var feedbackMsg = { 'id': obj.slider_id, 'type':"slider", 'state' : sState, 'event': "change", 'timestamp' : time};
		sendEvent(feedbackMsg)
		}
	
	}
	}

	this.codeMod = function (){ 								//code modification by characters

if((!fromLauch) && (!codeEventSent)){
		var time = moment.utc().format("x");
					var time = moment.utc().format("x");
					var state = { 'mod_char_count':charactersTyped, 'tracking':analyticsOptions.logCodeModification}
					var feedbackMsg = { 'id' : this.editorId, "type":" editor" , "state": state, "event":"code_min_changed", 'timestamp': time};
		sendEvent(feedbackMsg)
		codeEventSent = true;
			}


}
		this.keywordEvent = function (wordID, trackedTimes){    //keywords logging

			if(!fromLauch){
					var time = moment.utc().format("x");
			this.keywordEventCount ++;
			var time = moment.utc().format();
					var	codeRange = {start: editor.getCursor(true), end: editor.getCursor(false)};
			var state =  { definition:{}, position:{},
			value:{keyword:analyticsOptions.an_code_keywords[wordID], occurrences:trackedTimes}, event_count : this.keywordEventCount, 'tracking':analyticsOptions.logCodeModification}

			var feedbackMsg = { 'id' : this.editorId, "type":" editor" ,  "state":state, "event":"keyword_found", 'timestamp': time};
			sendEvent(feedbackMsg)

		}

	}
	this.structureEvent= function (type, trackedTimes){    //structures logging

		if(!fromLauch){
			var time = moment.utc().format("x");
			if(type == "conditional"){
				if (analyticsOptions.an_code_cond ){
				this.structureEventCount ++;
				var state =  {'structure' : type, 'occurrences': trackedTimes,'event_count' : this.structureEventCount, 'tracking':analyticsOptions.logCodeModification}
			}
			else return;
			}
			else if (type == "iteration"){
					if (analyticsOptions.an_code_iteration ){
				this.structureEventCount ++;
				var state =  {'structure' : type, 'occurrences': trackedTimes,'event_count' : this.structureEventCount, 'tracking':analyticsOptions.logCodeModification}
			}
			else return;
			}
			else {
				if (analyticsOptions.an_code_condIteration ){
					this.structureEventCount ++;
					var state =  {'structure' : type, 'occurrences': trackedTimes,'event_count' : this.structureEventCount, 'tracking':analyticsOptions.logCodeModification}
				}
			else return;
			}
		var feedbackMsg = { 'id' : this.editorId, "type":" editor" ,  "state":state, "event":"structure_found", "timestamp" : time};
		sendEvent(feedbackMsg)
	}

}
		this.trackClicked = function (definition, pos, objid) {
			if(!fromOpenFile && !fromLauch){
			var time = moment.utc().format("x");
			clcikTrack_events.overall  ++;
			clcikTrack_events.lastExec ++;
			var clickState = {definition: definition,  event_count: clcikTrack_events.overall, event_last_count: clcikTrack_events.lastExec, position: pos, 'tracking':true}
			//console.log (clickState);
			var feedbackMsg = {'id': objid, 'type': "trace",'state': clickState, 'event': "click" ,  "timestamp" : time}
			sendEvent(feedbackMsg)
		}

		this.sendFunction = function (a) {

		}
	}
}

import {run, resetCanvas, retrieveArgs,changeCharacter} from './init.js';
import {createSliders} from './sliders.js';
	  document.getElementById('files').addEventListener('change', readSingleFile, false);
		 globalThis.fromOpenFile= false;
		function openInstance(option, examplename){
		
			if (option == 1){		//open file from online examples
			//var filename = window.location.href.split( '?' );
			
				var lang = examplename[1].split ('_');
				 if (lang[1]=="Gr")
				 	changeLanguage();
				 filepath = "Instances/" + examplename[1] +".mlt"
				 $.get(filepath, function(data) {
		               		readJSON(JSON.parse(data));
		            }, "text")

			}
			}
		


	export function appearSaveBox (type) {

		if (language == "Gr")
    var fileName = prompt("Όνομα αρχείου", "");
	else  var fileName = prompt("File Name", "");
    //console.log(fileName);
    if (fileName == "")
	{
		var d = new Date ();
		fileName = "MaLT+ "+d.toDateString();

		}
	if(type ==1) {			//save only the logo code
    var    data = saveTextAsFile (fileName);
    		}
	else {				//save logo code and current state

		data = saveAllAsFile (fileName);

		}

		var textFileAsBlob = new Blob([data], {type:'text/plain'});
	//console.log (textFileAsBlob.size)
	if (type == 1)
	var fileNameToSave = fileName + ".txt";
	else
	var fileNameToSave = fileName + ".mlt";
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSave;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();



	}

		function saveTextAsFile(fileName)
{
	var myDoc = editor.getValue();
	var textToWrite = myDoc;

		return textToWrite;

}
	function saveAllAsFile (fileName){

		var sceneCode =""
		var codeInEdittor = "";
		var cameraPosition = null;
		var sliderArgs =[];
		var sliderF = null;
		var sliderObj = {};
		var textToWrite = "";
		var objects = [];
		var notesText = document.getElementById("noteText").value;
		var commandArg;
		var command;
		if (notesText == " ")
			notesText = null;
		codeInEdittor = editor.getValue();
		var usedFunctions = logo.usedFunctions;
		if (usedFunctions.length >0){
		for (var i = 0; i <usedFunctions.length; i++)  			//scene code
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
						sceneCode = sceneCode +" " + command;
					}
		}
		cameraPosition = camera.position;
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
		if(sceneShapes.length>0) {
			for (var i = 0; i < sceneShapes.length; i++){
				var s = sceneShapes[i]
				if (s.fId === ""){			//It is a shape inserted by click and not by code
				var mesh = s.mesh;

				var newShape = {"type" : s.type, "name" : mesh.name, "position" : mesh.position, "rotation" : mesh.rotation, "scale" : mesh.scale, "visible": mesh.visible, "color": s.color,"argsNames" :s.argsNames, "argsValues" : s.argsValues, "fName" : s.fName, "fId":s.fId }
				objects.push (newShape);
			}
			}
		}
		var sceneJSON = { "editorCode": codeInEdittor, "hiddenCode":hiddenText, "sceneCode":sceneCode, "cameraPos":cameraPosition, "character":  document.getElementById("charSel").value , "notes":  notesText, "sliders": sliderObj, "objects" : objects };

		var textToWrite = JSON.stringify (sceneJSON);
		return textToWrite;
		}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function readSingleFile(evt) {
	
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
//	console.log (f.type);
  if (!f) {
        alert("Failed to load file");
    }/* else if (!f.type.match('text.*')) {
			if (language == "Gr")
				alert (f.name + " Δεν ειναι έγγυρο αρχείο. Παρακαλώ μεταφορτώστε ένα .txt αρχείο.");
				else
		    alert(f.name + " is not a valid file. Please browse a .txt file");
    }*/
	 else {
      var r = new FileReader();
      r.onload = function(e) {
	      var contents = e.target.result;
				try {var loadedJSON= (JSON.parse (contents))
					console.log (loadedJSON);
					readJSON (loadedJSON);
				}
				catch (e) {
					console.log(e)
					//oldFilesRead (contents)
				}


      }
      r.readAsText(f);
    }
  }


  function readJSON (jObj){
		globalThis.loadedCode = jObj.editorCode;
		var loadedHiddenCode = jObj.hiddenCode;
		globalThis.loadedScene= jObj.sceneCode;
		var loadedSliders = jObj.sliders;
		var loadedCamera = jObj.cameraPos;
		var loadedCharacter = jObj.character;
		var loadedNotes = jObj.notes;
		var loadedObjects = jObj.objects;
		globalThis.hiddenCode= "";
		var i,j,o,newO;
		editor.setValue (loadedCode);
		if (loadedHiddenCode !=null) {
			for  (var i=0; i< loadedHiddenCode.length; i ++){
				hiddenText.push (loadedHiddenCode[i])
				hiddenCode += loadedHiddenCode[i]
			}
		}
	  fromOpenFile = true;  //callback
	  exectueLoadedCode(function() {
		fromOpenFile = false;
		resetCanvas(1);
		
					if (loadedScene.length>0){
						run (loadedScene, false);
				   }
    });  
	
		if (loadedCamera != null ){
			 	camera.position.set (loadedCamera.x, loadedCamera.y, loadedCamera.z);
		}
			document.getElementById("charSel").value = loadedCharacter; //scene character scenestate[5]
			//changeCharacter (loadedCharacter);
			if(loadedNotes != null){
			document.getElementById("noteText").value = loadedNotes;}
			//console.log (slidersState[1]);
			if(loadedSliders.fid != null)  //there are sliders
			{

			for ( i = 0; i<sceneObjects.length; i ++){
					if (sceneObjects [i].fId == loadedSliders.fid ){
					createSliders(sceneObjects[i]);
					var args = loadedSliders.values
					console.log (args);
					for ( j = 0; j < args.length; j ++){

						$( "#"+j+"_min").val(args[j].min);
						$( "#"+j ).slider("option", "min", parseFloat(args[j].min));
						$( "#"+j+"_max").val(args[j].max);
						$( "#"+j ).slider("option", "max", parseFloat(args[j].max));
						$( "#"+j+"_step").val(args[j].step);
						$( "#"+j ).slider("option", "step", parseFloat(args[j].step));
						$( "#"+j).slider( "value", args[j].arg);
					}
					break;
					}
					}
				}
				
				fromOpenFile = false;
			}

			function exectueLoadedCode (_callback) {
				run (loadedCode,false);
					run (hiddenCode);
					
				_callback(); 
			
			}
function oldFilesRead (content){

				  var splitArray = content.split (/<!|!>+/);
				 //console.log (splitArray);
					  if(splitArray.length > 1) {

						//console.log ("Instance!");

						 editor.setValue (splitArray [2]);			//Logo Cod = splitArray [2]
						  fromOpenFile = true;
						  console.log (splitArray[2]);
						  run (splitArray [2],false);
						  resetCanvas(1);
						  fromOpenFile = false;
						  var sceneState = splitArray [4].split (/[{}]+/);
						  var slidersState = splitArray [6].split (/[#]+/);
						var notes = splitArray[8].split (/[{}]+/);

						if(sceneState[1]!=" /")
						  run (sceneState[1], false); 	//run the functions of turtle's trace (sceneState[1])
						  var pos = sceneState[3].split (" ");  //camera position = sceneState [3]
						 	camera.position.set (pos[0], pos[1], pos[2]);
							//scene.add(gridXZ);
							//scene.add(gridYZ);
							//scene.add(gridXY);
							//showGrid= true;
						document.getElementById("charSel").value = sceneState [5]; //scene character scenestate[5]
						//changeCharacter (sceneState [5]);
						if(notes[1]!=" " ){
							//document.getElementById("notes").style.visibility= "visible";
							//document.getElementById("notes").style.zIndex= 10;
							//console.log (document.getElementById("notes").style.visibility);
						document.getElementById("noteText").value = notes[1];}
						//console.log (slidersState[1]);
						if(slidersState[1] == "yes")  //there are sliders
						{
						var k = 5;
						//var sliderFunct = slidersState [
						for (var a=2 ; a<slidersState.length; a++){
							var funct = slidersState[a].split (/[{}]+/);
						for (var i = 0; i<sceneObjects.length; i ++){
								if ((sceneObjects[i].fName == funct [3]) && (sceneObjects [i].fId == funct [1])){
								createSliders(sceneObjects[i]);
								var args = funct [5].split (",");
								//console.log (args);
								for (var j = 0; j < args.length-1; j ++){
								if (a==slidersState.length-1) {

									k = k +2;

									var minmax = funct [k].split (",");
									$( "#"+j+"_min").val(minmax[0]);
									$( "#"+j ).slider("option", "min", parseFloat(minmax[0]));
									$( "#"+j+"_max").val(minmax[1]);
										$( "#"+j ).slider("option", "max", parseFloat(minmax[1]));
									$( "#"+j+"_step").val(minmax[2]);
									$( "#"+j ).slider("option", "step", parseFloat(minmax[2]));

									}
								$( "#"+j).slider( "value", args[j]);


								}
								break;
								}

								}
							}

						}
						  // do whatever to restore state
						  }
						else //it is just the code

						{

						editor.setValue (content);
						setTrace (content);


						}
				  }
					function getFromOpen () {return fromOpenFile;}

export {openInstance, getFromOpen, readJSON};

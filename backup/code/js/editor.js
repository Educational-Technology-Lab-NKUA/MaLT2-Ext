import {run} from './init.js';

 //Codemirror editor
 globalThis.hiddenText = [];
       CodeMirror.commands.hideText = function(cm) {
       var selection =  editor.getSelection();
	   if (selection.length > 0) {
		   editor.replaceSelection ("");
		   hiddenText.push(selection);

	   }
      }
	  CodeMirror.commands.showText = function(cm) {
		  var editorValue=editor.getValue()+ "\n";
      for (var i=0; i<hiddenText.length; i++){

		  editorValue += hiddenText[i]
		}
		hiddenText = [];
		editor.setValue (editorValue)
	   }

globalThis.editor = CodeMirror.fromTextArea(document.getElementById("code"), {matchBrackets: true,
	  lineNumbers: false,
	  styleActiveLine: true,
	  lineWrapping: true,
	   extraKeys : {  "Insert" :function (cm) {
		  play();

		   },
		  "Ctrl-H":  "hideText",
		  "Ctrl-Space": "showText"
	  }

	  });
export function getEditor (){
  return editor;
}

export function changeFontSize (size) {
  //var size = e.currentTarget.selectedOptions[0].value;
	$('.CodeMirror').css("font-size", size +"px");
	editor.refresh();

	}
  function runCode () {
  	var code = getCode();
  	run (code, false);
  	}
  function play (){
	globalThis.codeRange = {};
	maltWid.send = false;
	globalThis.edit = editor.getSelection ();
		  if (edit=="") {
				 multyExecut = false;
		   var cursor = editor.getCursor();
			editor.setCursor ({line: cursor.line});
			cursor = editor.getCursor ();
			codeRange = {start: editor.getCursor(true), end: editor.getCursor(false)};
			var ancor = {line: cursor.line, ch: 0}
		 	editor.setSelection (ancor,cursor);
		//	codeRange = {start: editor.getCursor(true), end: editor.getCursor(false)};
		 	edit = editor.getSelection();
			var  newLine = cursor.line+1;
		 	editor.setCursor ({line: newLine, ch:0});
		 }
		 else {
			 multyExecut = true;

			 codeRange = {start: editor.getCursor(true), end: editor.getCursor(false)};
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

function updateOldcodeText (newText) {
  	oldcode.innerHTML +="<br /> oops: "+newText;
    oldcode.scrollTop = oldcode.scrollHeight;

    if (oldcode.createTextRange) {
        var range = oldcode.createTextRange();
        range.collapse(false);
        range.select();
    }
}


changeFontSize (16);

export {updateOldcodeText, play, clean_oldcode};

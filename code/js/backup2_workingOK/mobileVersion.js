function adjustButtons () {
	document.getElementById("zoomIn").style.width = "30px"
	document.getElementById("zoomIn").style.height = "30px"
		document.getElementById("zoomOut").style.width = "30px"
	document.getElementById("zoomOut").style.height = "30px"
	document.getElementById("editorGrabBar").style.height = "40px"
		$('#mainGrabBar').css("font-size","20px");
	var buttons =     document.getElementsByClassName('buttons');
for(i=0; i<buttons.length; i++) {
   buttons[i].style.height=   '30px';
	 buttons[i].style.width=  '30px';
 }
 document.getElementById("save").style.width = "30px"
 document.getElementById("save").style.height = "30px"
 document.getElementsByClassName("drop-nav")[0].style.width = "200px"
 document.getElementById("camera").style.width = "80px";
 document.getElementById("camera").style.height = "80px";
	document.getElementById("pencolor").style.height = "25px";
	document.getElementById("bgcolor").style.height = "25px";
	document.getElementById("charSel").style.fontSize = "20px"
if (document.getElementById("editorGrabBar").offsetWidth < 250){
	
	
}
 document.getElementById("2dClean").style.height = "30px"
 document.getElementById("grid").style.height = "30px"
 document.getElementById("points").style.height = "30px"
 document.getElementById("minimize").style.height = "30px"
  document.getElementById("2dClean").style.width = "30px"
 document.getElementById("grid").style.width = "30px"
 document.getElementById("points").style.width = "30px"
 document.getElementById("minimize").style.width = "30px"
 document.getElementById("twoDVT").style.width = "30%"
 document.getElementById("min").style.width = "30px"
 document.getElementById("min").style.height = "30px"
 document.getElementById("notesgrabBar").style.height = "35px"
}
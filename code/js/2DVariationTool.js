// JavaScript Document var oldx,oldy=null;
 var points =[];
var isDrag = false;
var mx, my; // mouse coordinates
var mySel;
var mySelColor = '#CC0000';
tdcanvas  = document.getElementById("myCanvas");
 tdcanvas.addEventListener("mousedown", mouseDownListener, false);
  tdcanvas.addEventListener("mouseup", mouseUpListener, false);
    tdcanvas.addEventListener("mouseover", mouseOverListener, false);
  var ctx = tdcanvas.getContext("2d");
  
	 bRect = tdcanvas.getBoundingClientRect();
 // ctx.translate(0 ,tdcanvas.height);
  //ctx.scale(1, -1);
 function mouseOverListener (event){
	// console.log ("la");
	mx = (event.clientX - bRect.left)*(tdcanvas.width/bRect.width);
	my = (event.clientY - bRect.top)*(tdcanvas.height/bRect.height);
 for (i=0; i<points.length; i++){
		  
		 maxX = points[i].curX + 10;
		 maxY = points[i].curY + 10;
	//	console.log (mx, my, maxX, maxY);
		 if((mx<maxX)&&(mx>points[i].curX-4) && (my<maxY) &&(my>points[i].curY-4)){
			tdcanvas.style.cursor = 'pointer';
			 
			 }
	 
	 }
 }
 function mouseDownListener(event) {
	 if(tdactive){	
	event.preventDefault();


		mx = (event.clientX - bRect.left)*(tdcanvas.width/bRect.width);
		my = (event.clientY - bRect.top)*(tdcanvas.height/bRect.height);
		console.log (mx +" , "+  my);
		if(!testHit (mx,my)){
			if(showPoints){
			//draw a new point
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(mx,my,6,6);
			}
		//just change the value
			newpoint = {curX: mx, curY: my}
			points.push (newpoint);
			oldx=mx;
			oldy=my;
			calculateSliderValue(mx, my);
		}
		else { 	//click on a point
		if (isDrag) {
			tdcanvas.style.cursor = 'pointer';
			tdcanvas.addEventListener("mousemove", mouseMoveListener, false);
			}
					
		}
		
		tdcanvas.addEventListener("mousemove", mouseMoveListener, false);
	 }
 }
 function mouseMoveListener(evt) {
	 
		var posX;
		var posY;
		var minX = 0;
		var maxX = tdcanvas.width-2;
		var minY = 0;
		var maxY = tdcanvas.height -2;
		//getting mouse position correctly 
		var bRect = tdcanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(tdcanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(tdcanvas.height/bRect.height);
		
		//clamp x and y positions to prevent object from dragging outside of canvas
		posX = mouseX 
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mouseY 
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
		if(isDrag){
		points[dragIndex].curX = posX;
		points[dragIndex].curY = posY;
		calculateSliderValue (posX, posY);
		cleanTDCanvas();
		if (hasGrid)
		drawGrid();
		redrawShapes();
		}
		else {
		ctx.beginPath();
    	ctx.moveTo(oldx,oldy);
		ctx.lineTo(posX,posY);
		ctx.stroke();
		if (showPoints){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(posX,posY,6,6)}
		newpoint = {curX: posX, curY: posY}	
		points.push (newpoint);
		oldx=posX;
		oldy=posY;
		calculateSliderValue(posX, posY);
			
			}
	}
	
	
 function mouseUpListener(evt) {
			
			isDrag = false;
			tdcanvas.style.cursor = 'default';
			tdcanvas.removeEventListener("mousemove", mouseMoveListener, false);
		
	}
 function testHit (mouseX, mouseY) {
	 //console.log (mouseX , mouseY);
	 
	 for (i=0;i <points.length; i++){
		  
		 maxX = points[i].curX + 10;
		 maxY = points[i].curY + 10;
		
		 if((mouseX<maxX)&&(mouseX>points[i].curX-4) && (mouseY<maxY) &&(mouseY>points[i].curY-4)){
			dragHoldX = mouseX - points[i].curX;
			dragHoldY = mouseY - points[i].curY;
			 isDrag = true;
			 dragIndex = i;
			 return true;
			 
			 }
		 
		 }
		 return false;
	 
	 }
function redrawShapes () {

	for (i=0;i<points.length; i ++ ) {
		
		nx = points[i].curX;
		ny = points[i].curY;
		ctx.beginPath();
    	if (i!=0){
			ctx.moveTo(oldx,oldy);
		ctx.lineTo(nx,ny);
		ctx.strokeStyle = "#000000  ";
		ctx.stroke();
			}
		if (showPoints){
		if (i==dragIndex) ctx.fillStyle = "#000099";
		else ctx.fillStyle = "#FF0000";
		ctx.fillRect(nx,ny,6,6);}
		oldx=nx;
		oldy=ny;
		
		}
	
	}
function calculateSliderValue (canvasX, canvasY){
	if(tdaxisY!=null){
	sliderStepY = parseFloat(document.getElementById(tdaxisY+"_step").value);
	sliderMinY = parseFloat(document.getElementById(tdaxisY+"_min").value);
	sliderMaxY = parseFloat(document.getElementById(tdaxisY+"_max").value);
	sliderSlotsY = Math.floor((sliderMaxY - sliderMinY) / sliderStepY);
	canvasStepY =  (tdcanvas.height-2)/sliderSlotsY;
	actualY = (tdcanvas.height-2)-canvasY;
	tempY = Math.floor(actualY/canvasStepY);
	sliderValue = sliderMinY + tempY*sliderStepY;
	$( "#"+tdaxisY ).slider( "value", sliderValue);}
	//console.log ("sliderSlots: " + sliderSlots + "sliderValue: " + sliderValue);
	if (tdaxisX !=null){
	sliderStepX = parseFloat(document.getElementById(tdaxisX+"_step").value);
	sliderMinX = parseFloat(document.getElementById(tdaxisX+"_min").value);
	sliderMaxX = parseFloat(document.getElementById(tdaxisX+"_max").value);
	sliderSlotsX = Math.floor((sliderMaxX - sliderMinX) / sliderStepX);
	canvasStepX =  (tdcanvas.width-2)/sliderSlotsX;
	tempX = Math.floor(canvasX/canvasStepX);
	sliderValue = sliderMinX + tempX*sliderStepX;
	$( "#"+tdaxisX).slider( "value", sliderValue);
	}
	}
	
function manageGrid () {
	if (hasGrid) {
		document.getElementById("grid").src = ".//icons/grid.png";
		hideGrid();
		}
		else{
			document.getElementById("grid").src = ".//icons/grid_selected.png";
		drawGrid();}
	
	}
function drawGrid () {
	hasGrid = true;
	ctx.fillStyle = "#CCC";
	ctx.fillRect(0,0,tdcanvas.width,tdcanvas.height);
	for (var x = 0.5; x < tdcanvas.width; x += 10) {
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 381);
}

for (var y = 0.5; y < tdcanvas.height; y += 10) {
  ctx.moveTo(0, y);
  ctx.lineTo(tdcanvas.width-1, y);
}
ctx.strokeStyle = "#787878 ";
ctx.stroke();	
	redrawShapes();
	}	
function hideGrid ()	 {
	hasGrid = false;
	cleanTDCanvas();
	redrawShapes();
	
	
	}
function managePoints () {
	
	if(showPoints){
	document.getElementById("points").src = ".//icons/points.png";
	showPoints = false;}
	else{ showPoints = true;  document.getElementById("points").src = ".//icons/points_selected.png";}
	cleanTDCanvas();
	if (hasGrid)
		drawGrid();
	redrawShapes();
	
	
	}
function cleanTDCanvas () {
	ctx.fillStyle = "#CCC";
	ctx.fillRect(0,0,tdcanvas.width,tdcanvas.height);
	oldx= null;
	oldy = null;
	//points = [];
	
	}
function resetTDCanvas () {
	cleanTDCanvas();
dragIndex = null;
	points = [];
	if (hasGrid)
		drawGrid();
	
	}
	
function minimizeTDCanvas() {
	if(isMinimized){
		$("#myCanvas").slideToggle();
		isMinimized = false;
		document.getElementById("minimize").src = ".//icons/minimize.png";
		}
		else {
		$("#myCanvas").slideToggle();
		isMinimized = true;
		document.getElementById("minimize").src = ".//icons/maximize.png";
		document.getElementById("minimize").title = "Μεγιστοποιήση";
		}
	
	}

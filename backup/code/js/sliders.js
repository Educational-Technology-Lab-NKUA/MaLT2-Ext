import {run} from './init.js';
import {clean, reset_turtle, changeSliderValue} from './init.js';
 globalThis.sliderFunctions = [];
globalThis.oldNum = 0;
globalThis.sliderFunctionId = 0;
globalThis.slidersOn = false;
var sliderHead = null;
var slValue = 0;
function createSliders (object) {
			slidersOn = true;
			var sf = {name: object.fName, fId: object.fId, args: object.argsValues }
			sliderFunctions.push (sf);
			sliderFunctionId = sf.fId;
			var fId = object.fId;
			var fname = object.fName;
			var argsName = object.argsNames;
			var number = argsName.length;
			var argsValue = object.argsValues;
			var minV, maxV, svalue = 0;
			if(oldNum > 0)
				removeSliders (oldNum);
				//sliderDiv =  document.getElementById("sliders_output");
			sliderHead = document.getElementById("slidersGrabBar")

			if (language == "Gr"){
			var html = 'Μεταβολείς της συνάρτησης '+fname ;
			}
			else {var html = 'Sliders of '+fname + ' function'; }
		var	divid = document.getElementById("sliders");
			sliderHead.innerHTML = html;
			if (language == "Gr")
			divid.innerHTML =' <table id="sliderTable" style="width:100%"><tr><th>Όνομα</th><th align="left">Από</th><th style= "width: 80%" >  </th><th align = "right">Έως</th><th>Βήμα</th></tr> </table> ';
  			else
			divid.innerHTML =' <table id="sliderTable" style="width:100%"><tr><th>Name</th><th align="left">From</th><th style= "width: 80%" >  </th><th align = "right">To</th><th>Step</th></tr> </table> ';

			for (var j=0; j<number; j++) {

			var brel = document.createElement('br');
			divid.appendChild(brel);
			var axisY = document.createElement('input');
			axisY.setAttribute('type', "image");
			axisY.style.width = "2%";
			axisY.style.zIndex="90";
			axisY.style.height = "9%";
			axisY.style.cursor = "pointer"
			axisY.style.position = "absolute"
			//axisX.style.marginLeft = "10px"
			axisY.setAttribute ('src' , ".//icons/axisYgrey.png");
			axisY.setAttribute('id', j+"_axisY");
			axisY.onclick=function(){if (this.src.match(".//icons/axisYgrey.png")){
				if (!tdactive)
					tdactive = true;
				if(document.getElementById("twoDVT").style.visibility=="hidden")
					document.getElementById("twoDVT").style.visibility="visible";
				for (var i = 0; i < oldNum; i++){
					if(document.getElementById(i+"_axisY").src.match(".//icons/axisYgreen.png"))
					{document.getElementById(i+"_axisY").src=".//icons/axisYgrey.png" }
					}

				 this.src = ".//icons/axisYgreen.png";

				var xid = $(this).attr("id");
				var splt = xid.split("_");
			var	tdaxisY = splt[0];
				if(document.getElementById(splt[0]+"_axisX").src.match(".//icons/axisYgreen.png")){
					document.getElementById(splt[0]+"_axisX").src=".//icons/axisYgrey.png" }

			 }
			else {this.src = ".//icons/axisYgrey.png"  ; tdaxisY = null;}};
			var axisX = document.createElement('input');
			axisX.setAttribute('type', "image");

			axisX.style.width = "20px";
			axisX.style.height = "3%";
			axisX.style.zIndex="100";
			axisY.style.cursor = "pointer"
			axisX.style.position = "absolute"
			axisX.style.marginTop = "20px"
			axisX.style.marginLeft = "2px"
			axisX.setAttribute ('src' , ".//icons/axisYgrey.png");
			axisX.setAttribute('id', j+"_axisX");
			axisX.onclick=function(){if (this.src.match(".//icons/axisYgrey.png")){
			if (!tdactive)
					tdactive = true;
			if(document.getElementById("twoDVT").style.visibility=="hidden")
					document.getElementById("twoDVT").style.visibility="visible";
			for (var i = 0; i < oldNum; i++){
					if(document.getElementById(i+"_axisX").src.match(".//icons/axisYgreen.png"))
					{document.getElementById(i+"_axisX").src=".//icons/axisYgrey.png" }
					}

				this.src = ".//icons/axisYgreen.png";
			var xid = $(this).attr("id");
			var splt = xid.split("_");
		var	tdaxisX = splt[0];
				if(document.getElementById(splt[0]+"_axisY").src.match(".//icons/axisYgreen.png"))
					{document.getElementById(splt[	0]+"_axisY").src=".//icons/axisYgrey.png" }




			 }
				else {this.src = ".//icons/axisYgrey.png"  ; tdaxisX = null ;}};
			var minim = document.createElement('input');
			minim.setAttribute('type', "text");
			minim.setAttribute('id', j+"_min");
			//minim.style.position = "absolute";


			if(j!=0)
			minim.style.marginTop = "4%";
			minim.onchange = function () {var id = $(this).attr("id");
			var splt = id.split("_");
			 var minvalue = this.value.substring();
			$( "#"+splt[0] ).slider("option", "min", parseFloat(minvalue));
			 };
			 if (argsValue[j].args!=null){
				  minV = Math.floor(-argsValue[j].args[0].data*2)
				minim.setAttribute('value',minV);

				}
				else{
					 minV = Math.floor(argsValue[j].data/2)
				minim.setAttribute('value',minV);}

			var maxim = document.createElement('input');
			maxim.setAttribute('type', "text");
			maxim.setAttribute('id', j+"_max");
			maxim.setAttribute('align', "right");
			//maxim.style.position = "absolute";

			maxim.style.marginLeft = "81%";
			maxim.style.marginTop = "-5%";
			maxim.onclick = function () { this.value='';}
			 if (argsValue[j].args!=null){

				maxV = -argsValue[j].args[0].data/2

				maxim.setAttribute('value',maxV );

				}
				else{
			if (argsValue[j].data!=0)
				maxV = argsValue[j].data*2
				else maxV = 10;
				maxim.setAttribute('value',maxV );}
			maxim.onchange = function () {var id = $(this).attr("id");
			var splt = id.split("_");
			 var maxvalue = this.value.substring();
			$( "#"+splt[0] ).slider("option", "max", parseFloat(maxvalue));
			 }

			 var step = document.createElement('input');
			step.setAttribute('type', "text");
			step.setAttribute('id', j+"_step");
			//step.style.position = "absolute";
			step.style.marginLeft = "89%";
			step.style.marginTop = "-5%";
			step.setAttribute('onChange', function () {});
			step.setAttribute('value',1);
			step.onchange = function () {var id = $(this).attr("id");
			var  splt = id.split("_");
			 var stepvalue = this.value.substring();
			$( "#"+splt[0] ).slider("option", "step", parseFloat(stepvalue));
			 };

			var variable = document.createElement('span');
			variable.setAttribute("id","variable");
			if(j!=0)
			variable.style.marginTop = "9%";

			variable.style.marginLeft = "30px";
			variable.style.width = "40px";
			variable.style.fontSize = "8 px";
			variable.style.color = "black";

			variable.innerHTML = argsName[j].data + "   ";


		var sliderValue = document.createElement('input');
			sliderValue.setAttribute('type',"text");
			sliderValue.setAttribute('id',j+"_amount");
			sliderValue.style.position = "relative";
			sliderValue.style.fontSize = "9 px";
			sliderValue.style.marginLeft = "22%";
			//sliderValue.style.marginTop = "2%";
			sliderValue.style.color = "black";
			sliderValue.style.backgroundColor = "transparent";
			sliderValue.style.border = "none";
			sliderValue.readOnly = true;

			var newDiv = document.createElement('div');
  			var divIdName = j;
			newDiv.setAttribute('id',divIdName);
			newDiv.setAttribute('width',"40%");

			divid.appendChild(axisY);
			divid.appendChild(axisX);
			if (argsName[j].data.length > 7){
			 var br = document.createElement('br');
			 divid.appendChild(br);
			 newDiv.style.marginLeft = "30%";
			 sliderValue.style.marginLeft = "30%";
			 }
			divid.appendChild(variable);
			divid.appendChild(minim);
			divid.appendChild(newDiv);

			divid.appendChild(maxim);
			divid.appendChild(step);
			divid.appendChild(sliderValue);
			if (argsValue[j].args!=null){svalue = -argsValue[j].args[0].data}
			else
				svalue = argsValue[j].data
			$("#"+divIdName).slider({
				value: svalue,
				min:  minV ,
				max: maxV,
				step: 1,
			orientation: "horizontal",

			animate: true,
			slide: function (event, ui) {
			changeSliderValue(this,ui, fname, argsValue,fId);
			var id = $(this).attr("id");
			var thumb = $($( "#"+id).children('.ui-slider-handle'));
		 slValue = $("#"+id+"_amount");
		 setLabelPosition(slValue,thumb);

			},
			change: function (event, ui) {
			changeSliderValue(this,ui, fname, argsValue, fId);
			 var id = $(this).attr("id");
			 var thumb = $($( "#"+id).children('.ui-slider-handle'));
			slValue = $("#"+id+"_amount");
			setLabelPosition(slValue,thumb);

			},
			create: function( event, ui ) {
				var id = $(this).attr("id");
				if (argsValue[j].args!=null)
							$( "#"+id+"_amount" ).val(-argsValue[j].args[0].data);
				else $( "#"+id+"_amount" ).val( argsValue[j].data);
				var thumb1 = $($( "#"+id).children('.ui-slider-handle'));
					 slValue = $("#"+id+"_amount");
				setLabelPosition (slValue, thumb1);

			},
			start: function( event, ui ) {
				//console.log ("slider Started");
				globalThis.sliderStart = moment.utc();
								globalThis.startValue = $( this ).slider( "value" );
				
								},
						 stop: function( event, ui ) {
								//console.log ("slider ended");
								// console.log (logSliders);
				
								var  sliderEnd = moment.utc();
								var duration = sliderEnd.diff (sliderStart, "milliseconds");
							var endValue = $( this ).slider( "value" );
							 var minValue = $(this).slider( "option", "min" );
							 var maxValue = $( this ).slider( "option", "max" );
							 var step = $( this ).slider( "option", "step" );
							 var sId = this.name + "_" + this.procName;
							 var obj =  {slider_id: sId, procedure_name: this.procName , slider_name:this.name ,initial_value:startValue,final_value: endValue, min: minValue, max: maxValue, slider_actions: 0, step: step, durationSecs: duration, timestamp:sliderEnd.format()}
							 //console.log ("sliderOBJ")
							 //console.log (obj)
							 maltWid.sliderAction(obj);
				
								}
				

			});



			//newDiv.appendChild(newSpan);

			}
			oldNum = number;



		}



		function setLabelPosition(idName, tm) {
      //  idName.css('top', tm.position().top + idName.outerHeight(true));
	//  console.log (tm.position().left);
       idName.css('left', tm.position().left);

		      //  idName.css('left', tm.position().left);
    }

function removeSliders (num) {


			for (var k=0; k<num; k++) {
					$("#"+k).slider ("destroy");
				}
			$("#sliders").children().remove();
			document.getElementById("sliders").innerHTML = "&nbsp; ";
			var sliderHead = document.getElementById("slidersGrabBar");
			sliderHead.innerHTML = " ";

		}

function resizeSlider (){
		for (var k=0; k<num; k++) {
		 var thumb = $($( "#"+k).children('.ui-slider-handle'));
					var slValue = $("#"+k+"_amount")
       			 setLabelPosition(slValue,thumb);
		}
		}
	// JavaScript Document
export {createSliders, removeSliders, resizeSlider} ;

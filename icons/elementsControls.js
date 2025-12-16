// JavaScript DocumentjQuery(function($) {
function splitContent (){
   $('#codes').css({width: "100%", height: "93%"}).split({orientation: 'horizontal', limit :40, position: '75%' });
}
<!-- touch controls -->
document.getElementById("cleanButton").addEventListener('touchstart',resetCanvas (1));
document.getElementById("zoomOut").addEventListener('touchstart',ZoomOut);
document.getElementById("zoomIn").addEventListener('touchstart',ZoomIn);
//document.getElementById("axisIcon").addEventListener('touchstart',showAxis);
document.getElementById("runSelected").addEventListener('touchstart',takeLines);
document.getElementById("stopTurtle").addEventListener('touchstart',stop());
document.getElementById("undo").addEventListener('touchstart',undo);


function resizableElemnts() {
$( "#sliders_outer" ).draggable({handle: "div.grabBar", snap: true, scroll: true}).resizable({handles: "w,e,s,n",   maxWidth: window.innerWidth* 0.4, minHeight: window.innerHeight* 0.2 , minWidth: window.innerWidth* 0.15} );
$( "#twoDVT" ).draggable({handle: "div.grabBar", snap: true, scroll: true,  stop: function( event, ui ) { bRect = tdcanvas.getBoundingClientRect();}} );
$( "#content" ).draggable({handle: "div.grabBar", snap: true, scroll: true} ).resizable ({handles: "w,s,n" ,maxWidth: window.innerWidth* 0.4, maxWidth: window.innerWidth*0.45, minHeight: window.innerHeight* 0.3 , minWidth: window.innerWidth* 0.15});
$( "#notes" ).draggable({handle: "div.grabBar", snap: true, scroll: true} ).resizable ({handles: "w,e,s,n" ,maxWidth: window.innerWidth* 0.4, maxWidth: window.innerWidth*0.45, minHeight: window.innerHeight* 0.3 , minWidth: window.innerWidth* 0.15});
};

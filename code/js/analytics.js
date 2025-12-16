var analyticsOptions =
{an_duration : 30,
logParameters : false,
logCamera : true,
logSliders : true,
logCodeModification : false,
an_showHelp : true,
an_params_procName : '',
an_params_absolute : [], //array with the correct numbers of params i.e. [60, 30]
an_params_relative : [],//array with the relative numbers of params i.e. [60, 1/2]
an_params_min : 0,
an_params_max : 0,
an_params_count : 0,
an_code_chars : 0,
an_code_keywords : [],
an_code_cond : false,
an_code_iteration : false,
an_code_condIteration : false
}


function showAnalyticsWindow () {
  var analytics = document.getElementById("analytics_settings")
  analytics.style.visibility = "visible";
}

function saveAnalytics () {
  var textToSplit ;     var analytics = document.getElementById("analytics_settings")
   analyticsOptions.an_duration =  $("#an_duration").val();
   analyticsOptions.logParameters =  $("#an_logParameters").is(":checked");
   analyticsOptions.logCamera   =  $("#an_checkCamera").is(":checked");
   analyticsOptions.logSliders    =  $("#an_checkSliders").is(":checked");
   analyticsOptions.logCodeModification  =  $("#an_checkCodeTracking").is(":checked");
   analyticsOptions.an_showHelp   =  $("#an_checkHelp").is(":checked");
   analyticsOptions.an_params_procName  = $("#an_procedureName").val();
   if ($("#an_absoluteSolution").is(":checked")){

   analyticsOptions.an_params_absolute  =  $("#an_absoluteValues").val().split (";")
 }
   else {
      analyticsOptions.an_params_absolute = [];
   }
    if ($("#an_relativeSolution").is(":checked")){

   analyticsOptions.an_params_relative  =  $("#an_relativeValues").val().split (";")
 }
 else{
   analyticsOptions.an_params_relative = [];
 }
   analyticsOptions.an_params_min   =  parseInt($("#an_minParams").val());
   analyticsOptions.an_params_max   =  parseInt($("#an_maxParams").val());
   analyticsOptions.an_params_count  =  parseInt($("#an_procNumber").val());
   analyticsOptions.an_code_chars  =  parseInt($("#an_minChars").val());
     textToSplit = $("#an_keywords").val();
   analyticsOptions.an_code_keywords  = textToSplit.split (";")
   analyticsOptions.an_code_cond   =  $("#an_conditional").is(":checked");
   analyticsOptions.an_code_iteration   =  $("#an_iteration").is(":checked");
   analyticsOptions.an_code_condIteration    =  $("#an_condIteration").is(":checked");
  // console.log (analyticsOptions)
  analytics.style.visibility = "hidden";
  alert ("Learning Analytics for this activity have been saved!")
}

function loadAnalytics (loadedAnalytics) {   //fill the form with the retrieved/saved analytics
  var arrayToText = "";
  var keyWordsLength =analyticsOptions.an_code_keywords.length;
analyticsOptions = loadedAnalytics;
$("#an_duration").val(analyticsOptions.an_duration );
if (analyticsOptions.logParameters ){
$("#an_logParameters").prop("checked", true)
$('#parametersOptions :input').removeAttr('disabled');
}
else {
  $("#an_logParameters").prop("checked", false)
  $('#parametersOptions :input').attr('disabled', true);
}
if (analyticsOptions.logCodeModification ){
$("#an_checkCodeTracking").prop("checked", true)
$('#codeOptions :input').removeAttr('disabled');
}
else {
  $("#an_checkCodeTracking").prop("checked", false)
  $('#codeOptions :input').attr('disabled', true);
}
$("#an_checkCamera").prop("checked", analyticsOptions.logCamera )
$("#an_checkSliders").prop("checked", analyticsOptions.logSliders )

$("#an_checkHelp").prop("checked", analyticsOptions.an_showHelp )
$("#an_procedureName").val(analyticsOptions.an_params_procName );
if (analyticsOptions.an_params_absolute.length > 0 ){
  $("#an_absoluteSolution").prop("checked" , true);
  for (var i=0; i <analyticsOptions.an_params_absolute.length; i ++ )
  arrayToText += analyticsOptions.an_params_absolute[i] + ";"
}
else {
    $("#an_absoluteSolution").prop("checked" , false);
    arrayToText = ""
}
  $("#an_absoluteValues").val(arrayToText)
  if (analyticsOptions.an_params_relative.length > 0 ){
    $("#an_relativeSolution").prop("checked" , true);
    for (var i=0; i <analyticsOptions.an_params_relative.length; i ++ )
    arrayToText += analyticsOptions.an_params_relative[i] + ";"
  }
  else {
      $("#an_relativeSolution").prop("checked" , false);
      arrayToText = ""
  }
$("#an_relativeValues").val(arrayToText)
$("#an_minParams").val(analyticsOptions.an_params_min);
$("#an_maxParams").val(analyticsOptions.an_params_max );
$("#an_procNumber").val(analyticsOptions.an_params_count);
$("#an_minChars").val(analyticsOptions.an_code_chars);
arrayToText = ""
for (var i =0; i<keyWordsLength; i++){
  arrayToText += analyticsOptions.an_code_keywords[i] + ";"
}
$("#an_keywords").val(arrayToText)
$("#an_conditional").prop("checked", analyticsOptions.an_code_cond);
$("#an_iteration").prop("checked", analyticsOptions.an_code_iteration);
$("#an_condIteration").prop("checked", analyticsOptions.an_code_condIteration);

}
function cancelAnalytics () {
  //getValues
    var analytics = document.getElementById("analytics_settings")
  analytics.style.visibility = "hidden";

}
function parametersOptionChanged (chbox) {
  if (chbox.checked){
    $('#parametersOptions :input').removeAttr('disabled');
    $('#an_procedureName').attr('required', true);
  }
  else {
      if(!analyticsOptions.logCodeModification)
      $('#parametersOptions :input').attr('disabled', true);
      $('#an_procedureName').removeAttr('required');
  }

}

function codeOptionChanged (chbox) {
  if (chbox.checked){
      $('#an_procedureName').attr('required', true);
    $('#codeOptions :input').removeAttr('disabled');
  }
  else {
    if(!analyticsOptions.logParameters)
      $('#codeOptions :input').attr('disabled', true);
      $('#an_procedureName').removeAttr('required');
  }
}

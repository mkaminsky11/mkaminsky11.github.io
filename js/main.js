$(document).ready(function(){
  // Change this to the correct selector.
  //$('#fixed-header').midnight();
  $("#part-0").height($(window).height() - 60);
  
  $( window ).resize(function() {
  	$("#part-0").height($(window).height() - 60);
  });
});

jQuery(".main-header-1").fitText();

var side_open = false;
var is_mobile = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	is_mobile = true;
}

if(is_mobile){

}


var editor = CodeMirror(document.getElementById("code"),{
    lineNumbers: true,
    mode: "swift",
    theme: "pastel-on-dark",
    lineWrapping: false, 
    indentUnit: 4, 
    indentWithTabs: true
});
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "lib/intro.swift", true);
txtFile.onreadystatechange = function()
{
	if (txtFile.readyState === 4) {  // document is ready to parse.
		if (txtFile.status === 200) {  // file is found
			var allText = txtFile.responseText; 
			editor.setValue(allText);
		}
	}
}
txtFile.send(null); 

function skill(){
  $('#part-2').slideToggle();
  if($("#skill").attr("shape") === "cancel"){
    $("#skill").attr("shape","plus");
  }
  else{
    $("#skill").attr("shape","cancel"); 
  }
}

function cyc(){
  $('#part-3').slideToggle();
  if($("#cyc").attr("shape") === "cancel"){
    $("#cyc").attr("shape","plus");
  }
  else{
    $("#cyc").attr("shape","cancel"); 
  }
}

function proj(){
  $('#part-4').slideToggle({
    complete: function(){
      editor.refresh(); 
    }
  });
  
  if($("#proj").attr("shape") === "cancel"){
    $("#proj").attr("shape","plus");
  }
  else{
    $("#proj").attr("shape","cancel"); 
  }
}

function xp(){
  $('#part-6').slideToggle();
  if($("#xp").attr("shape") === "cancel"){
    $("#xp").attr("shape","plus");
  }
  else{
    $("#xp").attr("shape","cancel"); 
  }
}

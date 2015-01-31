$(document).ready(function(){
  // Change this to the correct selector.
  //$('#fixed-header').midnight();
  $("#part-0").css("min-height",$(window).height() - 79);

  $( window ).resize(function() {
    $("#part-0").css("min-height",$(window).height() - 79);
  });
});

$(".main-header-1").fitText();
$("#part-0 > div > div > h3").fitText(1);
$("#part-0 > div > div > h4").fitText(0.8);
$("#part-0 > div > div > h5").fitText(1.9);

function clip(elem){
  var left = Math.floor($(elem).width() /2) + "px";
  var right = ($(elem).width() - left) + "px";
  var height = $(elem).height() + "px";
  var width = $(elem).width() + "px";

  /*
  y1, x2, y2, x1
  */

  var def = "rect(0px," + left + "," + height + "," + left + ")";

  $("#part-0 div").css("z-index","1");
  $(elem).css("clip", def)
  $(elem).css("z-index","2");
  $(elem).css("display","flex");

  $("#part-0 > div > div > h3").fitText(1);
  $("#part-0 > div > div > h4").fitText(0.8);
  $("#part-0 > div > div > h5").fitText(1.9);

  $(elem).velocity({
    clipTop: "0px",
    clipLeft: "0px",
    clipBottom: height,
    clipRight: width
  }, 1500);

  /*
  clipTop
  clipBottom
  clipRight
  clipLeft
  */
}

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

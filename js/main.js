$(document).ready(function(){
  // Change this to the correct selector.
  //$('#fixed-header').midnight();
});

$(".main-header").fitText();

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

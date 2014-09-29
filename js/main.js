var side_open = false;
var is_mobile = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	is_mobile = true;
}

if(is_mobile){
  $("#side").css("width","80%");
  $(".goto").remove();
}

function toggle_side(){
	if(!$("#side").hasClass("hide")){
		side_open = false;
		close_side();
	}	
	else{
		side_open = true;
		open_side();
	}
}

function close_side(){
	side_open = false;
	$("#side").animate({
		marginLeft: "-100%"
	}, {
		duration: 1000,
		queue: false,
		complete: function(){
			$("#side").addClass("hide");
		}
	});
	$("#detect").fadeOut();

}

function open_side(){
	side_open = true;
	$("#side").css("margin-left","-100%");
	$("#side").removeClass("hide");
	
	$("#side").animate({
  		marginLeft: "0%"
  	}, {
  		duration: 1000,
  		queue: false
  	});
  	$("#detect").fadeIn();
}
$("#detect").click(function(){
  	if(side_open){
  		side_open = false;
  		close_side();
  	}	
});
$("#detect").click(function(){
	if(!$("#side").hasClass("hide")){
		side_open = false;
		close_side();
	}	
});

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


function goto(elem){
   $(elem).velocity("scroll", { container: $("body") });
}

$("#content").scroll(function(){
	var top = $("#content").scrollTop();
	if(top >= 80){
		//name hidden	
		$(".lang-goto").animate({
		   marginTop: "-40px"
		},{
		  duration: 500,
		  queue: false
		});
		
		$(".name").animate({
		   top: "0px"
		},{
		  duration: 500,
		  queue: false
		});
	}
	else{
		//name visible
		$(".lang-goto").animate({
		   marginTop: "0px"
		},{
		  duration: 500,
		  queue: false
		});
		
		$(".name").animate({
		   top: "40px"
		},{
		  duration: 500,
		  queue: false
		});
	}
});

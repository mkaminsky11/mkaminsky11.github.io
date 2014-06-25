$("img").hover(function(){
	slide_away();
},function(){
	slide_back();
});

function slide_away(){
	var current_left = Number($("#desc").css("left").replace("px",""));
	var goal = current_left + 200 + "px";
	$("#desc").animate({
		left: goal;
	}, 1000, function(){
		
	});
}

function slide_back(){
	var current_left = Number($("#desc").css("left").replace("px",""));
	var goal = current_left - 200 + "px";
	$("#desc").animate({
		left: goal;
	}, 1000, function(){
		
	});
}
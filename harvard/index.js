$("img").hover(function(){
	slide_away();
},function(){
	slide_back();
});

function slide_away(){
	var current_left = Number($("img").css("margin-left").replace("px",""));
	var goal = current_left + 195 + "px";
	$("#desc").animate({
		left: goal
	}, 1000, function(){
		
	});
}

function slide_back(){
	var goal = $("img").css("magin-left");
	$("#desc").animate({
		left: goal
	}, 1000, function(){
		
	});
}
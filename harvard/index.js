$("img").hover(function(){
	slide_away();
},function(){
	slide_back();
});

function slide_away(){
	$("#desc").animate({
		marginLeft: "190px"
	}, 1000, function(){
		
	});
}

function slide_back(){
	$("#desc").animate({
		marginLeft: "0"
	}, 1000, function(){
		
	});
}
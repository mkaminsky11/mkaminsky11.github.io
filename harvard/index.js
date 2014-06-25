$("img").hover(function(){
	slide_away();
},function(){
	slide_back();
});

function slide_away(){
	$("#desc").animate({
		width: 'toggle'
	}, 1000, function(){
		
	});
}

function slide_back(){
	$("#desc").animate({
		width: 'toggle'
	}, 1000, function(){
		
	});
}
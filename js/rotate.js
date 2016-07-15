var rotate = {};
rotate.init = function(){
	for(var i = 0; i < rotate.files.length; i++){
	  $("#rotate").html($("#rotate").html() + "<img src='img/rotate/" + rotate.files[i] + ".png'>");
	}
	rotate.resize();
	rotate.shift();
};

rotate.files = [
  "sketch", "jquery", "kali", "linux", "kinect", "atom",
  "node.js", "meteor", "codemirror", "keybase", "stackoverflow"
];

rotate.rotate = function(){
  
};

rotate.resize = function(){
  rotate.h = $("#rotate").height();
  rotate.w = $("#rotate").width();
  rotate.max_width = rotate.files.length * rotate.h;
};

rotate.random = function(){
   
};

rotate.shift = function(){
	/*var first_img = $("#rotate img").get(0);
	var _w = -1 * $(first_img).width();
	$(first_img).velocity({
		marginLeft: _w
	}, {
		duration: 1000,
		complete: function(){
			$($("#rotate img").get(0)).css("margin-left",0);
			var old_first_html = $($("#rotate img").get(0))[0].outerHTML;
			$($("#rotate img").get(0)).remove();
			$("#rotate").html($("#rotate").html() + old_first_html);
			if(rotate.max_width - rotate.w > 200){
				rotate.shift();
			}
		}
	});*/
}

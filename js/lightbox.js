light = {};

light.init = function(){
	this.imgs = document.querySelectorAll(".img-container > div");
	for(var i = 0; i < this.imgs.length; i++){
		var url = this.imgs[i].querySelector("img").getAttribute("src");
		this.imgs[i].innerHTML  = "<div class='img-hover' src='"+url+"'><p>&plus;</p></div>" + this.imgs[i].innerHTML;
		this.imgs[i].querySelector(".img-hover").addEventListener("click",function(event){
			var url = this.getAttribute("src");
			light.show(url);
		},true);
	}

	document.querySelector("#lightbox-close").addEventListener("click",function(event){
		light.close();
	});
}

light.show = function(url){
	document.querySelector("#lightbox img").setAttribute("src",url);
	document.querySelector("#lightbox").setAttribute("class","lightbox-show");
}

light.close = function(){
	document.querySelector("#lightbox").setAttribute("class","");
}
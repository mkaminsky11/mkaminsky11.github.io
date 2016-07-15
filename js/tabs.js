var tabs = {};
var graphLoaded = false;
tabs.init = function(){
	$("#tab-container div").each(function(i){
		$(this).click(function(){
			if(!$(this).hasClass("selected-tab")){
				$(".selected-tab").removeClass("selected-tab");
				$(this).addClass("selected-tab");
				var percent = (i * 20) + "%";
				$("#slider-container > div").velocity({
					left: percent
				});
				var id = "#" + $(this).attr("data-div");
				$(".selected-div").css("display","none");
				$(".selected-div").removeClass("selected-div");
				$(id).addClass("selected-div");
				$(id).css("display","block");
				
				if(id === "#projects"){
					$.getJSON('js/projects.json', function(data) {
						$('#all-projects').html(template(data));
						$(".project").css("opacity","0");
						$(".project").velocity("transition.slideDownIn", {
							stagger: 250
						});
						github.init();
					});
				}
				else{
					$("#all-projects").html("");
				}
				
				if(id === "#about-me" && !graphLoaded){
					graphLoaded = true;
					createStoryJS({
						type:       'timeline',
						width:      '100%',
						height:     '400',
						source:     'js/timeline.json',
						embed_id:   'timeline-embed',
						font: 		'DroidSerif-DroidSans',
						maptype:    'watercolor',
						start_at_end:true
					});
				}
			}
		});
	});
};
tabs.resize = function(){
	
};
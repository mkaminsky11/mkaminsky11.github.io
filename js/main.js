$(window).resize(function(){
  resize_main();
  nodes.render();
  tabs.resize();
});
var template;
$(document).ready(function(){
    resize_main();
    circles.init();
	tabs.init();
	template = Handlebars.compile($('#project-template').html());
    window.setTimeout(function(){
        resize_main();
    }, 1000);
});

$(window).scroll(function(){
      if($(window).scrollTop() > ($("#about").height() + 20)){
        $("#about").css("opacity",0);
      }
      else{
        $("#about").css("opacity",1);
      }
      inc.check();
});


window.setInterval(nodes.render, 70);
$('#canvas').css('background-color', 'rgba(94, 65, 47, 0)');

function resize_main(){
  $("#home").height($("body").height() - 50);
  $("#home").width($("body").width());
  $("#canvas").attr("width",$("body").width()).attr("height",$("body").height());
  nodes.max = Math.min($("body").width() / 4, $("body").height() / 3);
  nodes.init();
}
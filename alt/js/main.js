$(window).resize(function(){
  resize_main();
  nodes.render();
});

$(document).ready(function(){
    resize_main();
    tilted.init();
    circles.init();
    light.init();
    link.init();
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
  $("#main").height($(window).height());
  $("#main").width($(window).width());
  $("#canvas").attr("width",$("#main").width()).attr("height",$("#main").height());
  nodes.max = Math.min($("#main").width() / 4, $("#main").height() / 3);
  $("#content-1").css("margin-top",$("#main").height());

  tilted.resize();
  nodes.init();
}

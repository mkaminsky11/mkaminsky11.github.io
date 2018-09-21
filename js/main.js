$(window).resize(function(){
  resize_main();
  nodes.render();
});
var template;
$(document).ready(function(){
    light.init();
    resize_main();
    window.setTimeout(function(){
        resize_main();
    }, 1000);
});

$(window).scroll(function(){
});


window.setInterval(nodes.render, 70);
$('#canvas').css('background-color', 'rgba(94, 65, 47, 0)');

function resize_main(){
  $("#canvas").attr("width",$("body").width()).attr("height",$("body").height());
  nodes.max = Math.min($("body").width() / 4, $("body").height() / 3);
  nodes.init();
}
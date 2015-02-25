$(document).ready(function(){
  resize_main();
});

$(window).resize(function(){
  resize_main();
});

function resize_main(){
  console.log("resize");

  $("#main").height($(window).height());
  $("#main").width($(window).width());
}

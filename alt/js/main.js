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

  /*var div = $('<div style="width: 1em;"></div>').appendTo('body');
  var em = div.width();
  div.remove();
  var width = $("#svg").width();
  var ratio = em/width;
  var shape = document.getElementsByTagName("svg")[0];
  shape.setAttribute("viewBox", "0 0 200 " + 5*width*ratio/2);*/
}

new Timesheet('timesheet', 2012, 2016, [
  ['09/2012', '11/2002', 'Java 1 at Salem State University', 'bar'],
  ['03/2013', '06/2013', 'Java 2 at Salem State University', 'bar'],
  ['06/2013', '07/2002', 'Cryptography at Stanford University', 'bar'],
  ['09/2013', '11/2013', 'Science fair project with MIT researcher', 'bar'],
  ['09/2013', '10/2013', 'Ultimate Developer Event 2013', 'bar'],
  ['11/2013', '03/2015', 'Code Your Cloud active', 'bar'], //cyc
  ['09/2013', '06/2014', 'AP Computer Science', 'bar'], //ap comp sci
  ['06/2014', '09/2014', 'Dynamic Web Applications at Harvard', 'bar'], //dwa
  ['09/2014', '03/2015', 'Marblehead High School Computer/Robotics club', 'bar'], //computer robotics club
  ['11/2014', '12/2014', 'Placed 3rd in Massachusetts CyberPatriot competition', 'bar'], //state competition
  ['02/2015', '03/2015', '\"A Tour of Scala\" and  \"Languages, Compilers, and Parsers\" at MIT', 'bar'] //mit classes
]);

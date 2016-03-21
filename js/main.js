$(window).resize(function(){
  resize_main();
  nodes.render();
	rotate.resize();
});

$(document).ready(function(){
    resize_main();
    sections.init();
    circles.init();
    light.init();
    link.init();
    github.init();
		rotate.init();

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
  $("#main").height($("body").height());
  $("#main").width($("body").width());
  $("#canvas").attr("width",$("#main").width()).attr("height",$("#main").height());
  nodes.max = Math.min($("#main").width() / 4, $("#main").height() / 3);
  $("#content-1").css("margin-top",$("#main").height());

  sections.resize();
  nodes.init();
}

new Timesheet('timesheet', 2012, 2016, [
  ['09/2012', '11/2012', 'Java 1 at Salem State University', 'bar'],
  ['03/2013', '06/2013', 'Java 2 at Salem State University', 'bar'],
  ['06/2013', '07/2013', 'Cryptography at Stanford University', 'bar'],
  ['09/2013', '11/2013', 'Science fair project with MIT researcher', 'bar'],
  ['09/2013', '10/2013', 'Ultimate Developer Event 2013', 'bar'],
  ['11/2013', '01/2016', 'Code Your Cloud active', 'bar'], //cyc
  ['09/2013', '06/2014', 'AP Computer Science', 'bar'], //ap comp sci
  ['06/2014', '09/2014', 'Dynamic Web Applications at Harvard', 'bar'], //dwa
  ['09/2014', '01/2016', 'Marblehead High School Computer/Robotics club', 'bar'], //computer robotics club
  ['11/2014', '12/2014', 'Placed 3rd in Massachusetts CyberPatriot competition', 'bar'], //state competition
  ['02/2015', '04/2015', '\"A Tour of Scala\" and  \"Languages, Compilers, and Parsers\" at MIT', 'bar'], //mit classes
  ['06/2015', '07/2015', '\"Introduction to Semiconductor Device Physics\" at Harvard', 'bar'],
  ['07/2015', '08/2015', '\" Lincoln Laboratory Radar Introduction for Student Engineers\"', 'bar']
]);

/*
function email(){
  $.ajax({
  type: "POST",
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    'key': 'gAWCzKHFlMGphDmMdsZoqA',
    'message': {
      'from_email':$("#email").val(),
      'to': [
          {
            'email': 'mkaminsky11@gmail.com',
            'type': 'to'
          },
        ],
      'autotext': 'true',
      'subject': 'from: ' + $("#name").val(),
      'html': $("#message").val()
    }
  }
 }).done(function(response) {
 });

$("#name, #email, #message").val("");
}
*/
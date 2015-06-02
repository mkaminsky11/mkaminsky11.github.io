var color_combos = [
	["#00BCD4","#038C9B","#FFEE58"],
	["#795548","#5D4037","#FF4081"],
	["#607D8B","#455A64","#536DFE"],
	["#FFEB3B","#FBC02D","#009688"],
	["#673AB7","#512DA8","#00BCD4"]
];

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
  ['11/2013', '04/2015', 'Code Your Cloud active', 'bar'], //cyc
  ['09/2013', '06/2014', 'AP Computer Science', 'bar'], //ap comp sci
  ['06/2014', '09/2014', 'Dynamic Web Applications at Harvard', 'bar'], //dwa
  ['09/2014', '04/2015', 'Marblehead High School Computer/Robotics club', 'bar'], //computer robotics club
  ['11/2014', '12/2014', 'Placed 3rd in Massachusetts CyberPatriot competition', 'bar'], //state competition
  ['02/2015', '04/2015', '\"A Tour of Scala\" and  \"Languages, Compilers, and Parsers\" at MIT', 'bar'] //mit classes
]);

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
	//console.log(response);
	if(response[0].status === "sent"){
		$("#name, #email, #message").val("");
	}
 });
}

function switch_contact(){
	if($("#contact-1").css("display") === "none"){
			//remove contact-2
			$("#contact-2").velocity("transition.slideRightOut", {
			complete: function(){
				$("#contact-2").css("display","none");
				$("#contact-1").css("opacity",0).css("display","inline-block").velocity("transition.slideLeftIn",{display:"flex"});
			}
		});
	}
	else{
		$("#contact-1").velocity("transition.slideLeftOut", {
			complete: function(){
				$("#contact-1").css("display","none");
				$("#contact-2").css("opacity",0).velocity("transition.slideLeftIn",{display:"flex"});
			}
		});
	}
}

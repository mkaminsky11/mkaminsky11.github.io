$(document).ready(function(){

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    $(".cd-timeline-block").each(function(index){
      if($(this).isOnScreen(0.4, 0.4)){
        console.log("show");
        $(this).velocity({
          opacity: 1
        },{
          duration: 200
        });
      }
      else{
        console.log("hide");
        $(this).velocity({
          opacity: 0
        },{
          duration: 100
        });
      }
    });

    var $timeline_block = $('.cd-timeline-block');

    //hide timeline blocks which are outside the viewport
    $timeline_block.each(function(){
      if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
      }
    });

    $timeline_block.each(function(){
      if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });


  // Change this to the correct selector.
  //$('#fixed-header').midnight();
  $("#part-0").css("min-height",$(window).height() - 79);

  $( window ).resize(function() {
    $("#part-0").css("min-height",$(window).height() - 79);
  });
});

$(".main-header-1").fitText();
fit_all();

var clip_index = 0; //up to 2;
var clips = ["#cell-site","#cell-ware","#cell-srv","#cell-img"]


function clip(elem){

  //
  //
  var id = "#btn_" + elem.replace("#cell-","");
  $(".fa-dot-circle-o").removeClass("fa-dot-circle-o").addClass("fa-circle");
  $(id).addClass("fa-dot-circle-o");
  //
  //


  clip_index = clips.indexOf(elem);

  var left = Math.floor($(elem).width() /2);
  var right = ($(elem).width() - left);
  var height = $(elem).height();
  var width = $(elem).width();

  /*
  y1, x2, y2, x1
  */


  $("#part-0 > div").each(function(index){
    if($(this).css("display") !== "none"){
      $(this).css("z-index","1");
      $(this).addClass("will-remove");
    }
  });

  $(elem).css("z-index","2");
  $(elem).css("display","flex");

  fit_all();

  var slope = 0.5;

  /*
  start:
          13---24

      1 = (left-100,0)
      2 = (left+100,0)
      3 = (left-100,0)
      4 = (left+100,0)

  down:
         1___2
        /   /
      /   /
   3/___/4


    1 = (left - 100, 0)
    2 = (left + 100, 0)
    3 = ((left-100) - height/2,height) *change
    4 = ((left+100) - height/2,height) *change


    out

              1________________2
            /                 /
          /                 /
        /                 /
      /3________________/4

      1 = (0,0)
      2 = (width + height/2 ,0)
      3 = (0 - height/2,height)
      4 = (width, height)

  */

  $(elem).css("-webkit-clip-path",generate(left-100,0,left+100,0,left-100,0,left+100,0));
  $(elem).css("-moz-clip-path",generate(left-100,0,left+100,0,left-100,0,left+100,0));
  $(elem).css("clip-path",generate(left-100,0,left+100,0,left-100,0,left+100,0));

  var x1 = left-100;
  var y1 = 0;
  var x2 = left+100;
  var y2 = 0;
  var x3 = left-100;
  var y3 = 0;
  var x4 = left+100;
  var y4 = 0;

  var out = height*slope;


  var per = 0;
  var interval = window.setInterval(function(){
    per++;

    if(per <= 50){
      var percent = (per * 2) / 100;

      y3 = percent*height;
      y4 = percent*height;

      x3 = (left-100) - percent*out;
      x4 = (left+100) - percent*out;

      $(elem).css("clip-path",generate(x1,y2,x2,y2,x3,y3,x4,y4));
      $(elem).css("-webkit-clip-path",generate(x1,y2,x2,y2,x3,y3,x4,y4));
      $(elem).css("-moz-clip-path",generate(x1,y2,x2,y2,x3,y3,x4,y4));
    }
    else{
      var percent = ((per - 50) * 2 ) / 100;

      //  init  final init
      x1 = (left-100) + ((0) - (left-100))*percent;
      x2 = (left+100) + ((width + out) - (left+100))*percent;
      x3 = ((left-100) - out) + ((0 - out) - ((left-100) - out))*percent;
      x4 = ((left+100) - out) + ((width) - ((left+100) - out))*percent;

      $(elem).css("clip-path",generate(x1,y2,x2,y2,x3,y3,x4,y4));
      $(elem).css("-webkit-clip-path",generate(x1,y2,x2,y2,x3,y3,x4,y4));
      $(elem).css("-moz-clip-path",generate(x1,y2,x2,y2,x3,y3,x4,y4));

      if(per === 100){
        clearInterval(interval);

        $(elem).css("clip-path", "none");
        $(elem).css("-webkit-clip-path", "none");
        $(elem).css("-moz-clip-path", "none");

        $(".will-remove").css("display","none");
        $(".will-remove").removeClass("will-remove");
      }
    }
  }, 10);

  /*
  clipTop
  clipBottom
  clipRight
  clipLeft
  */

  //once done, clip-path = none
}

var side_open = false;
var is_mobile = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	is_mobile = true;
}

if(is_mobile){

}


var editor = CodeMirror(document.getElementById("code"),{
    lineNumbers: true,
    mode: "swift",
    theme: "pastel-on-dark",
    lineWrapping: false,
    indentUnit: 4,
    indentWithTabs: true
});
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "lib/intro.swift", true);
txtFile.onreadystatechange = function()
{
	if (txtFile.readyState === 4) {  // document is ready to parse.
		if (txtFile.status === 200) {  // file is found
			var allText = txtFile.responseText;
			editor.setValue(allText);
		}
	}
}
txtFile.send(null);

function skill(){
  $('#part-2').slideToggle();
  if($("#skill").attr("shape") === "cancel"){
    $("#skill").attr("shape","plus");
  }
  else{
    $("#skill").attr("shape","cancel");
  }
}

function cyc(){
  $('#part-3').slideToggle();
  if($("#cyc").attr("shape") === "cancel"){
    $("#cyc").attr("shape","plus");
  }
  else{
    $("#cyc").attr("shape","cancel");
  }
}

function proj(){
  $('#part-4').slideToggle({
    complete: function(){
      editor.refresh();
    }
  });

  if($("#proj").attr("shape") === "cancel"){
    $("#proj").attr("shape","plus");
  }
  else{
    $("#proj").attr("shape","cancel");
  }
}

function xp(){
  $('#part-6').slideToggle();
  if($("#xp").attr("shape") === "cancel"){
    $("#xp").attr("shape","plus");
  }
  else{
    $("#xp").attr("shape","cancel");
  }
}

function generate(x1, y1, x2, y2, x3, y3, x4, y4){
  return "polygon(" + x1 + "px " + y1 + "px," + x2 + "px " + y2 + "px," + x4 + "px " + y4 + "px," + x3 + "px " + y3 + "px)";
}

function fit_all(){
  //$("#part-0 > div > div > h3").fitText(1.2);
  //$("#part-0 > div > div > h4").fitText(1);
  //$("#part-0 > div > div > h5").fitText(2.1);
}

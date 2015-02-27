$(window).resize(function(){
  resize_main();
  render();
});

var vertices = [];
var triangles = [];
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var center = {x: 0, y:0};

var max = Math.min($("#main").width() / 4, $("#main").height() / 4);

$(document).ready(function(){
    resize_main();
    
    $('.circle').each(function(index){
      $(this).hover(function(){
        
        var id = $(this).attr("id");
        var interval = window.setInterval(function(){
          var deg = Number($(this).attr("data-deg"));
          if(deg === 360){
            clearInterval(interval);
          }
          else{
            deg++;
            $(this).attr("data-deg", deg);
            renderCircle(id,deg)
          }
        }, 100);
        
      }, function(){
        
        var id = $(this).attr("id");
        var interval = window.setInterval(function(){
          var deg = Number($(this).attr("data-deg"));
          if(deg === 0){
            clearInterval(interval);
          }
          else{
            deg--;
            $(this).attr("data-deg", deg);
            renderCircle(id,deg)
          }
        }, 100);
        
      });
    });
    
    $('[data-lightbox]').each(function(index){
      
      $(this).hover(function(){
        var id = "eye-" + $(this).attr("data-svg");
        var obt3 = new Vivus(id, {type: 'oneByOne', duration: 75});
        obt3.reset().play()
        
        $(this).find(".image-overlay").velocity({
          opacity: 1
        },{
          duration: 200
        });
      },function(){
        $(this).find(".image-overlay").velocity({
          opacity: 0
        },{
          duration: 200
        });
      });
      
    });

    $(window).scroll(function(){
      if($(window).scrollTop() > ($("#about").height() + 20)){
        $("#about").css("opacity",0);
      }
      else{
        $("#about").css("opacity",1);
      }
      
      $(".progress-bar").each(function(index){

        if(onscreen($(".progress-bar")[index]) === true){

          var per = $(this).attr("data-width") + "%";
          $(this).velocity({
            width: per
          },{
            duration: 400
          });
        }

      });
    });
});

window.setInterval(render, 70);

function init(){
    center = {
      x: $("#main").width() / 2,
      y: $("#main").height() / 2
    };

    vertices = [];

    context.clearRect(0, 0, Number(canvas.width), Number(canvas.height));
    add(400);
    triangles = triangulate(vertices);

    for(var i = 0; i < vertices.length; i++){
      vertices[i].originX = vertices[i].x;
      vertices[i].originY = vertices[i].y;
      shiftPoint(vertices[i]);
    }
    render();
}

$('#canvas').css('background-color', 'rgb(28, 105, 202)');

function resize_main(){
  $("#main").height($(window).height());
  $("#main").width($(window).width());
  $("#canvas").attr("width",$("#main").width()).attr("height",$("#main").height());
  max = Math.min($("#main").width() / 4, $("#main").height() / 4);
  $("#content-1").css("margin-top",$("#main").height());

  init();
}
function addNode(x,y){
    vertices.push(new Vertex(x, y));
}

function render(){
    context.clearRect(0, 0, Number(canvas.width), Number(canvas.height));

    for(var i = 0; i < triangles.length; i++){
      var triangle = triangles[i];

      context.beginPath();

      var opacity = getOpacity(triangle.v0)
      context.strokeStyle = "rgba(33, 122, 236,"+opacity+")";
      context.moveTo(triangle.v0.x, triangle.v0.y);

      opacity = getOpacity(triangle.v1);
      context.strokeStyle = "rgba(33, 122, 236,"+opacity+")";
      context.lineTo(triangle.v1.x, triangle.v1.y);

      opacity = getOpacity(triangle.v2);
      context.strokeStyle = "rgba(33, 122, 236,"+opacity+")";
      context.lineTo(triangle.v2.x, triangle.v2.y);

      context.closePath();
      context.fillStyle = "rgba(0,0,0,0)";
      context.stroke();

    }

    vertices.forEach(function(vertex) {
      context.beginPath();
      context.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2, true);
      context.closePath();
      var opacity = getOpacity(vertex);
      context.fillStyle = "rgba(33, 122, 236,"+opacity+")";
      context.fill();
    });
}

function renderCircle(id, deg){
  var can = document.getElementById(id);
  var con = can.getContext('2d');
  
  con.strokeStyle = 'white';
  con.fillStyle= 'rgba(0,0,0,0)';
  con.lineWidth = 4;
  con.clearRect(0, 0, can.width, can.height);
  con.beginPath();
  con.arc(can.width/2, can.height/2, can.width/2, -(Math.PI / 2), deg*(2 * Math.PI / 360) - Math.PI / 2, false);
  con.stroke();
}
function add(n){
    var w = Number(canvas.width), h = Number(canvas.height);
    var inset = 0;

    for (var i = 0; i < n; i++)
      vertices.push(new Vertex(Math.random() * (w - 2 * inset) + inset, Math.random() * (h - 2 * inset) + inset));
}

function color(red, green, blue)
{
    var decColor = red + 256 * green + 65536 * blue;
    return decColor.toString(16);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shiftPoint(vert){
  TweenLite.to(vert, 1+1*Math.random(), {
    x:vert.originX-50+Math.random()*100,
    y: vert.originY-50+Math.random()*100,
    ease:Circ.easeInOut,
    onComplete: function() {
      shiftPoint(vert);
    },
    onUpdate: function(){
    }
  });
}

function distance(vert){
  var x = vert.x;
  var y = vert.y;

  return Math.abs(Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2)));
}

function getOpacity(vert){
  var d = distance(vert);

  var max2 = 0.9*max;
  var max3 = 0.8*max;

  if(d > max){
    return 0;
  }
  else if(d > max2){
    return 0.3;
  }
  else if(d > max3){
    return 0.6;
  }
  return 1;
}

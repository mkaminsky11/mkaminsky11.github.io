$(window).resize(function(){
  resize_main();
  render();
});

//
//
//
//
var vertices = [];
var triangles = [];
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

$('#canvas').css('background-color', 'rgb(20, 20, 20)');

function resize_main(){

  $("#main").height($(window).height());
  $("#main").width($(window).width());
  $("#canvas").attr("width",3*$(window).width()).attr("height",3*$(window).height());
  $("#canvas").css("margin-left",-1*$(window).width()).css("margin-top",-1*$(window).height());
}
function addNode(x,y){
    vertices.push(new Vertex(x, y));
    render();
}

function render(){
    context.clearRect(0, 0, Number(canvas.width), Number(canvas.height));

    vertices.forEach(function(vertex) {
      context.beginPath();
      context.arc(vertex.x, vertex.y, 0, 0, Math.PI * 2, true);
      context.closePath();

      context.fillStyle = "#e9e9e9";
      context.fill();
    });

    triangles = triangulate(vertices);

    triangles.forEach(function(triangle) {
      var c = getRandomInt(2, 30);

      context.beginPath();
      context.moveTo(triangle.v0.x, triangle.v0.y);
      context.lineTo(triangle.v1.x, triangle.v1.y);
      context.lineTo(triangle.v2.x, triangle.v2.y);
      context.closePath();
      context.fillStyle = "#" + color(c,c,c);
      context.fill();
      context.strokeStyle = "#ddd";
      context.stroke();
      
    });
}

function clear(){
    vertices = [];
    render();
}
function add(n){
    var w = Number(canvas.width), h = Number(canvas.height);
    var inset = 0;

    for (var i = 0; i < n; i++)
      vertices.push(new Vertex(Math.random() * (w - 2 * inset) + inset, Math.random() * (h - 2 * inset) + inset));

    render();
}

$(document).ready(function(){
  resize_main();
  add(750);
});

var mouse_moving = false;
$( "#main" ).mousemove(function( event ) {
     // $("#canvas").velocity({
     //     marginLeft: -1*($("#canvas").width() - event.pageX),
     //     marginTop: ($("#canvas").height() - event.pageY)
     // });
});

//
//
//
function color(red, green, blue)
{
    var decColor = red + 256 * green + 65536 * blue;
    return decColor.toString(16);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
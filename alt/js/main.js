$(window).resize(function(){
  resize_main();
  render();
});

var blues = [
    "#3498DB",
    "#2980B9",
    "#0288D1",
    "#0277BD"
];

var bright = [
    "#F1C40F"
];

//
//
//
//
var vertices = [];
var triangles = [];
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var ctx = canvas.getContext('2d');

context.strokeStyle = "rgba(0,0,0,0)";

$('#canvas').css('background-color', 'rgb(20, 20, 20)');

function resize_main(){

  $("#main").height($(window).height());
  $("#main").width($(window).width());
  $("#canvas").attr("width",3*$(window).width()).attr("height",3*$(window).height());
  $("#canvas").velocity({
     marginLeft: -1*$(window).width(),
     marginTop: -1*$(window).height()
  });
  
  reset();
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

      context.fillStyle = "rgba(0,0,0,0)";
      context.fill();
    });

    triangles = triangulate(vertices);

    for(var i = 0; i < triangles.length; i++){
      var triangle = triangles[i];    
    
      var c = getRandomInt(0, 30);
      var clr = "#" + color(c,c,c);
      var prob = getRandomInt(0, 100);
      if(prob <= 4){
          clr = bright[getRandomInt(0, bright.length - 1)];
      }
      
      triangles[i].color = clr;

      context.beginPath();
      context.moveTo(triangle.v0.x, triangle.v0.y);
      context.lineTo(triangle.v1.x, triangle.v1.y);
      context.lineTo(triangle.v2.x, triangle.v2.y);
      context.closePath();
      context.fillStyle = clr;
      context.fill();
      context.strokeStyle = "rgba(0,0,0,0)";
      context.stroke();
      
      rotate();
      
    }
}

function update(){
    context.clearRect(0, 0, Number(canvas.width), Number(canvas.height));

    vertices.forEach(function(vertex) {
      context.beginPath();
      context.arc(vertex.x, vertex.y, 0, 0, Math.PI * 2, true);
      context.closePath();

      context.fillStyle = "rgba(0,0,0,0)";
      context.fill();
    });

    for(var i = 0; i < triangles.length; i++){
      var triangle = triangles[i];    
    
      var clr = triangles[i].color;
      var prob = getRandomInt(0, 10000);
      if(bright.indexOf(clr) !== -1){
          if(prob < 1500){
               var c = getRandomInt(0, 30);
               clr = "#" + color(c,c,c);
          }
       }
       else{
          if(prob < 50){
              //switch to bright
              clr = bright[getRandomInt(0, bright.length - 1)];
          }
      }
      triangles[i].color = clr;

      context.beginPath();
      context.moveTo(triangle.v0.x, triangle.v0.y);
      context.lineTo(triangle.v1.x, triangle.v1.y);
      context.lineTo(triangle.v2.x, triangle.v2.y);
      context.closePath();
      context.fillStyle = clr;
      context.fill();
      context.strokeStyle = "rgba(0,0,0,0)";
      context.stroke();
      
    }
}

function clear(){
    vertices = [];
    render();
}
function reset(){
    clear();
    add(790);
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

    //word-wrap: break-word;
    //word-break: break-word;
    window.setInterval(function(){
        $("#main h2").css("word-wrap","break-word");
        $("#main h2").css("word-break","break-word");
    }, 500);
});

$( "#main" ).mousemove(function( event ) {

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
function rotate() {
      /* ... */
      var value = 360; //animate to  
      var steps = 6; //animation steps per frame (1/60sec.) 
      var time = (90000/60)*(value/steps); //animation time
      $('#canvas').velocity({rotateZ: value}, {
          duration:time,
          easing:'linear',
          loop:true,
          progress: function(elements, c, r, s, t) {
            update();  
          }
          
      });
}
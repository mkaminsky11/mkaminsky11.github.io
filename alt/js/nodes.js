var nodes = {
  vertices : [],
  triangles : [],
  canvas : document.getElementById('canvas'),
  center : {x: 0, y:0},
  max : Math.min($("#main").width() / 4, $("#main").height() / 4)
};
nodes.context =  nodes.canvas.getContext('2d'),

nodes.init = function(){
    nodes.center = {
      x: $("#main").width() / 2,
      y: $("#main").height() / 2
    };
    nodes.vertices = [];
    nodes.context.clearRect(0, 0, Number(nodes.canvas.width), Number(nodes.canvas.height));
    nodes.add(400);
    nodes.triangles = triangulate(nodes.vertices);

    for(var i = 0; i < nodes.vertices.length; i++){
      nodes.vertices[i].originX = nodes.vertices[i].x;
      nodes.vertices[i].originY = nodes.vertices[i].y;
      nodes.shiftPoint(nodes.vertices[i]);
    }
    nodes.render();
};

nodes.addNode = function(x,y){
    nodes.vertices.push(new Vertex(x, y));
};

nodes.render = function(){
    nodes.context.clearRect(0, 0, Number(nodes.canvas.width), Number(nodes.canvas.height));

    for(var i = 0; i < nodes.triangles.length; i++){
      var triangle = nodes.triangles[i];

      nodes.context.beginPath();

      var opacity = nodes.getOpacity(triangle.v0)
      nodes.context.strokeStyle = "rgba(113, 92, 79,"+opacity+")";
      nodes.context.moveTo(triangle.v0.x, triangle.v0.y);
      opacity = nodes.getOpacity(triangle.v1);
      nodes.context.strokeStyle = "rgba(113, 92, 79,"+opacity+")";
      nodes.context.lineTo(triangle.v1.x, triangle.v1.y);
      opacity = nodes.getOpacity(triangle.v2);
      nodes.context.strokeStyle = "rgba(113, 92, 79,"+opacity+")";
      nodes.context.lineTo(triangle.v2.x, triangle.v2.y);
      nodes.context.closePath();
      nodes.context.fillStyle = "rgba(0,0,0,0)";
      nodes.context.stroke();

    }

    nodes.vertices.forEach(function(vertex) {
      nodes.context.beginPath();
      nodes.context.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2, true);
      nodes.context.closePath();
      var opacity = nodes.getOpacity(vertex);
      nodes.context.fillStyle = "rgba(113, 92, 79,"+opacity+")";
      nodes.context.fill();
    });
};

nodes.add = function(n){
    var w = Number(nodes.canvas.width), h = Number(nodes.canvas.height);
    var inset = 0;

    for (var i = 0; i < n; i++)
      nodes.vertices.push(new Vertex(Math.random() * (w - 2 * inset) + inset, Math.random() * (h - 2 * inset) + inset));
};



nodes.shiftPoint = function(vert){
  TweenLite.to(vert, 1+1*Math.random(), {
    x:vert.originX-50+Math.random()*100,
    y: vert.originY-50+Math.random()*100,
    ease:Circ.easeInOut,
    onComplete: function() {
      nodes.shiftPoint(vert);
    },
    onUpdate: function(){
    }
  });
};

nodes.distance = function(vert){
  var x = vert.x;
  var y = vert.y;

  return Math.abs(Math.sqrt(Math.pow(nodes.center.x - x, 2) + Math.pow(nodes.center.y - y, 2)));
};

nodes.getOpacity = function(vert){
  var d = nodes.distance(vert);

  var max2 = 0.9*nodes.max;
  var max3 = 0.8*nodes.max;

  if(d > nodes.max){
    return 0;
  }
  else if(d > max2){
    return 0.3;
  }
  else if(d > max3){
    return 0.6;
  }
  return 1;
};

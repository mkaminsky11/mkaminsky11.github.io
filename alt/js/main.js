var canvas = Raphael($("#main").get(0));
var id = 0;
var ok_to_remove = false;
var starting = 15;
var adding_limit = 30;
var prob_remove = 0.05;
var prob_add = 0.3;
var radius = 10;
var nodes = [];
var lines = [];

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

for(var i = 0; i < starting; i++){
  addCircle();
}
ok_to_remove = true;

function addCircle(){
  if(nodes.length < adding_limit){
    id++;
    var x = getRandomInt(0, $("#main > svg").width());
    var y = getRandomInt(0, $("#main > svg").height());

    var circle = canvas.circle(x,y,radius);
    circle.data("data-id",id);
    var to_push = {
      id: id,
      circle: circle
    };
    nodes.push(to_push);

    var num_lines = getNumberOfLines();
    if(nodes.length >= 4){
      var chosen = [];
      while(chosen.length < num_lines){
        var index = getRandomInt(0, nodes.length - 1);
        var link_id = nodes[index].id;

        if(link_id !== id && chosen.indexOf(link_id) === -1){
          chosen.push(link_id);
          addLine(id, link_id);
        }

      }
    }
  }
}

function positionLine(from, to){
  var ret = {};
  for(var i = 0; i < nodes.length; i++){
    if(nodes[i].id === from){
      ret.x1 = nodes[i].circle.attr("cx");
      ret.y1 = nodes[i].circle.attr("cy");
    }
    else if(nodes[i].id === to){
      ret.x2 = nodes[i].circle.attr("cx");
      ret.y2 = nodes[i].circle.attr("cy");
    }
  }

  return ret;
}

function addLine(from, to){
  var pos = positionLine(from, to);
  var line = canvas.path("M" + pos.x1 + " " + pos.y1 + "L" + pos.x2 + " " + pos.y2);

  var to_push = {
    from: from,
    to: to,
    line: line
  };
  lines.push(to_push);
}

function removeCircle(){
  if(ok_to_remove === true){
    var index = getRandomInt(0, nodes.length - 1);
    var the_id = nodes[index].id;

    for(var i = 0; i < lines.length; i++){
      if(lines[i].from === the_id || lines[i].to === the_id){
        removeLine(lines[i].from, lines[i].to);
      }
    }

    nodes[index].circle.remove();
    nodes.splice(index, 1);
  }
}

function removeLine(from, to){
  for(var i = 0; i < lines.length; i++){
    if(lines[i].from === from && lines[i].to === to){
      lines[i].line.remove();
      lines.splice(i,1);
    }
  }
}

function getNumberOfLines(){
  var res = getRandomInt(0, 100);
  if(res <= 50){
    return 1;
  }
  else if(res <= 80){
    return 2;
  }
  return 3;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getProb(prob){
  var res = getRandomInt(0, 99);
  var probability = prob * 100; //it's a decimal

  if(res < probability){
    return true;
  }
  return false;
}

window.setInterval(function(){
  var $prob_add = getProb(prob_add);
  if($prob_add === true){
    addCircle();
    prob_add = 0.3;
  }
  else{
    prob_add+=0.1;
  }

  var $prob_remove = getProb(prob_remove);
  if($prob_remove === true){
    removeCircle();
    prob_remove = 0.05;
  }
  else{
    prob_remove+=0.1;
  }

  for(var i = 0; i < nodes.length; i++){
    var $prob_move = getProb(0.75);
    if($prob_move === true){
      var x = getRandomInt(0, $("#main > svg").width());
      var y = getRandomInt(0, $("#main > svg").height());

      nodes[i].circle.animate({
        cx: x,
        cy: y
      }, 500, ">");

      var $id = nodes[i].id;

      for(var j = 0; j < lines.length; i++){
        if(lines[j].to === $id){
          var path = "M" + pos.x1 + " " + pos.y1 + "L" + pos.x2 + " " + pos.y2;

          lines[j].line.animate({
            path: path
          }, 500, ">");
        }
        else if(lines[j].from === $id){

        }
      }
    }
  }
}, 700);

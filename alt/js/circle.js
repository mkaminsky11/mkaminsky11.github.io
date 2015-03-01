var circles = {};

circles.init = function(){
  $("#contact>div>div").hover(function(){

    var id = $(this).find(">.circle");
    if(id.attr("data-dir") === "=" || id.attr("data-dir") === "+"){
      circles.increment($(id), true);
      $(id).attr("data-dir","+");
    } else {
      $(id).attr("data-dir","+");
      $(id).attr("data-deg","0");
    }

  }, function(){

    var id = $(this).find(">.circle");
    if(id.attr("data-dir") === "=" || id.attr("data-dir") === "-"){
      circles.increment($(id), false);
      $(id).attr("data-dir","-");
    } else{
      $(id).attr("data-dir","+");
      $(id).attr("data-deg","0");
    }
  });
};

circles.increment = function(elem, open){
  if(open === true){
      var deg = Number(elem.attr("data-deg"));
      if(deg !== 360){
        deg+=10;
        elem.attr("data-deg", deg);
        circles.renderCircle(elem,deg);

        window.setTimeout(function(){
          circles.increment(elem, open);
        }, 10);
      } else {
        elem.attr("data-dir","=");
      }
  }
  else{
    var deg = Number(elem.attr("data-deg"));
    if(deg !== 0){
      deg-=10;
      elem.attr("data-deg", deg);
      circles.renderCircle(elem,deg);

      window.setTimeout(function(){
        circles.increment(elem, open);
      }, 10);
    }
    else{
      elem.attr("data-dir","=");
    }
  }

};

circles.renderCircle = function(elem, deg){
    var canvas = document.getElementById($(elem).attr("id"));
    var context = canvas.getContext('2d');

    context.strokeStyle = 'rgb(252, 238, 182)';
    context.fillStyle= 'rgba(0,0,0,0)';
    context.lineWidth = 2;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 20, -(Math.PI / 2), deg*(2 * Math.PI / 360) - Math.PI / 2, false);
    context.stroke();

    var deg1 = Math.sqrt(deg * 360);
    var deg2 = Math.pow(deg,2) / 360;

    context.strokeStyle = "rgb(120, 192, 168)";

    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 23, -(Math.PI / 2), deg1*(2 * Math.PI / 360) - Math.PI / 2, false);
    context.stroke();

    context.strokeStyle = "rgb(240, 168, 48)";

    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 26, -(Math.PI / 2), deg2*(2 * Math.PI / 360) - Math.PI / 2, false);
    context.stroke();
};

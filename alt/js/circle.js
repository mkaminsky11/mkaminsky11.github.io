var circles = {};

circles.init = function(){
  $(".circle").each(function(index){
    circles.renderCircle($(this));
  });

  $("#contact>div>div").hover(function(){



  }, function(){


  });
};

circles.renderCircle = function(elem){
    var canvas = elem.get(0);
    var context = canvas.getContext('2d');

    context.strokeStyle = 'rgba(0,0,0,0)';
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle= 'rgba(255,255,255,0.2)';
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, canvas.height/2, -(Math.PI / 2), 2 * Math.PI - Math.PI / 2, false);
    context.fill();

    context.fillStyle= '#F44142';
    context.beginPath();
    context.arc(5, canvas.height/2, 5, -(Math.PI / 2), 2 * Math.PI - Math.PI / 2, false);
    context.fill();

    context.beginPath();
    context.arc(canvas.width-5, canvas.height/2, 5, -(Math.PI / 2), 2 * Math.PI - Math.PI / 2, false);
    context.fill();
};

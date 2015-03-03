var inc = {};

inc.increment = function(curr, goal, elem, up){
  if(curr !== goal){

    var next = curr + up;
    elem.html(next);

    window.setTimeout(function(){
      inc.increment(next, goal, elem, up);
    }, 100);

  }
};


inc.check = function(){
  $(".inc").each(function(){
    if($(this).html() === $(this).attr("data-start") && $(window).scrollTop() > ($(this).position().top + 20)){
      var goal = Number($(this).attr("data-goal"));
      var curr = Number($(this).attr("data-start"));
      var up = Number($(this).attr("data-inc"));
      var elem = $(this);

      inc.increment(curr, goal, elem, up);
    }

  });
};

var tilted = {};

tilted.init = function(){
  //tilt them correctly
  /*$(".tilted-img").velocity({
    rotateY: "-45 deg",
    rotateX: "-45 deg",
  },{
    complete: function(){
      $(".tilted-img").css("position", "relative");
    },
    duration: 100
  });*/
  //set hover effects

  $(".tilted-img").each(function(index){
    $(this).hover(function(){
      $(".tilted-img").not(this).velocity({
        opacity: 0.5
      },{
        queue: false
      });
      $(this).velocity({
        opacity: 1
      },{
        queue: false
      });
    }, function(){
      $(".tilted-img").velocity({
        opacity: 1
      },{
        queue: false
      });
    });
  });

};

tilted.resize = function(){

  $("#tilted-img-2").velocity({
    translateX: "20%" ,
    translateY: "-0%",
    marginBottom: -1*$("#tilted-img-2").height()
  },{
    duration: 100
  });

  $("#tilted-img-1").velocity({
    translateX: "80%" ,
    translateY: "-0%",
    marginBottom: -1*$("#tilted-img-1").height()
  },{
    duration: 100
  });

  var margin = 0.15 * $("#tilted-img-2").height() + 0.25 * $("#tilted-img-1").height();

  $("#tilted-div").css("margin-top", margin);
};

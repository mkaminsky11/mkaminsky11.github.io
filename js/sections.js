var sections = {};

sections.init = function(){

    $(".software").hover(function(){
      sections.software();
    }, function(){
      sections.reset();
    });

    $(".front-end").hover(function(){
      sections.frontend();
    }, function(){
      sections.reset();
    });

    $(".back-end").hover(function(){
      sections.backend();
    }, function(){
      sections.reset();
    });

};

sections.reset = function(){
  $(".software, .front-end, .back-end").velocity({
    opacity: 1
  },{
    queue: false
  });
};

sections.software = function(){
  $(".software").velocity({
    opacity: 1
  },{
    queue: false
  });

  $(".front-end, .back-end").velocity({
    opacity: 0.5
  },{
    queue: false
  });
};

sections.frontend = function(){
  $(".front-end").velocity({
    opacity: 1
  },{
    queue: false
  });

  $(".software, .back-end").velocity({
    opacity: 0.5
  },{
    queue: false
  });
};

sections.backend = function(){
  $(".back-end").velocity({
    opacity: 1
  },{
    queue: false
  });

  $(".front-end, .software").velocity({
    opacity: 0.5
  },{
    queue: false
  });
};

sections.resize = function(){
  if($(window).width() > 600){

    $("img.front-end").velocity({
      translateX: "20%" ,
      translateY: "-0%",
      marginBottom: -1*$("img.front-end").height()
    },{
      duration: 100
    });

    $("img.front-end").attr("width","80%");
    $("img.software").attr("width","40%");
    $("img.back-end").attr("width","80%");

    $("img.software").velocity({
      translateX: "80%" ,
      translateY: "-0%",
      marginBottom: -1*$("img.software").height()
    },{
      duration: 100
    });

    var margin = 0.15 * $("img.front-end").height() + 0.25 * $("img.software").height();

    $("#tilted-div").css("margin-top", margin);
  }
  else{
    $("img.front-end").attr("width","100%");
    $("img.front-end").css("margin-bottom","0");
    $("img.front-end").velocity({
      translateX: "0%"
    });
    $("img.software").attr("width","100%");
    $("img.software").css("margin-bottom","0");
    $("img.software").velocity({
      translateX: "0%"
    });
    $("img.back-end").attr("width","100%");
    $("img.back-end").css("margin-bottom","0");
  }
};

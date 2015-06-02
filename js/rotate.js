var rotate = {};
rotate.init = function(){
  rotate.resize();
  $("#rotate-1").attr("src", rotate.random());
  rotate.rotate();

  window.setInterval(function(){
    rotate.rotate();
  }, 2500);
};

rotate.files = [
  "sketch", "jquery", "kali", "linux", "kinect", "atom",
  "node.js", "meteor"
];

rotate.rotate = function(){
  var new_file = rotate.random();
  $("#rotate-2").attr("src", new_file);
  $("#rotate-2").css("display","block");

  $("#rotate-1").velocity({
    marginTop: "100%"
  },{
    duration: 500,
    queue: false
  })

  $("#rotate-2").velocity({
    bottom: 0
  },{
    duration: 500,
    queue: false,
    complete: function(){
      $("#rotate-1").attr("src", new_file);
      $("#rotate-2").css("display","none");
      $("#rotate-2").css("bottom","100%");
      $("#rotate-1").css("margin-top","0");
    }
  });


};

rotate.resize = function(){
  var width = $("#rotate div").width();
  $("#rotate div").css("height", width);

  $("#rotate-2").height($("#rotate-1").height());
  $("#rotate-2").width($("#rotate-1").width());

  $("#blur-top #blur-bottom").width($("#rotate-1").width());
};

rotate.random = function(){
    var path = "img/rotate/" + rotate.files[Math.floor(Math.random() * rotate.files.length)] + ".png";
    if(path !== $("#rotate-1").attr("src")){
      return path;
    }
    else{
      return rotate.random();
    }
};

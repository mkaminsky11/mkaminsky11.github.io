var link = {};

link.init = function(){
  $(".real-link").each(function(index){
    var text = $(this).html();
    $(this).html(text);
  });

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   // some code..
   $(".tooltip-content").css("display","none");
  }
};

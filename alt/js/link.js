var link = {};

link.init = function(){
  $(".real-link").each(function(index){
    var text = $(this).html();
    $(this).html(text);
  });
};

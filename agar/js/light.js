var light = {};

light.init = function(){
  $("[data-lightbox]").hover(function(){
    var id = "eye-" + $(this).attr("data-svg");
    var obt3 = new Vivus(id, {type: 'oneByOne', duration: 75});
    obt3.reset().play()

    $(this).find(".image-overlay").velocity({
      opacity: 1
    },{
      duration: 200
    });
  },function(){
    $(this).find(".image-overlay").velocity({
      opacity: 0
    },{
      duration: 200
    });
  });
};

var menu = {};
menu.done = true;

menu.toggle = function(){
  if($("#menu-dropdown").css("display") === "none" && menu.done === true){
    menu.done = false;
    //show it
    $("#menu-dropdown li").css("opacity",0);
    $("#menu-dropdown").css("display","block");

    $("#menu-dropdown li").velocity("transition.slideLeftIn", {
      stagger: 70 ,
      duration: 700,
      complete: function(){
        menu.done = true;
      }
    });
  }
  else if(menu.done === true){
    menu.done = false;
    //hide it
    $("#menu-dropdown li").velocity("transition.slideLeftOut", {
      stagger: 70 ,
      duration: 700,
      complete: function(){
        $("#menu-dropdown").css("display","none");
        menu.done = true;
      }
    });
  }
};

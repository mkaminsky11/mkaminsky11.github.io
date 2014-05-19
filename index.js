$("#js_div").hover(function(){
    $("#js_p").slideToggle( "slow", "linear" );
  },function(){
});
$("#js_p").slideToggle( "slow", "linear" );
//
$("#css_div").hover(function(){
    $("#css_p").slideToggle( "slow", "linear" );
  },function(){
});
$("#css_p").slideToggle( "slow", "linear" );
//
$("#html_div").hover(function(){
    $("#html_p").slideToggle( "slow", "linear" );
  },function(){
});
$("#html_p").slideToggle( "slow", "linear" );
//
$("#sql_div").hover(function(){
    $("#sql_p").slideToggle( "slow", "linear" );
  },function(){
});
$("#sql_p").slideToggle( "slow", "linear" );
//
$("#java_div").hover(function(){
    $("#java_p").slideToggle( "slow", "linear" );
  },function(){
});
$("#java_p").slideToggle( "slow", "linear" );
//
$("#c_div").hover(function(){
    $("#c_p").slideToggle( "slow", "linear" );
  },function(){
});
 $("#c_p").slideToggle( "slow", "linear" );
 
 
 
var l1_goal = [-23552,211072,-56064,210688]; //x1,y1,x2,y2
var l2_goal = [95360,124672,82944,156800];
var l3_goal = [117760,152704,93169,145594];
var l4_goal = [278400,234496,253952,234240];

var l1_start = [9940,18395,18458,20519];
var l2_start = [13187,17025,20789,12635];
var l3_start = [183207,-31116,191029,-27130];
var l4_start = [185356,-30855,193974,-32530];

var l1_diff = [-33492, 192677, -74522, 190169];
var l2_diff = [82173, 107647, 62155, 144165];
var l3_diff = [-65447, 183820, -97860, 172724];
var l4_diff = [93044, 265351, 59978, 266770];

var delay = 0;

var total_time = 1000;

var current = 0;

//opening
var l1_open_rate = [-837, 4817, -1863, 4754];
var l2_open_rate = [2054, 2691, 1554, 3604] ;
var l3_open_rate = [-1636, 4596, -2446, 4318];
var l4_open_rate = [2326, 6634, 1499, 6669];

var l1_close_rate = [837, -4817, 1863, -4754];
var l2_close_rate = [-2054, -2691, -1554, -3604]
var l3_close_rate = [1636, -4596, 2446, -4318]
var l4_close_rate = [-2326, -6634, -1499, -6669] ;

function form_path(anchor, move){
    var result = "";
    result = "M" + anchor[0] + " " + anchor[1]; //anchor 1
    result = result + " L" + anchor[2] + " " + anchor[3]; //anchor 2
    
    result = result + " L" + move[0] + " " + move[1];
    result = result + " L" + move[2] + " " + move[3] + " Z";
    return result;
}

function set_svg(l1,l2,l3,l4){
    document.getElementById('l1').setAttribute('d',l1);
    document.getElementById('l2').setAttribute('d',l2);
    document.getElementById('l3').setAttribute('d',l3);
    document.getElementById('l4').setAttribute('d',l4);
}

function close_at_frame(frame){
    var l1_temp = [0,0,0,0];
    var l2_temp = [0,0,0,0];
    var l3_temp = [0,0,0,0];
    var l4_temp = [0,0,0,0];
    //goal + change*frame = new
    for(var i = 0; i < 4; i++){
        l1_temp[i] = l1_goal[i] + l1_close_rate[i]*frame;
        l2_temp[i] = l2_goal[i] + l2_close_rate[i]*frame;
        l3_temp[i] = l3_goal[i] + l3_close_rate[i]*frame;
        l4_temp[i] = l4_goal[i] + l4_close_rate[i]*frame;
    }
    var l1_path = form_path(l1_start,l1_temp);
    var l2_path = form_path(l2_start,l2_temp);
    var l3_path = form_path(l3_start,l3_temp);
    var l4_path = form_path(l4_start,l4_temp);
    
    set_svg(l1_path,l2_path,l3_path,l4_path);
}

function open_at_frame(frame){
    var l1_temp = [0,0,0,0];
    var l2_temp = [0,0,0,0];
    var l3_temp = [0,0,0,0];
    var l4_temp = [0,0,0,0];
    //goal + change*frame = new
    for(var i = 0; i < 4; i++){
        l1_temp[i] = l1_start[i] + l1_open_rate[i]*frame;
        l2_temp[i] = l2_start[i] + l2_open_rate[i]*frame;
        l3_temp[i] = l3_start[i] + l3_open_rate[i]*frame;
        l4_temp[i] = l4_start[i] + l4_open_rate[i]*frame;
    }
    var l1_path = form_path(l1_start,l1_temp);
    var l2_path = form_path(l2_start,l2_temp);
    var l3_path = form_path(l3_start,l3_temp);
    var l4_path = form_path(l4_start,l4_temp);
    
    set_svg(l1_path,l2_path,l3_path,l4_path);
}

function open_frame(frame){
	    open_at_frame(frame);
	    if(frame !== 40){
	        setTimeout(function(){
	                   current = current-1;
	                   open_frame(40-current);
                       },25);
	    }
}

function close_frame(frame){
	    close_at_frame(frame);
	    if(frame !== 40){
	        setTimeout(function(){
	                   current = current+1;
	                   close_frame(current);
                       },25);
	    }
}




$("#profile>svg").hover(function(){
	if(current === 0){
		close_frame(current);
	}
	if(current === 40){
		open_frame(0);
	}
},function(){
	
});

var github = {};

github.init = function(){
	$(".github-info").each(function(index){
		var elem = this;
		var user = new Gh3.User($(this).attr("github-info").split("/")[0]);
		var _repo = new Gh3.Repository($(this).attr("github-info").split("/")[1], user);
		_repo.fetch(function (err, res) {
		    if(err) { console.log("github info error...") }
		   	else{
		   		var html = "<i class=\"fa fa-star\"></i>" + res.watchers_count;
		   		html += "<i class=\"fa fa-code-fork\"></i>" + res.forks_count;
		   		$(elem).html(html);
		   	}
		});
	});
}
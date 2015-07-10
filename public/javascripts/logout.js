document.getElementById('logout').addEventListener("click", function(){
	if(confirm("确定要退出吗？")){
		window.location.href = "login";
	}
})
/*document.getElementById('logout').addEventListener("click", function(){
	logout(function(){
		window.location.href = "login";
	});
})*/
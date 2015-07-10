document.getElementById('reset').addEventListener("click", function(){
	if(confirm("确定要重置所有已填信息吗？")){
		document.getElementById('userName').value = '';
		document.getElementById('email').value = '';
		document.getElementById('password').value = '';
	}
})
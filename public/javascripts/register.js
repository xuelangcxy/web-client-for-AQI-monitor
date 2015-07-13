function load() {
    document.getElementById('userName').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
}

document.getElementById('submits').addEventListener("click", function() {

    var userData = {};
    userData.userName = document.getElementById('userName').value;
    userData.password = document.getElementById('password').value;
    userData.email = document.getElementById('email').value;
    console.log(userData.userName);
    console.log(userData.password);
    console.log(userData.email);

    register(userData.userName, userData.password, userData.email, new function() {
        this.successCallback = function(message) {
            console.log('registerSucceed' + message);
            document.body.innerHTML = '    <div class="toolbar"><h1>欢迎使用空气质量监测系统</h1></div>' + '<h1 style="color:red">恭喜您注册成功！</h1>' + '<h2>请牢记您的用户名和用户ID！</h2>' + '<h2>用户名：' + message.userName + '</h2>' + '<h2>用户ID：' + message._id + '</h2> ' + '<h2>邮箱：' + message.email + '</h2>' + '<a href="login"><input style="width:300px" type="button" value="点击此处去登录" class="btn btn-lg btn-primary btn-block"></a>';
        };
        this.errorCallback = function(message) {
            console.log('registerFailed' + message);
            document.body.innerHTML = '    <div class="toolbar"><h1>欢迎使用空气质量监测系统</h1></div>' + '<p style="color:red">注册失败！请重新注册！</p>' + '<a href="register"><input style="width:300px" type="button" value="点击此处重新注册" class="btn btn-lg btn-primary btn-block"></a>';
        };
        this.connectCallback = function(message) {
            console.log('connectSucceed' + message);
        };
        this.disconnectCallback = function(message) {
            console.log('disconnect' + message);
        };
        this.socketErrorCallback = function(message) {
            console.log('socketError' + message);
        };
    });
}, false);
document.getElementById('submits').addEventListener("click", function() {
    var userData = {};
    userData.userId = document.getElementById('userId').value;
    userData.password = document.getElementById('password').value;

    login(userData.userId, userData.password, new function() {
        this.newMessageCallback = function(message) {
            var cre = document.createElement('p');
            cre.innerHTML = jsonprinter(message);
            cre.style.color = 'blue';
            document.getElementById('newMessages').appendChild(cre);
        };
        this.successCallback = function(message) {
            document.body.innerHTML = '<div class="toolbar"><h1>欢迎使用空气质量监测系统</h1></div>' + '<h1 style="color:red">恭喜您登录成功！</h1>' + '<h2>用户： ' + userData.userId + '</h2>' + '<p>3秒后自动跳转至主界面...</p>' + '或<a href="monitor">点击此处直接跳转</a>' + '<input id="subscribeOnTheme" type="button" style="width:200px;" value="subscribeOnTheme" class="btn btn-lg btn-primary btn-block">';
            /*setTimeout(function(){
                window.location.href="monitor";
            }, 3000);*/
            console.log("login successfully!");

            document.getElementById('subscribeOnTheme').addEventListener("click", function() {
                subscribeOnTheme('559a3c3b403a530115d1c3a3', '559b76f98c888d3e19742afa', '559b79498c888d3e19742afb', '', '', '', '', '', '', '', '', '', new function() {
                        var data = {};
                        var subscriber = {};

                        /*subscriber._id = subscriberId;*/
                        data.subscriber = subscriber;
                        /*data.spaceId = spaceId;
                        data.themeId = themeId;*/

                        this.successCallback = function(message) {
                            console.log(message);
                        }
                        this.errorCallback = function(message) {

                        }
                    })
                    //console.log("message");
            })


        };
        this.errorCallback = function(message) {
            if (confirm("用户名或密码错误，请重新输入！")) {
                document.getElementById('userId').value = '';
                document.getElementById('password').value = '';
            };
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

    })
})

var socket = io.connect("http://10.110.138.177:3002/access");
socket.on('newMessages', function(data) {
    console.log(data);
})
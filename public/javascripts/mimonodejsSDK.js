/**
 * mimonode APIs for JS Applications
 * 
 * @author xufei
 * 
 * @version v1.0
 * 
 * @date 2015.6.17
 */


/*<script src="socket.io-stream.js"></script>
<script src="blob-stream.js"></script>
<script src="socketio.js"></script>*/


var socket;


/**
 * This function is used to connect the mimonode server.
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function connect(callback){ 

	socket=io.connect("http://10.110.138.177:3002/access"); 


	socket.on('connection',function(){
		callback.connectCallback();
	});
	socket.on('disconnect',function(){
		callback.disconnectCallback();
	});
	socket.on('error',function(object){
		callback.socketErrorCallback(object);
	});
	socket.connect();
}


/**
 * This function is used to register an account in mimonode.
 * @param  {[type]}   userName [description]
 * @param  {[type]}   password [description]
 * @param  {[type]}   email    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function register(userName,password,email,callback){
	//this.connect(callback);
	connect(callback);

	var userData={};
	userData.userName=userName;
	userData.password=password;
	userData.email=email;

	socket.emit("register",userData);
	socket.on("registerSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("registerFailed",function(object){
		callback.errorCallback(object);
	});
}

/**
 * This function is used to login the mimonode.New messages will be accepted from now on if there are any messages.
 * @param  {[type]}   userId   [description]
 * @param  {[type]}   password [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function login(userId,password,callback){
	//this.connect(callback);
	connect(callback);
	socket.on("newMessage",function(object){
		callback.newMessageCallback(object);
	});

	var userData={};

	userData.userId=userId;
	userData.password=password;

	socket.emit("auth",userData);
	socket.on("authSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("authFailed",function(object){
		callback.errorCallback(object);
	});
}

/**
 * This function is used to logout the mimonode.
 * @return {[type]} [description]
 */
function logout(){
	socket.disconnect();
}

/**
 * This function is used to getStoredMessages in mimonode.
 * @param  {[type]}   userId   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getStoredMessages(userId,callback){
	var data={};

	data.userId=userId;

	socket.emit("getStoredMessages",data);
	socket.on("getStoredMessagesSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("getStoredMessagesFailed",function(object){
		callback.errorCallback(object);
	});
}

/**
 * This function is used to createSpace in mimonode.
 * @param  {[type]}   owner             [description]
 * @param  {[type]}   spaceName         [description]
 * @param  {[type]}   spaceType         [description]
 * @param  {[type]}   algorithmType     [description]
 * @param  {[type]}   privacy           [description]
 * @param  {[type]}   secureLevel       [description]
 * @param  {[type]}   defaultPermission [description]
 * @param  {Function} callback          [description]
 * @return {[type]}                     [description]
 */
function createSpace(owner,spaceName,spaceType,algorithmType,privacy,secureLevel,defaultPermission,callback){
	var space={};

	space.spaceName=spaceName;
	space.spaceType=spaceType;
	space.algorithmType=algorithmType;
	space.privacy=privacy;
	space.secureLevel=secureLevel;
	space.defaultPermission=defaultPermission;
	space.owner=owner;

	socket.emit("createSpace",space);
	socket.on("createSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("createSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}

/**
 * This function is used to deleteSpace in mimonode.
 * @param  {[type]}   userId   [description]
 * @param  {[type]}   spaceId  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function deleteSpace(userId,spaceId,callback){
	var space={};

	space.spaceId=spaceId;
	space.userId=userId;

	socket.emit("deleteSpace",space);
	socket.on("deleteSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("deleteSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to subscribeOnSpace in mimonode.
 * @param  {[type]}   subscriberId [description]
 * @param  {[type]}   spaceId      [description]
 * @param  {[type]}   attrName1    [description]
 * @param  {[type]}   subValue11   [description]
 * @param  {[type]}   subValue12   [description]
 * @param  {[type]}   attrName2    [description]
 * @param  {[type]}   subValue21   [description]
 * @param  {[type]}   subValue22   [description]
 * @param  {[type]}   attrName3    [description]
 * @param  {[type]}   subValue31   [description]
 * @param  {[type]}   subValue32   [description]
 * @param  {Function} callback     [description]
 * @return {[type]}                [description]
 */
function subscribeOnSpace(subscriberId,spaceId,attrName1,subValue11,subValue12,attrName2,subValue21,subValue22,attrName3,subValue31,subValue32,callback){
	var data={};
	var subscriber={};
	var constraint1={};
	var constraint2={};
	var constraint3={};

	constraint1.attrName=attrName1;
	constraint1.subValue1=subValue11;
	constraint1.subValue2=subValue12;
	constraint2.attrName=attrName2;
	constraint2.subValue1=subValue21;
	constraint2.subValue2=subValue22;
	constraint3.attrName=attrName3;
	constraint3.subValue1=subValue31;
	constraint3.subValue2=subValue32;
	var constraints=[constraint1,constraint2,constraint3];
		
	subscriber._id=subscriberId;
	subscriber.constraints=constraints;

	data.subscriber=subscriber;
	data.spaceId=spaceId;


	socket.emit("subscribeOnSpace",data);
	socket.on("subscribeOnSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("subscribeOnSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to unsubscribeOnSpace in mimonode.
 * @param  {[type]}   subscriberId [description]
 * @param  {[type]}   spaceId      [description]
 * @param  {Function} callback     [description]
 * @return {[type]}                [description]
 */
function unsubscribeOnSpace(subscriberId,spaceId,callback){
	var data={};

	data.spaceId=spaceId;
	data.userId=userId;

	socket.emit("unsubscribeOnSpace",data);
	socket.on("unsubscribeOnSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("unsubscribeOnSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to publishMessage in mimonode.
 * @param  {[type]}   publisherId [description]
 * @param  {[type]}   spaceId     [description]
 * @param  {[type]}   themeId    [description]
 * @param  {[type]}   secureLevel [description]
 * @param  {[type]}   msgType     [description]
 * @param  {[type]}   content     [description]
 * @param  {[type]}   attrName1   [description]
 * @param  {[type]}   value1      [description]
 * @param  {[type]}   attrName2   [description]
 * @param  {[type]}   value2      [description]
 * @param  {[type]}   attrName3   [description]
 * @param  {[type]}   value3      [description]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
 */
function publishMessage(publisherId,spaceId,themeId,secureLevel,msgType,content,attrName1,value1,attrName2,value2,attrName3,value3,callback){
	var data={};
	var description1={};
	var description2={};
	var description3={};


	description1.attrName=attrName1;
	description1.value=value1;
	description2.attrName=attrName2;
	description2.value=value2;
	description3.attrName=attrName3;
	description3.value=value3;
	var descriptions=[description1,description2,description3];

	data.spaceId=spaceId;
	data.themeId=themeId;
	data.puber=publisherId;
	data.secureLevel=secureLevel;
	data.msgType=msgType;
	data.content=content;
	data.descriptions=descriptions;

             if(data.themeId==""){
             	socket.emit("publishOnSpace",data);
             	socket.on("publishOnSpaceSucceed",function(object){
		callback.successCallback(object);
	              });
	socket.on("publishOnSpaceFailed",function(object){
		callback.errorCallback(object);
	              });
             }else{
             	socket.emit("publishOnTheme",data);
             	socket.on("publishOnThemeSucceed",function(object){
             		callback.successCallback(object);
             	});
             	socket.on("publishOnThemeFailed",function(object){
             		callback.errorCallback(object);
             	});
             }

}


/**
 * This function is used to publishOnSpace in mimonode.
 * @param  {[type]}   publisherId [description]
 * @param  {[type]}   spaceId     [description]
 * @param  {[type]}   secureLevel [description]
 * @param  {[type]}   msgType     [description]
 * @param  {[type]}   content     [description]
 * @param  {[type]}   attrName1   [description]
 * @param  {[type]}   value1      [description]
 * @param  {[type]}   attrName2   [description]
 * @param  {[type]}   value2      [description]
 * @param  {[type]}   attrName3   [description]
 * @param  {[type]}   value3      [description]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
 */
function publishOnSpace(publisherId,spaceId,secureLevel,msgType,content,attrName1,value1,attrName2,value2,attrName3,value3,callback){
	var data={};
	var description1={};
	var description2={};
	var description3={};


	description1.attrName=attrName1;
	description1.value=value1;
	description2.attrName=attrName2;
	description2.value=value2;
	description3.attrName=attrName3;
	description3.value=value3;
	var descriptions=[description1,description2,description3];

	data.spaceId=spaceId;
	data.puber=publisherId;
	data.secureLevel=secureLevel;
	data.msgType=msgType;
	data.content=content;
	data.descriptions=descriptions;


	socket.emit("publishOnSpace",data);
	socket.on("publishOnSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("publishOnSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to publishStreamOnSpace in mimonode.
 * @param  {[type]}   publisherId [description]
 * @param  {[type]}   spaceId     [description]
 * @param  {[type]}   secureLevel [description]
 * @param  {[type]}   msgType     [description]
 * @param  {[type]}   content     [description]
 * @param  {[type]}   attrName1   [description]
 * @param  {[type]}   value1      [description]
 * @param  {[type]}   attrName2   [description]
 * @param  {[type]}   value2      [description]
 * @param  {[type]}   attrName3   [description]
 * @param  {[type]}   value3      [description]
 * @param  {Function} callback    [description]
 * @param  {[type]}   file        [description]
 * @return {[type]}               [description]
 */
function publishStreamOnSpace(publisherId,spaceId,secureLevel,msgType,content,attrName1,value1,attrName2,value2,attrName3,value3,file,callback){
	var stream=ss.createStream();
	var data={};
	var description1={};
	var description2={};
	var description3={};
	description1.attrName=attrName1;
	description1.value=value1;
	description2.attrName=attrName2;
	description2.value=value2;
	description3.attrName=attrName3;
	description3.value=value3;
	var descriptions=[description1,description2,description3];

	data.size=file.size;
	data.name=file.name;
	data.spaceId=spaceId;
	data.puber=publisherId;
	data.secureLevel=secureLevel;
	data.msgType=msgType;
	data.content=content;
	data.descriptions=descriptions;

	ss(socket).emit("publishStreamOnSpace",stream,data);
	var blobStream=ss.createBlobReadStream(file);
	blobStream.pipe(stream);
	socket.on("publishStreamOnSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("publishStreamOnSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to createThemeOnSpace in mimonode.
 * @param  {[type]}   owner             [description]
 * @param  {[type]}   spaceId           [description]
 * @param  {[type]}   themeName         [description]
 * @param  {[type]}   themeType         [description]
 * @param  {[type]}   algorithmType     [description]
 * @param  {[type]}   privacy           [description]
 * @param  {[type]}   secureLevel       [description]
 * @param  {[type]}   defaultPermission [description]
 * @param  {Function} callback          [description]
 * @return {[type]}                     [description]
 */
function createThemeOnSpace(owner,spaceId,themeName,themeType,algorithmType,privacy,secureLevel,defaultPermission,callback){
	var space={};
	var theme={};

	theme.spaceName=themeName;
	theme.spaceType=themeType;
	theme.algorithmType=algorithmType;
	theme.privacy=privacy;
	theme.secureLevel=secureLevel;
	theme.defaultPermission=defaultPermission;
	theme.owner=owner;
	space.spaceId=spaceId;
	space.theme=theme;
	

	socket.emit("createThemeOnSpace",space);
	socket.on("createThemeOnSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("createThemeOnSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to deleteThemeOnSpace in mimonode.
 * @param  {[type]}   userId   [description]
 * @param  {[type]}   spaceId  [description]
 * @param  {[type]}   themeId  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function deleteThemeOnSpace(userId,spaceId,themeId,callback){
	var data={};

	data.spaceId=spaceId;
	data.themeId=themeId;
	data.userId=userId;
	

	socket.emit("deleteThemeOnSpace",data);
	socket.on("deleteThemeOnSpaceSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("deleteThemeOnSpaceFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to subscribeOnTheme in mimonode.
 * @param  {[type]}   subscriberId [description]
 * @param  {[type]}   spaceId      [description]
 * @param  {[type]}   themeId      [description]
 * @param  {[type]}   attrName1    [description]
 * @param  {[type]}   subValue11   [description]
 * @param  {[type]}   subValue12   [description]
 * @param  {[type]}   attrName2    [description]
 * @param  {[type]}   subValue21   [description]
 * @param  {[type]}   subValue22   [description]
 * @param  {[type]}   attrName3    [description]
 * @param  {[type]}   subValue31   [description]
 * @param  {[type]}   subValue32   [description]
 * @param  {Function} callback     [description]
 * @return {[type]}                [description]
 */
function subscribeOnTheme(subscriberId,spaceId,themeId,attrName1,subValue11,subValue12,attrName2,subValue21,subValue22,attrName3,subValue31,subValue32,callback){
	var data={};
	var subscriber={};
	var constraint1={};
	var constraint2={};
	var constraint3={};
	
	constraint1.attrName=attrName1;
	constraint1.subValue1=subValue11;
	constraint1.subValue2=subValue12;
	constraint2.attrName=attrName2;
	constraint2.subValue1=subValue21;
	constraint2.subValue2=subValue22;
	constraint3.attrName=attrName3;
	constraint3.subValue1=subValue31;
	constraint3.subValue2=subValue32;
	var constraints=[constraint1,constraint2,constraint3];

	subscriber._id=subscriberId;
	subscriber.constraints=constraints;
	data.subscriber=subscriber;
	data.spaceId=spaceId;
	data.themeId=themeId;
	

	socket.emit("subscribeOnTheme",data);
	socket.on("subscribeOnThemeSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("subscribeOnThemeFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to unsubscribeOnTheme in mimonode.
 * @param  {[type]}   subscriberId [description]
 * @param  {[type]}   spaceId      [description]
 * @param  {[type]}   themeId      [description]
 * @param  {Function} callback     [description]
 * @return {[type]}                [description]
 */
function unsubscribeOnTheme(subscriberId,spaceId,themeId,callback){
	var data={};
	
	data.spaceId=spaceId;
	data.themeId=themeId;
	data.userId=subscriberId;
	

	socket.emit("unsubscribeOnTheme",data);
	socket.on("unsubscribeOnThemeSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("unsubscribeOnThemeFailed",function(object){
		callback.errorCallback(object);
	});
	
}


/**
 * This function is used to publishOnTheme in mimonode.
 * @param  {[type]}   publisherId [description]
 * @param  {[type]}   spaceId     [description]
 * @param  {[type]}   themeId     [description]
 * @param  {[type]}   secureLevel [description]
 * @param  {[type]}   msgType     [description]
 * @param  {[type]}   content     [description]
 * @param  {[type]}   attrName1   [description]
 * @param  {[type]}   value1      [description]
 * @param  {[type]}   attrName2   [description]
 * @param  {[type]}   value2      [description]
 * @param  {[type]}   attrName3   [description]
 * @param  {[type]}   value3      [description]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
 */
function publishOnTheme(publisherId,spaceId,themeId,secureLevel,msgType,content,attrName1,value1,attrName2,value2,attrName3,value3,callback){
	var data={};
	var description1={};
	var description2={};
	var description3={};

	description1.attrName=attrName1;
	description1.value=value1;
	description2.attrName=attrName2;
	description2.value=value2;
	description3.attrName=attrName3;
	description3.value=value3;
	var descriptions=[description1,description2,description3];

	data.spaceId=spaceId;
	data.themeId=themeId;
	data.puber=publisherId;
	data.secureLevel=secureLevel;
	data.msgType=msgType;
	data.content=content;
	data.descriptions=descriptions;
	
	socket.emit("publishOnTheme",data);
	socket.on("publishOnThemeSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("publishOnThemeFailed",function(object){
		callback.errorCallback(object);
	});
}


/**
 * This function is used to publishStreamOnTheme in mimonode.
 * @param  {[type]}   publisherId [description]
 * @param  {[type]}   spaceId     [description]
 * @param  {[type]}   themeId     [description]
 * @param  {[type]}   secureLevel [description]
 * @param  {[type]}   msgType     [description]
 * @param  {[type]}   content     [description]
 * @param  {[type]}   attrName1   [description]
 * @param  {[type]}   value1      [description]
 * @param  {[type]}   attrName2   [description]
 * @param  {[type]}   value2      [description]
 * @param  {[type]}   attrName3   [description]
 * @param  {[type]}   value3      [description]
 * @param  {Function} callback    [description]
 * @param  {[type]}   file        [description]
 * @return {[type]}               [description]
 */
function publishStreamOnTheme(publisherId,spaceId,themeId,secureLevel,msgType,content,attrName1,value1,attrName2,value2,attrName3,value3,file,callback){
	var stream=ss.createStream();
	var data={};
	var description1={};
	var description2={};
	var description3={};
	description1.attrName=attrName1;
	description1.value=value1;
	description2.attrName=attrName2;
	description2.value=value2;
	description3.attrName=attrName3;
	description3.value=value3;
	var descriptions=[description1,description2,description3];

	data.size=file.size;
	data.name=file.name;
	data.spaceId=spaceId;
	data.themeId=themeId;
	data.puber=publisherId;
	data.secureLevel=secureLevel;
	data.msgType=msgType;
	data.content=content;
	data.descriptions=descriptions;

	ss(socket).emit("publishStreamOnTheme",stream,data);
	var blobStream=ss.createBlobReadStream(file);
	blobStream.pipe(stream);
	socket.on("publishStreamOnThemeSucceed",function(object){
		callback.successCallback(object);
	});
	socket.on("publishStreamOnThemeFailed",function(object){
		callback.errorCallback(object);
	});
}
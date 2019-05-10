
//Handle the message come from login page to background
function loginMsgHandler(msg) {
	console.log(msg);
	switch(msg.subtype){
		default:
	}
}

//根据读档结果处理
function checkLoginUser(cbFunc){
	PaladinDB.getAllPaladinItems(cbFunc);
	/*
	// Complicated way
	PaladinDB.countPaladinItems(function(res){
		var res = null;
		if(res>0) {
			//遍历indexedDB，获取
			PaladinDB.getAllPaladinItems(cbFunc);
		} else {
			if(typeof(cbFunc)!='undefined') {
				cbFunc(res);
			}
		}
	});		
	*/
}

//Handle the message come from C++ Agent to login (via background)
function loginAgentMsgHandler(msg) {
	curPort.postMessage(msg);
}

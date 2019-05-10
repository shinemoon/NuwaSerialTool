//Entry Tab
var curVersion="0.1";
var curPort = null;
var connectionId = null;
var inAlarm = false;

var tmp;


//HeartBeat
var heartBeat = null;


// With permanent background html, no runtime;
chrome.app.runtime.onLaunched.addListener(function() {
  	chrome.app.window.create('main.html', {
		id: 'mainPage',
		frame: 'none',
		resizable: false,
		focused: true,
		'bounds': {
			'width': 1000,
			'height': 600
		}
	});
	pageDidLoad();
	backgroundMsgBinding();
	//开始世界心跳
	startHearBeat();
	//注册事件
	registerHBEvent({
		//闹铃
		name:'Alarming',
		period: 2,
		action:function(){
			if(inAlarm){
				curPort.postMessage ({
					type:'entry',
					subtype:'alarming'
				});
			} else {
				//-> Don't need
			}
		}
	});
});

// If the page loads before the Native Client module loads, then set the
// status message indicating that the module is still loading.  Otherwise,
// do not change the status message.
function pageDidLoad() {
}
	
function backgroundMsgBinding(){
	chrome.runtime.onConnect.addListener(function(port) {
		  	switch(port.name){
			  	case 'login_page':
					//anytime when login page show, need to clean the connection
					connectionId = null;

					curPort = port;
					curPort.onMessage.addListener(function(msg) {
						loginMsgHandler (msg);
					});
					curPort.onDisconnect.addListener(function(){
						curPort = null;
					});
					break;
				case 'entry_page':
					//anytime when login page show, need to clean the connection
					curPort = port;
					curPort.onMessage.addListener(function(msg) {
						console.log(msg);
						//
						if(msg.type='entry'){
							if(msg.subtype=='alarming'){
								inAlarm = true;
							} else if(msg.subtype=='stop-alarming'){
								inAlarm = false;
								curPort.postMessage({
									type : 'entry',
									subtype:'stop-alarming'
								});
							}
						} else {
						}

					});
					curPort.onDisconnect.addListener(function(){
						curPort = null;
					});
					break;
			  	default:
			}
	});
}

function notifyAllPort(msg){
	if(curPort!=null) curPort.postMessage(msg);
}

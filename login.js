var port;
var root = null;
var curOpSlot = null;

var comports=null;

chrome.runtime.getBackgroundPage(function(w){
	root = w;
	setTimeout(function(){loginInit();},1);
});


//---------- Function 

function loginInit(){
	$(document).ready(function(){
		//在login界面就意味着去掉任何runing instance
		root.curRole = null;
		//Port Connection
		port = chrome.runtime.connect({name:'login_page'});
	  	port.onMessage.addListener(function(msg) {
			loginInfoParse (msg);
		});

		//刷新COM数量
		chrome.serial.getDevices(function(p){
			console.log(p);
			if(p.length>0){
				$('.portlist').append("<h3 class='nuwa-hint'>Click To Connect</h3>");
			} else {
				$('.portlist').append("<h3 class='nuwa-hint'>No Valid Connection Fount</h3>");
				//$('.portlist').append("<button class='large span4 offset4 portconnect'>"+"Pse-do Port Connect"+"</button>");
			}
			//显示连接按钮
			$.each(p,function(i,val){
				$('.portlist').append("<button class='large span6 offset3 portconnect'>"+val.path+"</button>");
			});

			$('.portconnect').click(function(){
				//Loading Pic
				$('.loader').show();
				$('.portconnect').hide();
				//Try to connect port:
				chrome.serial.connect($(this).text(), root.configs, function(cfg){
					if(typeof(cfg)!='undefined'){
						chrome.serial.setControlSignals(cfg.connectionId, {"dtr":false, "rts":false}, function(){
							setTimeout(function(){
								chrome.serial.setControlSignals(cfg.connectionId, {"dtr":true, "rts":false}, function(){
									setTimeout(function(){
											chrome.serial.setControlSignals(cfg.connectionId, {"dtr":false}, function(){
												root.connectionId = cfg.connectionId;
					 							window.location.href = 'entry.html'; 
											});
									},100);
								});
							}, 100);
						});
					/*	//No Reset Bind to DTR
						chrome.serial.setControlSignals(cfg.connectionId, {"dtr":false, "rts":false}, function(){
							root.connectionId = cfg.connectionId;
						 	window.location.href = 'entry.html'; 
						});
					*/
					} else {
						metroNotify({
							title:'连接错误',
							icon:'icon-warning',
							message:'打开连接失败，请检查后重试.',
							confirmmsg:'确认'
						}, function(){
				 			window.location.href = 'login.html'; 
						}) ;
						$('.loader').hide();
						$('.portconnect').show();

					}
				});
			});
		});

		$('i.set').click(function(){
			metroConfigWindow(function(){
			});
		});
		$('i.scan').click(function(){
			window.location.href = 'login.html'; 
		});

	});
};



//Callback for parser
function loginInfoParse (msg) {
	switch(msg.type) {
		case "login":	//从background返回的信息
			switch(msg.subtype){
				default:
					break;
			}
			break;
		default:
	}
}


var port;
var root = null;
var clockui=null;
var clockinit=false;

var comports=null;

chrome.runtime.getBackgroundPage(function(w){
	root = w;
	setTimeout(function(){entryInit();},1);
});


//---------- Function

function entryInit(){
	$(document).ready(function(){
		//在entry界面就意味着去掉任何runing instance
		root.curRole = null;
		//Port Connection
		port = chrome.runtime.connect({name:'entry_page'});
	  	port.onMessage.addListener(function(msg) {
			entryInfoParse (msg);
		});
		//Connection:
		var infos = "";
		chrome.serial.onReceive.addListener(function(info){
			var inputChar = new Uint8Array(info.data);
			$.each(inputChar,function(i,v){
				infos = infos + String.fromCharCode(v);
				//one line done
				if(v==10) {
					//--> Judge which tab now!
					//--> Debug Aid Tool
					if($('.console:visible').length>0){
						//Insert to screen
						updateScreen("<div class='content-line'>"+infos+"</div>");
						$('.console').scrollTop($(".console")[0].scrollHeight);
					//--> UI Tool
					} else {
						handleUICmd(infos);
					}
					infos="";
				}
			});
		});

		$(document).keypress(function(e){
   			var curKey = e.which;
		   	if(curKey == 13){
			// 回车send serial port info
				var cmd		= $('input.sinput').val();
				sendStrCmd(cmd, function(){
					$('.console').find('.content-line').addClass('history');
					console.log("SEND DONE");
					$('input.sinput').select();
					infos="";
				});
		    }
		});

		//Iconbutton
		$('.beaker').click(function(){
			if($('.alarm').hasClass('shining')){
				port.postMessage({
					type:'entry',
					subtype:'stop-alarming'
				});
			} else {
				port.postMessage({
					type:'entry',
					subtype:'alarming'
				});
			}
		});
		$('i.clean').click(function(){
			$('.content-line').remove();
		});

		$('i.set').click(function(){
			metroConfigWindow(function(){
			});
		});

		$('i.exit').click(function(){
			chrome.serial.disconnect(root.connectionId, function(r){
				metroConfirm({
					title: 'Disconnect',
					message:'Are you sure you want to disconnect the port?',
					confirmmsg: 'Yes',
					cancelmsg:	'No'
				}, function(){ //confirm
					root.connectionId = null;
					window.location.href = 'login.html';
				}, function(){	//cancel
					$('.window.shadow .btn-close').click();
				});

			});
		});

		//Clock
		generateClock(true);


//Debug - Switch
if(root.offlineDebug){
		clockui = $('.timer').FlipClock({
			autoStart:true,
		});
} else {
		clockui = $('.timer').FlipClock({
			autoStart:false,
		});
}

		//Control debugger status;
		$('.tab-control').tabcontrol().bind("tabcontrolchange", function(event, frame){
			if($('li.active a').text() == "Nuwa UI") {
				//clock need to be initate
				clockinit = false;
				//send serial port info
				sendStrCmd("DEBUGUI 0");
			} else {
				sendStrCmd("DEBUGUI 1");
			};
		});
		handleUIBind();
		sendStrCmd("DEBUGUI 0");
	});
};



//Callback for parser
function entryInfoParse (msg) {
	switch(msg.type) {
		case "entry":	//从background返回的信息
			switch(msg.subtype){
				case 'alarming':
					$('.alarm').addClass('shining').toggle();
					break;
				case 'stop-alarming':
					$('.alarm').removeClass('shining').show();
					break;
				default:
					break;
			}
			break;
		default:
	}
}

//
function updateScreen(content){
	$('.console').append(content);
}

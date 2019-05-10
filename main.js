var port = null;
chrome.runtime.getBackgroundPage(function(w){
	$('img.close').click(function(){
		chrome.app.window.current().close();
	});
	$('img.minimize').click(function(){
		chrome.app.window.current().minimize();
	});

	//-> Main port
	port = chrome.runtime.connect({name:'main'});
  	port.onMessage.addListener(function(msg) {
	});

});



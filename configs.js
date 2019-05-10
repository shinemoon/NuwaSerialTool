var offlineDebug = false;

//Setting!
var configs = {
	bitrate: 	115200,
	dataBits:	'eight',
	parityBit:	'no',
	stopBits:	'one',
	ctsFlowControl:	false
};

//Got the stored config

chrome.storage.local.get(configs, function(i){
	console.log(i);
	configs.bitrate = i.bitrate;
	configs.dataBits = i.dataBits;
	configs.parityBit = i.parityBit;
	configs.stopBits = i.stopBits;
	configs.ctsFlowControl = i.ctsFlowControl;
});

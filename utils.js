//Notify window
//cfOption:
// icon
// messasge
// confirmmsg
function metroNotify(cfOption, cbfunction) {
    	$.Dialog({
		    shadow: true,
		   	overlay: true,
			flat: true,
			icon: '<span class="' + cfOption.icon + '"></span>',
		    title: cfOption.title,
		    content: '<div style="text-align:center;margin-top:20px;">'+cfOption.message+'</div>' + '<div style="text-align:center;margin-top:20px;"><button class="delete confirm default" style="width:100px;">'+cfOption.confirmmsg+'</button></div>',
			sysButton:false,
			width:300,
			height:100,
		    onShow: function(_dialog){
				$('.delete.confirm').click(function(){
		        	//console.log(_dialog);
					//等待删除
					$('.window.shadow .btn-close').click();
					cbfunction();
				});
		   }
	   	});
}


//Confirm window
function metroConfirm(cfOption, cbfunction, falsefunction) {
    	$.Dialog({
		    shadow: true,
		   	overlay: true,
			flat: true,
		    icon: '<span class="icon-chrome"></span>',
		    title: cfOption.title,
		    content: '<div style="text-align:center;margin-top:20px;">'+cfOption.message+'</div>' + '<div style="text-align:center;margin-top:20px;"><button class="delete confirm default" style="margin-right:20px;">'+cfOption.confirmmsg+'</button><button class="delete cancel">'+cfOption.cancelmsg+'</button></div>',
			sysButton:false,
			width:300,
			height:100,
		    onShow: function(_dialog){
				$('.delete.cancel').click(function(){
						$('.window.shadow .btn-close').click();
				});
				$('.delete.confirm').click(function(){
		        	//console.log(_dialog);
					//等待删除
					$('.window.shadow .btn-close').click();
					cbfunction();
				});
		   }
	   	});
}


function metroInput (inputOpt, cbfunction, falsefunction){
    			$.Dialog({
					width:380,
					height:50,
	        		overlay: true,
			        shadow: true,
					flat: true,
					icon: '<span class="' + inputOpt.icon + '"></span>',
					title: inputOpt.title,
					content: '',
					onShow: function(_dialog){
						var content = _dialog.children('.content');
						var formContent = "";
						formContent = '<div class="input-block" style="text-align:center;margin-top:18px;" >';
						formContent = formContent + '<input id="inputvalue" type="text" style="padding-left:10px;font-size:15px;height:28px;width:150px;margin-right:15px;" value="" placeholder="'+inputOpt.placeHolder+'" />';
						formContent = formContent + '<button class="info" style="border:1px solid black;" id="inputButton"> <span class="'+ inputOpt.buttonIcon + '"></span> '+inputOpt.buttonTitle+'</button>';
						formContent = formContent + '</div>';
						content.html(formContent);
						$('#inputButton').click(function(){
							cbfunction($('#inputvalue').prop('value'));
						});
					}
				});
}

//Text Window, very important console!
function metroConsole (inputOpt, cbfunction, falsefunction){
    			$.Dialog({
					width:"100%",
					height:"100%",
	        		overlay: true,
			        shadow: true,
					flat: true,
					icon: '<span class="' + 'icon-satellite' + '"></span>',
					title: '经历' + '-' + inputOpt.title,
					sysButtons: false,
					content: '',
					onShow: function(_dialog){
						cbfunction(_dialog);	//窗口交给回调函数
					}
				});
}

//ArrayBuffer
function ab2str(buf) {
       return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
       var buf = new ArrayBuffer(str.length); // 2 bytes for each char
       var bufView = new Uint8Array(buf);
       for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
       }
      return buf;
}

//Config Window
function metroConfigWindow(cbfunction) {
		var contentStr = "<div class='config'>";
		contentStr = contentStr + '<div class="input-control select">';

		contentStr = contentStr + '<label>';
		contentStr = contentStr + '<span class="label">Baud Rate:</span>';
		contentStr = contentStr + '<select class="bitrate">';
		contentStr = contentStr + '<option>115200</option>';
		contentStr = contentStr + '<option>57600</option>';
		contentStr = contentStr + '<option>38400</option>';
		contentStr = contentStr + '<option>19200</option>';
		contentStr = contentStr + '<option>14400</option>';
		contentStr = contentStr + '<option>9600</option>';
		contentStr = contentStr + '<option>4800</option>';
		contentStr = contentStr + '<option>2400</option>';
		contentStr = contentStr + '<option>1200</option>';
		contentStr = contentStr + '<option>300</option>';
		contentStr = contentStr + '<option>110</option>';
		contentStr = contentStr + '</select>';
		contentStr = contentStr + '</label>';

		contentStr = contentStr + '<label>';
		contentStr = contentStr + '<span class="label">Data Bits:</span>';
		contentStr = contentStr + '<select class="dataBits">';
		contentStr = contentStr + '<option>eight</option>';
		contentStr = contentStr + '<option>seven</option>';
		contentStr = contentStr + '</select>';
		contentStr = contentStr + '</label>';
		contentStr = contentStr + '<label>';

		
		contentStr = contentStr + '<label>';
		contentStr = contentStr + '<span class="label">Parity Bit:</span>';
		contentStr = contentStr + '<select class="parityBit">';
		contentStr = contentStr + '<option>no</option>';
		contentStr = contentStr + '<option>odd</option>';
		contentStr = contentStr + '<option>even</option>';
		contentStr = contentStr + '</select>';
		contentStr = contentStr + '</label>';

		contentStr = contentStr + '<label>';
		contentStr = contentStr + '<span class="label">Stop Bits:</span>';
		contentStr = contentStr + '<select class="stopBits">';
		contentStr = contentStr + '<option>one</option>';
		contentStr = contentStr + '<option>two</option>';
		contentStr = contentStr + '</select>';
		contentStr = contentStr + '</label>';

		contentStr = contentStr + '<label>';
		contentStr = contentStr + '<span class="label">CTS Flow Control:</span>';
		contentStr = contentStr + '<select class="ctsFlowControl">';
		contentStr = contentStr + '<option>false</option>';
		contentStr = contentStr + '<option>true</option>';
		contentStr = contentStr + '</select>';
		contentStr = contentStr + '</label>';


		contentStr = contentStr + '<div class="text-center">';
		contentStr = contentStr + '<button class="medium success confirm-single bg-hover-brown">';
		contentStr = contentStr + 'Confirm';
		contentStr = contentStr + '</button>';
		contentStr = contentStr + '</div>';


		contentStr = contentStr + '</div>';
		contentStr = contentStr + '</div>';

    	$.Dialog({
		    shadow: true,
		   	overlay: true,
			flat: true,
			icon: '<span class="icon-cog"></span>',
		    title: "Serial Port Setting",
		    content: contentStr,
			sysButton:false,
			width:400,
			height:500,
		    onShow: function(_dialog){
				//Get Config:
				$('.bitrate').val(root.configs.bitrate);
				$('.dataBits').val(root.configs.dataBits);
				$('.parityBit').val(root.configs.parityBit);
				$('.stopBits').val(root.configs.stopBits);
				$('.ctsFlowControl').val((root.configs.ctsFlowControl)?'true':'false');

				$('.confirm-single').click(function(){
					//保存
					root.configs.bitrate = 			parseInt($('.bitrate').val());
					root.configs.dataBits = 			$('.dataBits').val();
					root.configs.parityBit = 			$('.parityBit').val();
					root.configs.stopBits = 			$('.stopBits').val();
					root.configs.ctsFlowControl = 		($('.ctsFlowControl').val()=='true')?true:false;
					//If port is open, update it:
					// Id != null & connection is really valid
					if(root.connectionId!=null){
						chrome.serial.getInfo(root.connectionId, function(o){
							if(typeof(o)!='undefined'){
								//Only when the current connection is ready to update
								chrome.serial.update(root.connectionId, root.configs, function(r){
									if(r) {
								   		var not = $.Notify({
									        content: "Update Done",
											shadow: false,
											style: {
												background:'#cde92a',
												color:'white'
											},
									        timeout: 1000 // 10 seconds
									    });
									} else {
								   		var not = $.Notify({
									        content: "Failed to Update",
											shadow: false,
											style: {
												background:'red',
												color:'black'
											},
									        timeout: 1000 // 10 seconds
									    });
									}
								});
	
							} else {
							   var not = $.Notify({
							        content: "Connection is not Valid",
									shadow: false,
									style: {
										background:'red',
										color:'black'
									},
							        timeout: 1000 // 10 seconds
							    });
								//remove port id if no real one
								root.connectionId = null;
							}
						});
					}
					//Store
					chrome.storage.local.get(root.configs, function(){
						//
						if(root.connectionId==null){
					   		var not = $.Notify({
							        content: " Config Updated",
									shadow: false,
									style: {
										background:'#cde92a',
										color:'white'
									},
							        timeout: 1000 // 10 seconds
						    });
						}
					});
					//等待删除
					$('.window.shadow .btn-close').click();
					cbfunction();
				});

				$('.delete.confirm').click(function(){
		        	//console.log(_dialog);
					//等待删除
					$('.window.shadow .btn-close').click();
					cbfunction();
				});
		   }
	   	});
}

function sendStrCmd(str, callback){
	//send serial port info
	var cmd		= str;		
	cmd 		= cmd + "\r\n";
	var cmdbuf 	=	str2ab(cmd);
	chrome.serial.send(root.connectionId, cmdbuf, function(){
		if(typeof(callback) != 'undefined'){
			callback();	
		}
	});
}

function calcMonth(mon){
		var monthS;
		switch(Number(mon)){
			case 1:
				monthS = 'January';
				break;
			case 2:
				monthS = 'Feburary';
				break;
			case 3:
				monthS = 'March';
				break;
			case 4:
				monthS = 'April';
				break;
			case 5:
				monthS = 'May';
				break;
			case 6:
				monthS = 'June';
				break;
			case 7:
				monthS = 'July';
				break;
			case 8:
				monthS = 'August';
				break;
			case 9:
				monthS = 'September';
				break;
			case 10:
				monthS = 'October';
				break;
			case 11:
				monthS = 'November';
				break;
			case 12:
				monthS = 'December';
				break;
			default:
				break;
		}
		return monthS;
}

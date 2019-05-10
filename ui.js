function handleUICmd(s) {
	var info = $.trim(s);
	
	if(info.substr(0,9)=='Nuwa Info') {			//READID
		$('.display-area').text(info);	
	} else if(info.substr(0,8)=='Tik, Tok') { 	//TIME CHECK
		$('.busy').removeClass('busy');
		var curtimes = info.substr(27);
		curtimes = curtimes.split(' ');
		//-> Year
		var date  = $.trim(curtimes[1]).split('-');
		var clock = $.trim(curtimes[0]).split(':');

		var Year 	= date[2];
		var Month 	= date[1];
		var Day 	= date[0];

		var Hour	= clock[0];
		var Min		= clock[1];
		var Sec		= clock[2];

		//Calcu the absolute time
		var totalSec = Number(Sec) + Number(Min*60)+ Number(Hour*3600);
		//to sync avoid reset impact
		if(totalSec!=clockui.getTime().time){
			clockui.setTime(totalSec-1);
		}
		if(clockinit==false) {
			clockui.setTime(totalSec-1);
			clockinit=true;
		}
		clockui.flip();
		//Set Date
		$('.date-s').text(Day);
		$('.year-s').text(Year);
		var monthS = calcMonth(Month);
		$('.month-s').text(monthS);

	} else if(info.substr(0,8)=='Tik, Tik') { 	//TIME SET
		$('.busy').removeClass('busy');
		var curPos = Number(info.substr(10,1));
		var curtimes = info.substr(27);
		curtimes = curtimes.split(' ');
		//-> Year
		var date  = $.trim(curtimes[1]).split('-');
		var clock = $.trim(curtimes[0]).split(':');

		var Year 	= date[2];
		var Month 	= date[1];
		var Day 	= date[0];

		var Hour	= clock[0];
		var Min		= clock[1];
		var Sec		= clock[2];


		if(curPos<=2){	//Timer
			curPos = 2- curPos;
			//Calcu the absolute time
			var totalSec = Number(Sec) + Number(Min*60)+ Number(Hour*3600);
			clockui.setTime(totalSec);
			$('.flip.play').eq(curPos*2).addClass('busy');
			$('.flip.play').eq(curPos*2+1).addClass('busy');
		} else {	//date
			switch(curPos){
				case 3:
					$('.year-s').addClass('busy');
					$('.year-s').text(Year);
					break;
				case 4:
					$('.month-s').addClass('busy');
					$('.month-s').text(calcMonth(Month));
					break;
				case 5:
					$('.date-s').addClass('busy');
					$('.date-s').text(Day);
					break;
				default:
					break;
			}
		}
	}

}
function handleUIBind() {

	$('.icon-checkbox').click(function(){
		//Key 1	
		sendStrCmd("KEYHIT 1");
	});

	$('.icon-grid').click(function(){
		//Key 2	
		sendStrCmd("KEYHIT 2");
	});

	$('.icon-arrow-up-2').click(function(){
		//Key 3	
		sendStrCmd("KEYHIT 3");
	});

	$('.icon-arrow-right-2').click(function(){
		//Key 4	
		sendStrCmd("KEYHIT 4");
	});

	$('.icon-arrow-left-2').click(function(){
		//Key 5	
		sendStrCmd("KEYHIT 5");
	});
	$('.icon-arrow-down-2').click(function(){
		//Key 6	
		sendStrCmd("KEYHIT 6");
	});

}

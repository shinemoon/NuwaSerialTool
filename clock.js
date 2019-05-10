//Counter - globla symbol
var timingCounter = 0;
//注册的心跳事件 (function Array)
//{period:integer, action:function()}
var timingEvents = [
	//1- 调试函数
	{
		name:'debug',	//预备用来删除或者调整
		period:5,
		action:function(){
			//console.log('clock debug  - heartbeating');
		}
	}
];

//需要在此处实现一个心跳，不需要太精密的计时，0.2s估计差不多？
function startHearBeat (){
	//启动计数器
	timingCounter = 0;
	heartBeat = setInterval (function() {
		//Counter + 1
		if(timingCounter ++ == 1000) {
			timingCounter = 0;
		};
		//心跳时要调用的东西
		//遍历所有注册过的函数
		timingEvents.every(function(act){
			if(timingCounter % act.period == 0) {
				act.action();
			}
			return true;
		});
		
	}, 200);	//200ms - 此处hardcoding的目的是别让人hack得太明显，放到集中的地方反而一下子就明了...
}

//注册
function registerHBEvent (act) {
	timingEvents.push(act);
}

//删除
function deleteHBEvent (eventName) {
	var hitIndex = null;
	//search and find the item
	timingEvents.forEach(function(item,index){
		if(item.name==eventName) {
			hitIndex = index;	
			return false;
		}
	});

	//Delete
	if(hitIndex != null){
		timingEvents.splice(hitIndex,1);
	}
}

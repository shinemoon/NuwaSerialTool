/*

	//定义db的各类function
*/

function dbInitialize () {		
	console.log("IndexedDB initialization");	
	PaladinDB.open();
};



PaladinDB.open = function() {
	//角色信息
	PaladinDB.openPaladin();
	//系统信息
	//任务信息
}


PaladinDB.openPaladin = function() {
	//v1: 仅用户数据
	//v2: 加入Console
  	var version = 2;	

  	var request = indexedDB.open("paladin", version);	//角色的信息存储
	//定义更新时的动作
    request.onupgradeneeded = function(e) {
		var db = e.target.result;
		// A versionchange transaction is started automatically.
		e.target.transaction.onerror = PaladinDB.onerror;


		// 角色
		if(db.objectStoreNames.contains("paladin")) {
			db.deleteObjectStore("paladin");
		}
		// console
		if(db.objectStoreNames.contains("consolelog")) {
			db.deleteObjectStore("consolelog");
		}

		var store = db.createObjectStore("paladin",{keyPath: "id"});
		var store = db.createObjectStore("consolelog",{keyPath: "id"});
	};

	//建立、链接数据库
	request.onsuccess = function(e) {
		PaladinDB.db = e.target.result;
		//PaladinDB.getAllTodoItems();
	};

	//错误
	request.onerror = PaladinDB.onerror;

};//End of PaladinDB.open

//========================== 用户账号信息

//插入数据
PaladinDB.addPaladin= function(key,paladinObj,cbFunc) {
	var db = PaladinDB.db;
	var trans = db.transaction(["paladin"], "readwrite");
	var store = trans.objectStore("paladin");
	var request = store.put({
		"id" : key,
		"obj": paladinObj
	});
	request.onsuccess = function(e) {
		// Re-render all the paladin's
		//PaladinDB.getAllTodoItems();
		if(typeof(cbFunc)!='undefined'){
			cbFunc('success');
		}
	};
	request.onerror = function(e) {
		console.log(e.value);
		cbFunc('failed');
	};
};

//查询数据

PaladinDB.getAllPaladinItems = function() {

	var db = PaladinDB.db;
	var trans = db.transaction(["paladin"], "readwrite");
	var store = trans.objectStore("paladin");

	// Get everything in the store;
	var keyRange = IDBKeyRange.lowerBound(0);
	var cursorRequest = store.openCursor(keyRange);

	cursorRequest.onsuccess = function(e) {
		var result = e.target.result;
		if(!!result == false) return;
		console.log(result.value.obj);
		result.continue();
	};

	cursorRequest.onerror = PaladinDB.onerror;
};

// 针对查询
PaladinDB.getPaladinItem = function(keyValue,cbFunc) {
	var store = PaladinDB.db.transaction("paladin").objectStore("paladin");
	store.get(keyValue).onsuccess = function(evt) {
		var role = evt.target.result;
		//var jsonStr = JSON.stringify(role);
		if(typeof(cbFunc)!='undefined') {
			cbFunc(role);
		}
	};
}


//删除数据
PaladinDB.deletePaladin = function(id,cbFunc) {
	var db = PaladinDB.db;
    var trans = db.transaction(["paladin"], "readwrite");
	var store = trans.objectStore("paladin");

	var request = store.delete(id);

	request.onsuccess = function(e) {
		PaladinDB.getAllPaladinItems();  // Refresh the screen
		if(typeof(cbFunc)!='undefined'){
			cbFunc();
		}
	};
	request.onerror = function(e) {
		console.log(e);
		if(typeof(cbFunc)!='undefined'){
			cbFunc();
		}
	};
};

//统计满足条件的存档数量
PaladinDB.countPaladinItems = function(cbFunc){
	var db = PaladinDB.db;
    var trans = db.transaction(["paladin"], "readwrite");
	var store = trans.objectStore("paladin");
	var keyRange = IDBKeyRange.lowerBound(0);

	var cursorRequest = store.count(keyRange);
	cursorRequest.onsuccess = function(e) {        
	    var result = e.target.result;
	    //result ? ++count && result.continue() : console.log(count);
		if(typeof(cbFunc)!='undefined') {
			cbFunc(result);
		}
	 };
}

//获取所有有效roles
PaladinDB.getAllPaladinItems = function(cbFunc){
	var db = PaladinDB.db;
    var trans = db.transaction(["paladin"], "readwrite");
	var store = trans.objectStore("paladin");
	var items = [];
	store.openCursor().onsuccess = function(event) {
	  var cursor = event.target.result;
	  if (cursor) {
	    items.push(cursor.value);
	    cursor.continue();
	  }
	  if(typeof(cbFunc)!='undefined'){
	  	cbFunc(items);
	  }
	};
}


//==========================  其他信息
//插入各种控制台信息
PaladinDB.addConsoleLog= function(key,paladinObj,cbFunc) {
	var db = PaladinDB.db;
	var trans = db.transaction(["consolelog"], "readwrite");
	var store = trans.objectStore("consolelog");
	var request = store.put({
		"id" : key,
		"obj": paladinObj
	});
	request.onsuccess = function(e) {
		// Re-render all the paladin's
		//PaladinDB.getAllTodoItems();
		if(typeof(cbFunc)!='undefined'){
			cbFunc('success');
		}
	};
	request.onerror = function(e) {
		console.log(e.value);
		cbFunc('failed');
	};
};




function wew(WEW){
	'use strict';
	this.uid = new Date;
	this.appid = WEW.opts.appID;
	this.ttl = WEW.opts.ttl;
	(this.storage = window.localStorage).setItem(this.uid, this.uid);
}

wew.prototype.getSet = function (setName,callback){
	'use strict';	
	var storageKey = setName || "";
	console.log("setName: "+setName);
	
	var cached=this.inCache(storageKey);
	if(!cached){
		this.askCloud('http://ddr.'+this.appid+'.wew.io/cset/',storageKey, callback);
	}else{
		callback(cached);
	}
},

wew.prototype.getCap = function(capabilityName, callback) {
	'use strict';	
	var storageKey = capabilityName;
	var capability ="";
	console.log("capabilityName: "+capabilityName);
	
	var cached=this.inCache(storageKey);
	if(!cached){
		this.askCloud('http://ddr.'+this.appid+'.wew.io/c/'+capabilityName,storageKey, callback);
	}else{
		callback(cached);
	}
},

wew.prototype.inCache = function(storageKey) {
	capability =0;
	if(this.storage && this.storage.getItem(storageKey) && JSON.parse && JSON) {
		try {
			capability = JSON.parse(this.storage.getItem(storageKey));
			var now = new Date();
			var age = new Date(capability.ts);
			if( (now.getTime() - age.getTime()) > this.ttl) {
				this.storage.removeItem(storageKey);
				capability=0;
			} else {
				return capability;
			}
		} catch(e) {
		
		}
	}else{
		return capability;
	}
},

wew.prototype.askCloud = function (url,storageKey,callback) {
		var http = this.httpObj();
		var storage = this.storage;
		var orientation = window.orientation || "";
		var height = screen.height || "";
		var width = screen.width || "";
		var pixelratio = window.devicePixelRatio || "";
		url = url +"?o="+orientation+"&h="+height+"&w="+width+"&p="+pixelratio;
		console.log(url);
		http.open('GET', url, true);
		http.onreadystatechange = function (){
			if (http.status == 200 && http.readyState == 4) {
	    		if(storage) {
	    			var capability = JSON.parse(http.responseText);
	    			var i =0;
	    			for (key in capability) {
						try{
							capability['ts'] = new Date();
							if(i<1){
								storage.setItem(storageKey, JSON.stringify(capability));	
							}
							var jsn={};
							jsn[key] = capability[key];
							jsn['ts'] = capability['ts'];
							storage.setItem(key, JSON.stringify(jsn));
							console.log("stored");
						}catch (e){
							console.log("Could not store");
							console.log(e);
						}
						i++;	   
		 			}					
				}
	    		callback(JSON.parse(http.responseText));
	    	}
		};
		http.send();
},

wew.prototype.httpObj = function () {
	var xmlhttpmethod = false,
		attempts = [
			function () { return new XMLHttpRequest(); },
			function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
			function () { return new XDomainRequest; },
			function () { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); }
		],
		al = attempts.length;
	while (al--) {
	    try {
	        xmlhttpmethod = attempts[al]();
	    }
	    catch (e) {
	        continue;
	    }
	    break;
	}
	return xmlhttpmethod;
}
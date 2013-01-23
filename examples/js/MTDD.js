var storage,
uid,
fail,
appid;

function MTDD(appid) {
	'use strict';

	this.appid = appid;
	try {
		uid = new Date;
		(storage = window.localStorage).setItem(uid, uid);
		fail = storage.getItem(uid) != uid;
		storage.removeItem(uid);
		fail && (storage = false);
	} catch(e) {};		
}

MTDD.prototype.getCapability = function (capabilityName) {
	return this.getSingleCapability(capabilityName, 'http://ddr.'+this.appid+'.wew.io/c/'+capabilityName, 'cs.');
},

MTDD.prototype.getCapabilities = function() {
	return this.getSingleCapability(null, 'http://ddr.'+this.appid+'.wew.io/capabilities/', 'ca.');
},

MTDD.prototype.getSingleCapability = function(capabilityName, url, storagePrefix) {
	'use strict';
	var storageKey = storagePrefix;
	if(capabilityName) {
		storageKey=storageKey+capabilityName;
	}

	if(storage && storage.getItem(storageKey)) {
		try {
			var storedCapability = JSON.parse(storage.getItem(storageKey));

			if(storedCapability['ts']) {
				var now = new Date();
				var age = new Date(storedCapability.ts);
				if( (now.getTime() - age.getTime()) > 10000) {
					storage.removeItem(storageKey);
				} else {
					if(capabilityName) {
						return storedCapability[capabilityName];
					} else {
						return storedCapability;
					}
				}
			} else {
				storage.removeItem(storageKey);
			}
		} catch(e) {
			storage.removeItem(storageKey);
		}
	}


	var http = new XMLHttpRequest();
	http.overrideMimeType("application/json");
	http.open('GET', url, false);
	http.send();

	var capability = JSON.parse(http.responseText);
	if(storage) {
		capability['ts'] = new Date();
		storage.setItem(storageKey, JSON.stringify(capability));
	}
	if(capabilityName) {
		return capability[capabilityName];
	} else {
		return capability;
	}
},


MTDD.prototype.getCapabilityNames = function() {
	var http = new XMLHttpRequest();
	http.overrideMimeType("application/json");
	http.open('GET', 'http://ddr.'+this.appid+'.wew.io/capabilityNames/', false);
	http.send();
	var capabilityNames = JSON.parse(http.responseText);
}


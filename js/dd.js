function getCapability(capabilityName) {
	var http = new XMLHttpRequest();
	http.overrideMimeType("application/json");
	http.open('GET', 'http://finn.wew.io/ddr/c/' + capabilityName, true);
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var capability = JSON.parse(http.responseText);
			return capability[capabilityName];
		}
	}
	http.send();
}

function getCapabilityNames() {
	var http = new XMLHttpRequest();
	http.overrideMimeType("application/json");
	http.open('GET', 'http://finn.wew.io/ddr/capabilityNames/', true);
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var capabilityNames = JSON.parse(http.responseText);
			return capabilityNames;
		}
	}
	http.send();
}

# Device detection repository at wew.io

### Introduction
The device detection service implements server side device detection. It enables querying for different device capabilities as defined by [WURFL](http://wurfl.sourceforge.net).
The service also enables you to add your own customized device capabilities, for instance based on some tacit knowledge, to extend the standard WURFL database. Custom capabilities are defined per application using the interface at [whateverweb.com](http://whateverweb.com).

### Getting started
1. Sign up for a free account at [whateverweb.com](http://whateverweb.com/)
2. Register an application to get an application key and service URL.

### The service

The service has the following RESTful verbs and methods defined under the service URL:

---
* **GET** /ddr/c/*capability_name*

	Get capability by name, for device calling the service.  

	Example:

		GET http://demo.wew.io/ddr/c/model_name

	The response for a request made from an iPhone will be:

    	HTTP/1.1 200 OK
    	Content-Type: application/json
    	
    	{"model_name":"iPhone"}

---
* **GET** /ddr/capabilities

	Get all capabilities, for device calling the service

	Example:

		GET http://demo.wew.io/ddr/capabilities

	The response for a request made from an iPhone will be:

    	HTTP/1.1 200 OK
    	Content-Type: application/json
		{"screensaver_greyscale":"false","fl_wallpaper":"false","columns":"20","mms_xmf":"false","wta_phonebook":"false","viewport_supported":"true","mms_wml":"false","ringtone_directdownload_size_limit":"0","ringtone_xmf":"false",...}

---
* **GET** /ddr/capabilitySet

	To be documented


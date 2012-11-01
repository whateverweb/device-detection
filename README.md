# Device detection repository at wew.io

This document describes both basic and advanced usage of the device detection service, including methods used to define custom capability and capability sets. If you just want to use the basic service, for instance from your client-side javascript, you would probably be better off with the basic documentation at [device-detecion GitHub page](http://github.com/whateverweb/device-detection).

### Introduction
The device detection service implements server side device detection. It enables querying for different device capabilities as defined by [WURFL](http://wurfl.sourceforge.net).
The service also enables you to add your own customized device capabilities, for instance based on some tacit knowledge, to extend the standard WURFL database. Custom capabilities could be defined per application using the interface at [whateverweb.com](http://whateverweb.com), or by using the methods described in this document.

### Getting started
1. Sign up for a free account at [whateverweb.com](http://whateverweb.com/)
2. Register an application to get an application key and service URL.

### Basic usage

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

	Get all capabilities, for device calling the service. Capabilities in response will include custom capabilities if defined for calling device, or any of its "WURFL-ancestors".

	Example:

		GET http://demo.wew.io/ddr/capabilities

	The response for a request made from an iPhone will be:

    	HTTP/1.1 200 OK
    	Content-Type: application/json
		{"screensaver_greyscale":"false","fl_wallpaper":"false","columns":"20","mms_xmf":"false","wta_phonebook":"false","viewport_supported":"true","mms_wml":"false","ringtone_directdownload_size_limit":"0","ringtone_xmf":"false",...}

---
* **GET** /ddr/cset/

	Get a predefined set of capabilities, for device calling the service. This special, built-in capability set contains some of the most frequently used capabilites. It provides an easy way to limit the amount of data returned from the service.

	Example:

		GET http://demo.wew.io/ddr/cset/

	The response for a request made from an iPhone will be:

		HTTP/1.1 200 OK
		Content-Type: application/json

		{"device_os":"iPhone OS","device_os_version":"4.0","is_tablet":"false","max_image_width":"320","max_image_height":"480","mobile_browser":"Safari","model_name":"iPhone","brand_name":"Apple"}

---
* **GET** /ddr/cset/*capability set name*

	Get a set of capabilities defined by set name, for device calling the service. Capability sets can be defined by using the service, or by using the administration portal at [whateverweb.com](http://whateverweb.com).

	Example:

		GET http://demo.wew.io/ddr/cset/myCapabilitySet

	The response for a request made from an iPhone will be:

		HTTP/1.1 200 OK
		Content-Type: application/json

		{"capa1":"first capa value","capa2":"second capa value"}

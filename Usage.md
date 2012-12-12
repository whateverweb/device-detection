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

### Advanced usage
* **GET** /ddr/device

	Get device id for calling device.

	Example:

		GET http://demo.wew.io/ddr/device

	The response for a request made from an iPhone, iOS 5.1 will be:

		HTTP/1.1 200 OK
		Content-Type: application/json

		{"id":"apple_iphone_ver5_1"}

---
* **GET** /ddr/ancestor/*device id*

	Get ancestor(s) for given device.

	Example:

		GET http://demo.wew.io/ddr/ancestor/apple_iphone_ver5_1

	Example response:

		HTTP/1.1 200 OK
		Content-Type: application/json

		["apple_iphone_ver4","apple_iphone_ver3_1_3","apple_iphone_ver2_1","apple_iphone_ver2","generic"]

	Other response codes:

		*204 No Content*: device id has no ancestors (is top level device)
		*400 Bad Request*: unknown device id

---
* **GET** /ddr/capabilityNames

	Get a list of all available capability names. This will also include application's custom capabilities, if any.

	Example:

		GET http://demo.wew.io/ddr/capabilityNames

	Example response:

		HTTP/1.1 200 OK
		Content-Type: application/json

		["screensaver_greyscale","fl_wallpaper","mms_xmf", ... ]

---
* **POST** /ddr/custom/*device id*/*capability name*/*capability value*

	Create, or update, a custom capability for a device, or device group. The capability name (key) cannot be defined in the official WURFL repository.
	Please note that new capabilities might take a few minutes to propagate to all servers.

	Example:

		POST http://demo.wew.io/ddr/custom/apple_iphone_ver4/highDPI/true

	Example response:

		HTTP/1.1 201 Created
		Content-Type: application/json

		{"appId":"82f2acb6-c5df-4034-ba00-95e6ae2ad3e9","deviceId":"apple_iphone_ver4","capabilityName":"highDPI","capabilityValue":"true"}

	Other responses:

		*400 Bad Request*: Unknown device id
		*400 Bad Request*: Attempt to override standard (WURFL) capability

	**Batching** example:

		POST http://demo.wew.io/ddr/custom/apple_iphone_ver4,windows_8_rt_ver1/highDPI/true

	**Batching** example response:

		HTTP/1.1 201 Created
		Content-Type: application/json

		Capability set for 2 devices

	Other **batching** responses:

		*201 Created: "Capability set for *N* devices"  -- where N is lower than device count meaning a partial success
		*400 Bad Request*: Unknown id

---
* **DELETE** /ddr/custom/*device id*/*capability name*

	Delete a defined custom capability for a device id.

	Example:
		DELETE /ddr/custom/apple_iphone_ver4/highDPI

	Example response:

		HTTP/1.1 200 OK

	Other response codes:

		*304 Not modified*: Capability is not defined for given device and cannot be deleted
		*400 Bad request: Device id not found in device repository, or attempt to delete a builtin capability

---
* **GET** /ddr/custom?deviceId=*device id*

	Get custom capabilities defined. Omit device id to get all custom capabilities defined for application.

	Example:

		GET http://demo.wew.io/ddr/custom

	Example response:

		HTTP/1.1 200 OK
		Content-Type: application/json

		[{"appId":"82f2acb6-c5df-4034-ba00-95e6ae2ad3e9","deviceId":"generic_android_ver4","capabilityName":"highDPI","capabilityValue":"maybe"},{"appId":"82f2acb6-c5df-4034-ba00-95e6ae2ad3e9","deviceId":"apple_iphone_ver4","capabilityName":"highDPI","capabilityValue":"true"}]

	Other response codes:

		*204 No Content*: No custom capabilities defined for application

---
* **POST** /ddr/cset/def/*set name*?capa=*first capa name*&capa=*second capa name*&capa=...

	Create, or update, a capability set. A capability set is a collection of capability keys that you might find particularly useful in a given context. A set can contain any number of capability keys, but you probably want to keep the numbers down to avoid large responses of "noise".

	No validation is performed against the capability keys, so sets can contain keys that are not yet defined. They will be ignored in the response when the capability set is queried.

	Subsequent POSTs to the service with the same capability set name will overwrite the previous definition.

	In this example I want to know the brand and model name of the calling devices.

	Example:
		POST http://demo.wew.io/ddr/cset/def/myBrandModelSet?capa=brand_name&capa=model_name

	Example response:

		HTTP/1.1 201 Created

	Other response codes:

		*400 Bad request*: Attempt to create capability set with no capability keys

---
* **GET** /ddr/cset/def?setName=*capability set name*

	Get capability set definition. Omit the setName query parameter to fetch all capability set definitions.

	Example:
		GET http://demo.wew.io/ddr/cset/def?setName=myBrandModelSet

	Example response:

		HTTP/1.1 OK
		Content-Type: application/json

		{"name":"myBrandModelSet","capabilityNames":["brand_name","model_name"]}

	Other response codes:
	
		*204 No content*: Application has no capability sets defined, or the requested capability set is not defined
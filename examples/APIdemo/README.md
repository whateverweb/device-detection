# Simple capability lookup from the browser
Twi examples of how to use the [RESTful APIs](https://github.com/whateverweb/device-detection/blob/master/README.md) from the browser through a JavaScript lib.

You are free to write your own JavaScript client, however, contribution to [our code](https://github.com/whateverweb/device-detection/blob/master/examples/js/wew.js) is much appreciated :)

## How to use the wew.js client
The [wew.js](https://github.com/whateverweb/device-detection/blob/master/examples/js/wew.js) client is helps you talk to the Device Detection Service: Get a single capability and get a predefined set of capabilities. It provide asynchronous communication with callbacks. Further, it caches the data using local storage.

### First you have to initiate:

    var WEW = WEW || {};
    WEW.opts ={"ttl":"1000","appID":"demo"};
    var w=new wew(WEW);

Configuration options:
<dl>
	<dt>ttl</dt>
	<dd>For how long to cache</dd>
	<dt>appID</dt>
	<dd>your application ID obtained in whateverweb.com</dd>
</dl>

### Then ask for either a single capability:

	w.getCap("brand_name",callback);

Parameters:
<dl>
	<dt>First param</dt>
	<dd>The name of the capability you want. Can also be custom a custom capability.</dd>
	<dt>Second param</dt>
	<dd>The callback function</dd>
</dl>
### or a set of capabilites

	w.getSet("myset",callback);
Parameters:
<dl>
	<dt>First param</dt>
	<dd>Name of the capability set. If empty, the default set will be returned.</dd>
	<dt>Second param</dt>
	<dd>The callback function</dd>
</dl>

### Then, make sure the callback function exists:
	
	function callback(t){
        console.log(t);
    }

[Live demo 1](http://demo.wew.io/device-detection/examples/APIdemo/index.html)

[Live demo 2](http://demo.wew.io/device-detection/examples/APIdemo/index2.html)
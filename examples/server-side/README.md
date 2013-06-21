# Server side usage
In this example we use the Device Detection Service to decide which protocol to use for "click to call" functionality.

Only thing to be aware of is that you should pass the HTTP headers from the user agent on to the service. In php something like this:

		foreach(getallheaders() as $key => $value) {
			if ($key !="Host") 
			  $this->headers[] = $key . ': ' . $value;
		}

[Read more](http://docs.whateverweb.com/documentation/using-the-device-detection-server-side/)
<?php
/*
A quick and dirty example asking for one single capability. Some cahceing should be implemented.
*/
class wewAPI{
	
	private $service="http://ddr.demo.wew.io/c/";		
	private $response ="";
	private $headers = "";
	
	public function get($capa){
		foreach(getallheaders() as $key => $value) {
			if ($key !="Host") 
			  $this->headers[] = $key . ': ' . $value;
		}
		$url = $this->service . $capa;
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		curl_setopt($curl, CURLOPT_HTTPHEADER, $this->headers);		
		$this->response = curl_exec($curl);
		curl_close($curl);
		return json_decode($this->response)->$capa;
	}
}
?>

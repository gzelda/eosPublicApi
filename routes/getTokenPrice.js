var express = require('express');
var router = express.Router();
var http = require('http');
/* GET home page. */

var eos_options = {  
    hostname: 'https://api.huobipro.com', 
    path:  '/market/detail/merged?symbol=eosusdt',
    method: 'GET'  
};  
var eth_options = {
	hostname: 'https://api.huobipro.com', 
	path:  '/market/detail/merged?symbol=ethusdt',  
    method: 'GET' 
}
var dollar_options = {
	hostname: "http://api.k780.com", 
	path: '/?app=finance.rate_cnyquot&curno=USD&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json',  
    method: 'GET' 
}
// https://api.huobipro.com/market/detail/merged?symbol=eosusdt
// https://api.huobipro.com/market/detail/merged?symbol=ethusdt
router.get('/', function(req, res, next) {
	  console.log("in");
	  var req = http.request(dollar_options, function (res) {  
	    console.log(res);
	  });

	req.on('error', function(e) { 
		console.log('problem with request: ' + e.message); 
	}); 
	 
	// write data to request body 
	req.write('data\n'); 
	req.write('data\n'); 
	req.end();
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Eos = require('eosjs');
var respJson = require('./utils/responseJson.js');

/* GET home page. */
router.get('/', function(req, resp, next) {
  	eosconfig = {
	    httpEndpoint: 'https://node1.zbeos.com',
	    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',

	    // keyProvider: privatekeyList, // WIF string or array of keys..
	    //expireInSeconds: 60,
	    //broadcast: true,
	    //verbose: false, // API activity
	    //sign: true
	},
	eos = Eos(eosconfig);

	eos.getTableRows(true,"eosio","eosio","global").then(result => {
	    console.log(result.rows[0].max_ram_size);
	    console.log(result.rows[0].total_ram_bytes_reserved);
	    var ram_total = result.rows[0].max_ram_size/(1024*1024*1024);
	    var ram_reserved = result.rows[0].total_ram_bytes_reserved/(1024*1024*1024);
	    console.log(ram_total);
	    console.log(ram_reserved);


	    eos.getTableRows(true, "eosio", "eosio", "rammarket").then(ramData => {
		    console.log(ramData);
		    let eosAmount = ramData.rows[0].quote.balance.split(" ")[0];
		    //RAM使用量
		    let ramAmount = ramData.rows[0].base.balance.split(" ")[0] / 1024;
		    //RAM价格
		    let ramPriceWithEOS = eosAmount / ramAmount
		    console.log(eosAmount, ramAmount, ramPriceWithEOS);
		    var data = {
			    "ramTotal":   ram_total,
			    "ramReserved":   ram_reserved,
			    "ramPrice":   ramPriceWithEOS
			}
		    resp.send(respJson.generateJson(1,0,"请求成功",data));
		})


	    


	})
});

module.exports = router;

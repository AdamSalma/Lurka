var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res1){
	console.log("here")
	var json;
	request({url: 'https://a.4cdn.org/g/catalog.json'}, function(err, res, json){
		if ( err || res.statusCode != 200 ) {
			console.error("Couldn't get url");
			console.info(err, res.statusCode);
		}
		console.log("Found Jason");
		res1.send(json)
	});
});


module.exports = router;

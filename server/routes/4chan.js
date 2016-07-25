var express = require('express');
var router = express.Router();

var request = require('request');
var baseUrls = {
    board: 'https://a.4cdn.org/g/catalog.json',
    img: 'https://i.4cdn.org/g/',
}

var requestOpts = {
    headers: {
        'Host': 'a.4cdn.org',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0)' /
                      'Gecko/20100101 Firefox/49.0',
        'Origin': 'http://boards.4chan.org/',
        'If-Modified-Since': '0'
    }
}

function errorHandler(err, res){
    if (err || res.statusCode != 200) {
        console.error("Couldn't get url. " + res.statusCode
                    + " from " + errorHandler.caller.toString());
        throw new Error(err);
    }
}

router.get('/:board', function(req, res){
    console.log('Reached board');
    board = req.params.board;
	console.log("Getting board /" +board+ "/");
    requestOpts.url = 'https://a.4cdn.org/' +board+ '/catalog.json';
	request(requestOpts, function(err, ress, json){
        errorHandler(err, ress);
        console.log(typeof json);
        res.send(JSON.parse(json));
    });
});

router.get('/:board/thread/:threadID', function(req, res, next){
    console.log('Reached thread');
    board = req.params.board;
    id = req.params.threadID;
    console.log('Getting thread ' + id);
    requestOpts.url = 'http://a.4cdn.org/'+board+'/thread/'+id+'.json';
    request(requestOpts, function(err, ress, json){
        errorHandler(err, ress);
        res.send(JSON.parse(json));
    });
});

console.log('Reached bottom')

module.exports = router;

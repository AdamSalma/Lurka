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
    console.log('\n\n')
    console.error("Couldn't get url. " + res.statusCode
                + " from " + errorHandler.caller.toString());
    console.log('\n\n');
}

router.get('/:board', function(req, res){
    console.log('Reached board');
    var board = req.params.board;
	console.log("Getting board /" +board+ "/");
    requestOpts.url = 'https://a.4cdn.org/' +board+ '/catalog.json';
	request(requestOpts, function(err, res2, json){
        if (err) return errorHandler(err, res2);
        res.send(json);
        res.end();
    });
});

router.get('/:board/thread/:threadID', function(req, res, next){
    console.log('Reached thread');
    var board = req.params.board;
    var id = req.params.threadID;
    requestOpts.url = 'http://a.4cdn.org/'+board+'/thread/'+id+'.json';
    console.log('Getting thread  url ' + requestOpts.url);
    request(requestOpts, function(err, res2, json){
        if (err) return errorHandler(err, res2);
        res.send(json);
        res.end();
    });
});

console.log('Reached bottom');

module.exports = router;

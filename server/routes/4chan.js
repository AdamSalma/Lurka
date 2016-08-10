var express = require('express');
var router = express.Router();

var request = require('request'); // TODO - replace request with axios
var boardMorph = require('../helpers/board_morph.js')

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

router.get('/:boardID', function(req, res){
    var boardID = req.params.boardID;
    console.log('Reached board');

    requestOpts.url = 'https://a.4cdn.org/' +boardID+ '/catalog.json';
	request(requestOpts, function(err, res2, json){
        if (err) return errorHandler(err, res2);
        data = boardMorph.chan(JSON.parse(json), boardID)
        res.send(data);
        res.end();
    });
});

router.get('/:board/:threadID', function(req, res, next){
    var boardID = req.params.boardID;
    var threadID = req.params.threadID;
    console.log('Reached thread ' +boardID+ '/' +threadID);

    requestOpts.url = 'http://a.4cdn.org/'+boardID+'/thread/'+threadID+'.json';
    requestOpts.headers['Origin'] = 'http://boards.4chan.org/' +boardID,
    request(requestOpts, function(err, res2, json){
        if (err) return errorHandler(err, res2);
        res.send(json);
        res.end();
    });
});

function errorHandler(err, res){
    console.log('\n\n')
    console.error("Couldn't get url. " + res.statusCode
                + " from " + errorHandler.caller.toString());
    console.log('\n\n');
}

module.exports = router;

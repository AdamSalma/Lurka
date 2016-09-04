var axios = require('axios');
var express = require('express');
var router = express.Router();

var morphBoard = require('../helpers/morph-board').chan
var morphThread = require('../helpers/morph-thread').chan

// TODO - delete this when ready:
// board: 'https://a.4cdn.org/g/catalog.json',
// img: 'https://i.4cdn.org/g/',

var reqConfig = {
    headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Host': 'a.4cdn.org',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0)' /
                      'Gecko/20100101 Firefox/49.0',
        'Origin': 'http://boards.4chan.org',
        'Referer': 'http://boards.4chan.org/',
        'If-Modified-Since': '0'
    }
}




router.get('/:boardID', function(req, res){
    console.log("getting board")
    var boardID = req.params.boardID;
    var url = 'https://a.4cdn.org/' +boardID+ '/catalog.json';
	axios(url, reqConfig)
        .then(function(board) {
            res.send(morphBoard(board.data, boardID))
        }).catch(err => errorHandler(err))
});

router.get('/:boardID/:threadID', function(req, res, next){
    var boardID = req.params.boardID;
    var threadID = req.params.threadID;
    if (isNaN(threadID)) next();

    var url = 'http://a.4cdn.org/'+boardID+'/thread/'+threadID+'.json';
    console.log('Reached thread', url);

    // reqConfig.headers['Origin'] = 'http://boards.4chan.org/' +boardID;
    axios(url, reqConfig)
        .then(function(threads) {
            res.send(morphThread(threads.data.posts, boardID));
        }).catch( err => errorHandler(err));
});

function errorHandler(err){
    console.error(err.message, err);
    throw new Error(err)
}

module.exports = router;

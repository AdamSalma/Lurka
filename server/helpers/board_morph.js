'use strict';
var morpher = {}

morpher.chan = function( data, boardID ) {

    var threads = []
    var img = 'https://i.4cdn.org/' + boardID + '/'
    for (let page in data) {
        if (!data.hasOwnProperty(page)) return;
        let threads = data[page]['threads'];
		for(let i=0; i < threads.length; i++){
			createThread(threads[i]);
		}
    }

    return threads;

    function createThread(threadObj) {
        console.log("Creating thread");
        var thread = {
        	id: threadObj['no'],
        	date: threadObj['now'],
            title: threadObj['sub'] || "",
            comment: threadObj['com'],
            imgsrc: {
                sm: img + threadObj['tim'] + "s.jpg",
                lg: img + threadObj['tim'] + ".jpg",
            },
            replies: {
                textCount: threadObj['replies'],
                imgCount: threadObj['images']
            }
        }
        threads.push(thread);
    }
}

morpher.reddit = function( data ) {
    console.info("Coming soon!");
}

module.exports = morpher;

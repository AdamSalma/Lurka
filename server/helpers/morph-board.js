"use strict";
var morpher = {};

morpher.chan = function( board, boardID ) {
    var img = 'https://i.4cdn.org/' + boardID + '/';
    var threads = [];

    console.log("parsing 4chan board");
    console.log("type of board = ", typeof board);

    for (let page in board) {
        if (!board.hasOwnProperty(page)) return false;
        let threads = board[page]['threads'];
        console.log("Threads length is", threads.length)
		for (let i = 0; i < threads.length; i++) {
		    formatThread(threads[i]);
		}
    }

    if (!threads.length) throw new Error("No threads extracted");
    return threads;

    function formatThread(threadObj) {
        console.log("Creating thread #"+threads.length);
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

morpher.reddit = function( board ) {
    console.info("Coming soon!");
}

module.exports = morpher;

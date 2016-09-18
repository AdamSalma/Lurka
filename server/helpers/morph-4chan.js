"use strict"

export function morphBoard( board, boardID ) {
    var img = 'https://i.4cdn.org/' + boardID + '/';
    var target = [];

    console.log("Parsing 4chan board");

    for (let page in board) {
        if (!board.hasOwnProperty(page)) return false;
        let threads = board[page]['threads'];
		for (let i = 0; i < threads.length; i++) {
		    formatThread(threads[i]);
		}
    }

    if (!target.length) throw new Error("No threads extracted");
    console.log(`Created ${target.length} threads`);
    return target;

    function formatThread(threadObj) {
        let thread = {
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
        target.push(thread);
    }
}

export function morphThread( posts, boardID ) {
    let img = 'https://i.4cdn.org/' + boardID + '/';

    if (!posts.length) throw new Error("No threads extracted");
    let thread = [];
    posts.map( post => {
        thread.push({
            id: post['no'],
            date: post['now'],
            title: post['sub'] || "",
            tim: post['tim'],
            time: post['time'],
            comment: post['com'],
            imgsrc: !!post['ext'] ? {
                sm: img + post['tim'] + "s.jpg",
                lg: img + post['tim'] + post['ext']
            } : undefined,
            ext: post['ext'],
            replies: {
                textCount: post['replies'],
                imgCount: post['images'],
                ipCount: post['unique_ips']
            }
        })
    });

    console.log(`Created ${thread.length} 4chan posts`);
    return thread
}


export function extractBoardList( boardList ) {
    let boards = []
    boardList.map( board => {
        boards.push({
            board: board.board, 
            title: board.title
        })
    });
    return boards
}
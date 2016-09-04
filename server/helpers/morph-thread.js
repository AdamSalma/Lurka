"use strict";
var morpher = {};

morpher.chan = function( posts, boardID ) {
    var img = 'https://i.4cdn.org/' + boardID + '/';

    if (!posts.length) throw new Error("No threads extracted");
    let thread = [];
    posts.map( post => {
        thread.push({
            id: post['no'],
            date: post['now'],
            title: post['sub'] || "",
            comment: post['com'],
            imgsrc: {
                sm: img + post['tim'] + "s.jpg",
                lg: img + post['tim'] + post['ext']
            },
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

morpher.reddit = function( board ) {
    console.info("Coming soon!");
}

module.exports = morpher;

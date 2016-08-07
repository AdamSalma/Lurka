import React from 'react';
import BoardPost from './BoardPost';
import uuid from 'uuid';
// import request from 'request';
// console.log(request);

import velocity from 'velocity-animate';
console.log(velocity);


// var request = require("request")


export default class Board extends React.Component {
    constructor() {
        super();
        this.requestThread.bind(this);
        this.state = {
            posts: [{
                id: uuid.v4(),
                task: "task123"
            },{
                id: uuid.v4(),
                task: "task123"
            }]
        }
    }

    render() {
        const {posts} = this.state;
        return (
            <div>{posts.map( post =>
                <BoardPost
                    key={post.id}
                    onClick={this.requestThread}
                    post={post}/>
            )}</div>
        )
    }

    requestThread() {

    }
}

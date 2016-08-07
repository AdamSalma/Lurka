import React from 'react';
import BoardPost from './BoardPost';
import * as request from 'request';

export default class Board extends React.Component {
    constructor() {
        super();
        this.requestThread.bind(this);
    }

    render() {
        const {posts} = this.state;
        return (
            <div>{posts.map( post =>
                <BoardPost
                    onClick={this.requestThread}
                    post={post}/>
            )}</div>
        )
    }

    requestThread() {

    }
}

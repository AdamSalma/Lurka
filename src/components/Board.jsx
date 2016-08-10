import React from 'react';
import BoardPost from './BoardPost';
import uuid from 'uuid';
// import request from 'request';
// console.log(request);

import velocity from 'velocity-animate';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: []
        }
    }

    componentWillReceiveProps( nextProps ) {
        console.log("Next props");
        console.log(nextProps);
        var limit = 10;
        var threads = []
        while (limit--) {
            threads.push(nextProps.threads[9-limit])
        }

        this.setState({
            threads: threads
        });

    }

    render() {
        const { threads } = this.state;
        const { onThreadRequest } = this.props;

        return (
            <div className="view">{threads.map( thread => {
                console.log(thread);
                let { id } = thread
                return (
                    <BoardPost
                        key={id}
                        onClick={onThreadRequest.bind(null, id)}
                        post={thread}/>
                )
            })}</div>
        )
    }
}

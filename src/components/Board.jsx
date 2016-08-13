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
            threads: [],
            viewType: props.viewType || "grid"
        }
    }

    componentWillReceiveProps( nextProps ) {
        console.log("Next props");
        console.log(nextProps);
        var limit = 30;
        var threads = []
        while (limit--) {
            threads.push(nextProps.threads[19-limit])
        }

        this.setState({
            threads: threads,
        });

    }

    render() {
        const { threads, viewType } = this.state;
        const { onThreadRequest } = this.props;

        return (
            <div className={"board " + viewType}>{
                threads.map( thread => {
                    console.log(thread);
                    let { id } = thread
                    return (
                        <BoardPost
                            key={id}
                            onThreadRequest={onThreadRequest}
                            post={thread}/>
                    )
            })}</div>
        )
    }
}
